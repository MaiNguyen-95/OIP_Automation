import { BrowserContext, Page, expect } from "@playwright/test";

export async function getMagicLinkAndOpen(context: BrowserContext, page: Page): Promise<void> {
    const outlookContext = await context.browser()!.newContext({
        storageState: "outlook-auth.json",
    });

    try {
        const outlookPage = await outlookContext.newPage();

        await outlookPage.goto("https://outlook.office.com/mail");

        await outlookPage.waitForSelector("div[role='main']", {
            timeout: 60000,
        });

        let magicLink: string | null = null;

        for (let i = 0; i < 12; i++) {
            console.log(`Checking inbox attempt ${i + 1}`);

            await outlookPage.reload();
            await outlookPage.waitForSelector("div[role='option']", {
                timeout: 20000,
            });

            await outlookPage.waitForTimeout(5000);

            const emails = outlookPage.locator("div[role='option']");
            const count = await emails.count();

            for (let j = 0; j < count; j++) {
                const email = emails.nth(j);
                const text = await email.innerText();

                if (!text.includes("Login to DVCS Ops Insights")) {
                    continue;
                }

                await email.click();

                await outlookPage.waitForSelector("text=We've received a login request", {
                    timeout: 30000,
                });

                const linkElement = outlookPage.locator("a:has-text('Log In')");

                await linkElement.waitFor({
                    state: "visible",
                    timeout: 30000,
                });

                magicLink = await linkElement.getAttribute("href");

                if (!magicLink) {
                    continue;
                }

                // Remove whitespace/new line
                magicLink = magicLink.trim();

                // Outlook SafeLink -> Real URL
                if (magicLink.includes("safelinks.protection.outlook.com")) {
                    try {
                        const safeUrl = new URL(magicLink);
                        const realUrl = safeUrl.searchParams.get("url");

                        if (realUrl) {
                            magicLink = decodeURIComponent(realUrl);
                        }
                    } catch (err) {
                        console.error("Cannot parse SafeLink:", err);
                    }
                }

                console.log("Magic Link:");
                console.log(magicLink);

                await page.goto(magicLink, {
                    waitUntil: "domcontentloaded",
                });

                await page.waitForLoadState("networkidle");

                return;
            }

            console.log("Hasn't found login email...");
        }

        throw new Error("Cannot find login link.");
    } finally {
        await outlookContext.close();
    }
}

export class LoginPage {
    constructor(private readonly page: Page) {}

    async verifyRedirectToApp(): Promise<void> {
        const expectedUrl = process.env.BASE_URL;

        if (!expectedUrl) {
            throw new Error("BASE_URL is not defined in .env");
        }

        const escapedUrl = expectedUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        await this.page.waitForURL(new RegExp(escapedUrl), {
            timeout: 60000,
        });

        await expect(this.page).toHaveURL(new RegExp(escapedUrl));

        await expect(this.page.locator("body")).toBeVisible();
    }
}
