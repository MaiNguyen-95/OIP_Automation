import { Page, expect, Locator } from "playwright/test";
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

  async input(name: string, value: string) {
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
}

//#endregion
