import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";

//#region Step Definitions

// Step verify success message appears after login submit
Then(
  "User sees the {string} success message",
  async function (this: CustomWorld, testId: string) {
    await expect(this.page.locator(`[data-testid="${testId}"]`)).toBeVisible();
  },
);

// Step verify error message appears when email is invalid
Then(
  "User sees the error message {string}",
  async function (this: CustomWorld, message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  },
);

//#endregion
