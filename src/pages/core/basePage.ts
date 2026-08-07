import { Page, expect, Locator } from "@playwright/test";
import * as dotenv from "dotenv";
import { BaseLocator } from "./baseLocator";
dotenv.config(); // Load environment variables from .env

export class BasePage {
  locator: BaseLocator;

  constructor(protected page: Page) {
    this.locator = new BaseLocator(page);
  }

  //#region Locators

  //#endregion

  //#region Actions

  async fillTextbox(name: string, value: string) {
    await this.locator.textbox(name).waitFor({ state: "visible" });
    await this.locator.textbox(name).clear();
    await this.locator.textbox(name).fill(value);
    await this.page.waitForTimeout(1000);
  }

  async clickButton(name: string) {
    await this.locator.button(name).waitFor({ state: "visible" });
    await this.locator.button(name).click();
    await this.page.waitForTimeout(3000);
  }

  async clickLink(name: string) {
    await this.locator.link(name).waitFor({ state: "visible" });
    await this.locator.link(name).click();
    await this.page.waitForURL("**/*", { timeout: 5000 });
    await this.page.waitForTimeout(3000);
  }

  async verifyText(text: string, state: string): Promise<void> {
    const locator = this.page.getByText(text);

    if (state === "visible") {
      await expect(locator).toBeVisible();
    } else if (state === "hidden") {
      await expect(locator).toBeHidden();
    } else if (state === "attached") {
      await expect(locator).toBeAttached();
    } else if (state === "detached") {
      await expect(locator).not.toBeAttached();
    } else {
      throw new Error(`Unsupported state: ${state}`);
    }
  }

  async clickOpenDropdownList(name: string): Promise<void> {
    const button = this.locator.dropdownlist(name);
    await button.waitFor({ state: "visible", timeout: 5000 });
    await button.click();
  }

  async selectOptionFromDropdown(option: string): Promise<void> {
    const opt = this.page.getByRole("option", { name: option });
    await opt.waitFor();
    await opt.click();
  }

  async OpenListCheckbox(checkbox: string, index: number): Promise<void> {
    const button = this.locator.dropdownlistcheckbox(checkbox, index);
    await button.waitFor({ state: "visible", timeout: 10000 });
    await button.click();
  }

  async selectCheckboxOptions(...checkboxes: string[]): Promise<void> {
    for (const checkbox of checkboxes) {
      await this.locator.selectcheckbox(checkbox).click();
    }
    await this.page.mouse.click(651, 625);
  }
}

//#endregion
