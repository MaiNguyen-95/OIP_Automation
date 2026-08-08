import { Page, Locator } from "@playwright/test";

export class BaseLocator {
  constructor(protected page: Page) {}

  textbox = (name: string) => {
    return this.page
      .getByRole("textbox", { name })
      .or(this.page.getByLabel(name))
      .or(this.page.getByPlaceholder(name))
      .or(this.page.locator(`[data-testid="input-${name}"]`));
  };

  button = (name: string) => {
    return this.page
      .getByRole("button", { name })
      .or(this.page.locator("button", { hasText: name }))
      .or(this.page.locator(`[aria-label="${name}"]`));
  };

  link = (name: string) => {
    return this.page
      .getByRole("link", { name })
      .or(this.page.locator(`[aria-label="${name}"]`));
  };

  dropdownlist = (tenant: string) =>
    this.page.locator(`xpath=//div[normalize-space()="${tenant}"]`);

  dropdownlistcheckbox = (checkbox: string, index: number) =>
    this.page.locator(
      `xpath=(//span[normalize-space()='${checkbox}'])[${index}]`,
    );

  selectcheckbox = (checkbox: string) =>
    this.page.locator(`xpath=(//span[normalize-space()='${checkbox}'])`);

  tabmenu = (tab: string) =>
    this.page.locator(`xpath=(//p[normalize-space()="${tab}"])`);

  name = (name: string) =>
    this.page.locator(`//span[normalize-space()="${name}"]`);

  titlepage = (titlepage: string) =>
    this.page.locator(`//h2[normalize-space()="${titlepage}"]`);

  currenttime = (currenttime: string) =>
    this.page.locator(`//time[normalize-space()="${currenttime}"]`);

  filterByOption = (option: string) =>
    this.page.locator(`//button[normalize-space()="${option}"]`).first();

  customRange = (customRange: string) =>
    this.page.getByRole("button", { name: customRange }).first();

  currentday = (currentday: string) =>
    this.page.locator(`//div[normalize-space()="${currentday}"]`);
}
