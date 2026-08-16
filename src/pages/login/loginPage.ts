import { BrowserContext, Page } from "@playwright/test";
import { BasePage } from "../core/basePage";
import { CustomWorld } from "../../support/world";

export async function loginWithMagicLink(
  context: BrowserContext,
  page: Page,
  basePage: BasePage,
  baseUrl: string,
  tenant: string,
  flag: string,
): Promise<void> {
  await basePage.goto(baseUrl);
  await basePage.fillTextbox("email", process.env.OUTLOOK_EMAIL!);
  await basePage.clickButton("Send login link");
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
      console.log("Email count:", count);
      for (let j = 0; j < count; j++) {
        const email = emails.nth(j);
        const text = await email.innerText();
        console.log(`Email ${j}:`, text);
        if (!text.includes("Login to DVCS Ops Insights")) {
          continue;
        }
        console.log("Found login email");
        await email.click();
        await outlookPage.waitForSelector(
          "text=We've received a login request",
        );
        const linkElement = outlookPage.locator("a:has-text('Log In')");
        await linkElement.waitFor({
          state: "visible",
          timeout: 30000,
        });
        magicLink = await linkElement.getAttribute("href");
        break;
      }
      if (magicLink) {
        break;
      }
      console.log("Hasn't found login email...");
      await outlookPage.waitForTimeout(5000);
    }
    if (!magicLink) {
      throw new Error("Cannot find login link");
    }
    console.log("LOGIN LINK:", magicLink);
    await page.goto(magicLink, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForLoadState("networkidle");
  } finally {
    await outlookContext.close();
  }
  await page.waitForURL(
    `${process.env.BASE_URL}/en-us/dashboard?countryCode=gh`,
  );
  await basePage.clickButton(flag);
  await basePage.selectOptionFromDropdown(tenant);
}
