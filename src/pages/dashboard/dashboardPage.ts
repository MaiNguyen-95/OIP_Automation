import { Page } from "@playwright/test";
import { BasePage } from "../core/basePage";

export class BaseDashboard extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateTodashboardPage() {
    await this.page.goto('/dashboard');
  }
}
