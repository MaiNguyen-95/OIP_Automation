import { Page, expect, Locator } from "@playwright/test";
import * as dotenv from "dotenv";
import { BaseLocator } from "./baseLocator";
import { COLORS } from "../../constants/color";
dotenv.config(); // Load environment variables from .env

export class BasePage {
  locator: BaseLocator;

  constructor(protected page: Page) {
    this.locator = new BaseLocator(page);
  }

  //#region Locators

  //#endregion

  //#region Actions
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async fillTextbox(name: string, value: string) {
    const textbox = this.locator.textbox(name);
    await textbox.waitFor({ state: "visible" });
    await textbox.clear();
    await textbox.fill(value);
    await this.page.waitForTimeout(1000);
  }

  async clickButton(name: string) {
    const button = this.locator.button(name);
    await button.waitFor({ state: "visible" });
    await button.click();
    await this.page.waitForTimeout(3000);
  }

  async clickLink(name: string) {
    const link = this.locator.link(name);
    await link.waitFor({ state: "visible" });
    await link.click();
    await this.page.waitForURL("**/*", { timeout: 5000 });
    await this.page.waitForTimeout(3000);
  }

  async verifyText(
    text: string,
    state: string,
    timeout = 10000,
  ): Promise<void> {
    const locator = this.page.getByText(new RegExp(text, "i")).first();
    if (state === "visible") {
      await expect(locator).toBeVisible({ timeout });
    } else if (state === "hidden") {
      await expect(locator).toBeHidden({ timeout });
    } else if (state === "attached") {
      await expect(locator).toBeAttached({ timeout });
    } else if (state === "detached") {
      await expect(locator).not.toBeAttached({ timeout });
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

  async expandRow(name: string) {
    const button = this.locator.expandRowButton(name);
    await button.waitFor({ state: "visible" });

    const isExpanded = await button.getAttribute("aria-expanded");
    if (isExpanded !== "true") {
      await this.locator.expandRowToggle(name).click();
      await expect(button).toHaveAttribute("aria-expanded", "true", {
        timeout: 10000,
      });
    }
  }

  async clickTab(tabName: string): Promise<void> {
    const tab = this.locator.text(tabName);
    await tab.waitFor({ state: "visible", timeout: 10000 });
    await tab.click();
  }

  async verifyTabActive(tabName: string): Promise<void> {
    const tab = this.locator.text(tabName);
    await expect(tab).toHaveCSS("color", COLORS.PRIMARY);
    const underline = tab.locator("..").locator("span");
    await expect(underline).toHaveCSS("background-color", COLORS.PRIMARY);
  }

  async selectTimeRange(timeRange: string): Promise<void> {
    const button = this.locator.button(timeRange);
    await button.waitFor({ state: "visible", timeout: 10000 });
    await button.click();
  }

  async verifyTimerangeActive(timeRange: string): Promise<void> {
    const button = this.page.getByRole("button", {
      name: timeRange,
      exact: true,
    });
    await expect(button).toHaveCSS("color", COLORS.PRIMARY);
    await expect(button).toHaveCSS("text-decoration-line", "underline");
  }

  async clickCustomRange(customRange: string): Promise<void> {
    const button = this.locator.button(customRange);
    await button.waitFor({ state: "visible" });
    await button.click();
  }

  async selectDateRange(startDate: string, endDate: string): Promise<void> {
    await this.locator.button(startDate, 0).click();
    await this.locator.button(endDate, 1).click();
  }

  async verifyDateRange(dateRange: string): Promise<void> {
    await expect(this.locator.text(dateRange)).toBeVisible();
  }
}

//#endregion
