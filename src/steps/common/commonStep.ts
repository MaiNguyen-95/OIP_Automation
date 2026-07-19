import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";
import { BasePage } from "../../pages/core/basePage";

//#region Step Definitions

// Step navigate to a page
Given(
  "User is on the {string} page",
  async function (this: CustomWorld, path: string) {
    await this.page.goto(path);
  },
);

// Step input text into a field
When(
  "User inputs {string} in the {string} field",
  async function (value: string, name: string) {
    await this.basePage.fillTextbox(name, value);
  },
);

//Step click button
When("User clicks on the {string} button", async function (name: string) {
  await this.basePage.clickButton(name);
});

// Step click link
When(
  "User clicks on the {string} link",
  async function (this: CustomWorld, name: string) {
    await this.basePage.clickLink(name);
  },
);

// Step verify navigate after click link
Then(
  "User is navigated to the {string} page",
  async function (this: CustomWorld, path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  },
);

// Step verify common footer "Powered by Yara" is visible
Then(
  "User sees the footer with Yara branding",
  async function (this: CustomWorld) {
    await expect(this.page.getByText("Powered by Yara")).toBeVisible();
  },
);

// Step verify button is visible (without clicking)
Then(
  "User sees the {string} button",
  async function (this: CustomWorld, name: string) {
    await this.basePage.locator.button(name).waitFor({ state: "visible" });
  },
);
