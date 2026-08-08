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

  async clictab(tabName: string): Promise<void> {
    const button = this.locator.tabmenu(tabName);
    await button.waitFor({ state: "visible", timeout: 10000 });
    await button.click();
  }

  async verifytabactive(tabname: string): Promise<void> {
    const tab = this.locator.tabmenu(tabname);
    await expect(tab).toHaveCSS("color", COLORS.PRIMARY);
    const underline = tab.locator("..").locator("span");
    await expect(underline).toHaveCSS("background-color", COLORS.PRIMARY);
  }

  async verifyWebAppTexts(
    webAppName: string,
    userName: string,
    email: string,
    titlePage: string,
    currentday: string,
  ): Promise<void> {
    await expect(this.locator.name(webAppName)).toBeVisible();
    await expect(this.locator.name(userName)).toBeVisible();
    await expect(this.locator.name(email)).toBeVisible();
    await expect(this.locator.titlepage(titlePage)).toBeVisible();
    const dayElement = this.locator.currentday(currentday);
    const latestDay = await dayElement.textContent();
    expect(latestDay).toContain(currentday);
  }

  async selectTimeRange(timeRange: string): Promise<void> {
    const button = this.locator.filterByOption(timeRange);
    await button.waitFor({ state: "visible", timeout: 10000 });
    await button.click();
  }

  async verifyTimerangeActive(timerange: string): Promise<void> {
    const timerangeButton = this.locator.filterByOption(timerange);
    await expect(timerangeButton).toHaveCSS("color", COLORS.PRIMARY);
    await expect(timerangeButton).toHaveCSS(
      "text-decoration-line",
      "underline",
    );
  }

  async verifyCurrentDay(currentday: string): Promise<void> {
    const dayElement = this.locator.currentday(currentday);
    const latestDay = await dayElement.textContent();
    console.log(`- Current Day on UI : ${latestDay}`);
    expect(latestDay).toContain(currentday);
    console.log("Successfully verified the current day!");
  }
}

//#endregion
