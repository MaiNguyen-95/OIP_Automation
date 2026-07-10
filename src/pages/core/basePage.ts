import { Page, expect } from "@playwright/test";
import { BaseLocator } from "./baseLocator";
import * as dotenv from "dotenv";

dotenv.config();

export class BasePage {
    protected readonly page: Page;
    protected readonly baseLocator: BaseLocator;

    constructor(page: Page) {
        this.page = page;
        this.baseLocator = new BaseLocator(page);

        this.page.setDefaultTimeout(30_000);
    }

    //#region Actions

    // URL navigation
    async goto(url: string): Promise<void> {
        await this.page.goto(url);
        await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
    }

    async reload(): Promise<void> {
        await this.page.reload();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async expectTextVisible(text: string): Promise<void> {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    // Function to click button using locator
    async clickButtonByText(text: string): Promise<void> {
        const button = this.baseLocator.sendLoginLinkButton(text);
        await button.waitFor({ state: "visible", timeout: 10000 });
        await button.click();
    }

    // Verify send login link successful
    async verifyTextVisible(text: string): Promise<void> {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    // Click to open dropdown list to select tenant
    async clickButtonByCombobox(tenant: string): Promise<void> {
        const button = this.baseLocator.comboboxOption(tenant);
        await button.waitFor({ state: "visible", timeout: 5000 });
        await button.click();
    }

    // Click to open dropdown filter
    async clickFilter(dataTestId: string): Promise<void> {
        const button = this.baseLocator.optionInCombobox(dataTestId);
        await button.waitFor({ state: "visible", timeout: 10000 });
        await button.click();
    }

    // Select option in dropdown filter
    async clickOptionFilter(option: string): Promise<void> {
        const opt = this.page.getByRole("option", { name: option });
        await opt.waitFor();
        await opt.click();
    }

    // Select tenant option
    async selectOptionFromCombobox(optionText: string): Promise<void> {
        const option = this.page.getByText(optionText);
        await option.waitFor({ state: "visible", timeout: 30000 });
        await option.click();
    }

    // Click to expand list of service
    async clickExpandListOfService(expandService: string): Promise<void> {
        const expand = this.baseLocator.expandServiceButton(expandService);
        await expand.waitFor({
            state: "visible",
            timeout: 10000,
        });
        await expand.click();
    }

    // Select time range
    async selectTimerange(dataTestId: string, timerange: string): Promise<void> {
        const option = this.baseLocator.timerange(dataTestId, timerange);
        await option.waitFor({ state: "visible", timeout: 15000 });
        await option.click({ timeout: 15000 });
    }

    // Input value
    async fillInGeneralInputField(nameOrId: string, value: string | null): Promise<void> {
        if (!value) return;

        const input = this.baseLocator.txtGeneralInputField(nameOrId);
        await input.waitFor({ state: "visible" });
        await input.fill(value);
    }

    //#endregion
}
