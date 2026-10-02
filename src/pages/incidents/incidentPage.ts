import { Page } from "@playwright/test";
import { BasePage } from "../core/basePage";

export class IncidentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //#region Actions

  // Open the first incident in the list that still has the given action button
  // available, so the scenario does not depend on a hard-coded incident index.
  async openFirstIncidentWithButton(buttonName: string): Promise<void> {
    const listUrl = this.page.url();
    const total = await this.page
      .getByRole("link", { name: "Incident Detail" })
      .count();

    for (let i = 0; i < total; i++) {
      if (i > 0) {
        await this.page.goto(listUrl, { waitUntil: "domcontentloaded" });
        await this.page.waitForTimeout(1500);
      }
      await this.page
        .getByRole("link", { name: "Incident Detail" })
        .nth(i)
        .click();
      await this.page.waitForTimeout(2500);

      if (await this.locator.button(buttonName).isVisible()) {
        return;
      }
    }

    throw new Error(
      `No incident with an available "${buttonName}" button was found in the list`,
    );
  }

  //#endregion
}
