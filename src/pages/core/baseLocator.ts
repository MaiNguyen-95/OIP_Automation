import { Locator, Page } from "@playwright/test";

export class BaseLocator {
    constructor(protected readonly page: Page) {}

    tenantDropdown(): Locator {
        return this.page.locator('button[data-testid="tenant-dropdown"]');
    }

    txtGeneralInputField(name: string): Locator {
        return this.page.locator(`xpath=//input[@name='${name}']`);
    }

    comboboxOption(tenant: string): Locator {
        return this.page.locator(`xpath=//div[normalize-space()="${tenant}"]`);
    }

    sendLoginLinkButton(text: string): Locator {
        return this.page.locator(`xpath=(//button[contains(., "${text}")])`);
    }

    optionInCombobox(dataTestId: string): Locator {
        return this.page.locator(`xpath=(.//span[text()="${dataTestId}"])`);
    }

    timerange(dataTestId: string, timerange: string): Locator {
        return this.page.locator(`xpath=(//div[@data-testid="${dataTestId}"]//button[normalize-space()="${timerange}"])`);
    }

    expandServiceButton(service: string): Locator {
        return this.page.locator(`xpath=(//span[.="${service}"]/../button)`);
    }

    successPopupTitle(text: string): Locator {
        return this.page.locator(`xpath=//h1[contains(., "${text}")]`);
    }

    failedTitle(text: string): Locator {
        return this.page.locator(`xpath=//p[contains(., "${text}")]`);
    }
}
