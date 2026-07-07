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
      .or(this.page.locator(`[data-testid="button-${name}"]`))
      .or(this.page.getByText(name))
      .or(this.page.locator(`[aria-label="${name}"]`));
  };
}
