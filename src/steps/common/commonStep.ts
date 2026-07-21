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
Then(
  "User verifies the {string} text is {string}",
  async function (this: CustomWorld, text: string, state: string) {
    await this.basePage.verifyText(text, state);
  },
);
When(
  "User click {string} to open Dropdown list",
  async function (name: string) {
    await this.basePage.clickOpenDropdownList(name);
  },
);
When(
  "User selects {string} from the dropdown list",
  async function (option: string) {
    await this.basePage.selectOptionFromDropdown(option);
  },
);
When(
  "User opens {string} checkbox dropdown with index {int}",
  async function (checkbox: string, index: number) {
    await this.basePage.OpenListCheckbox(checkbox, index);
  },
);
When(
  "User selects {string} from the checkbox list",
  async function (options: string) {
    const checkboxes = options.split(",").map((option) => option.trim());
    await this.basePage.selectCheckboxOptions(...checkboxes);
  },
);
