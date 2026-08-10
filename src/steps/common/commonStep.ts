import { Given, Then, When, DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";
import { BasePage } from "../../pages/core/basePage";
import * as fs from "fs";

//#region Step Definitions

// Step navigate to a page
Given(
  "User is on the {string} page",
  async function (this: CustomWorld, path: string) {
    await this.page.goto(path);
  },
);

Given(
  "I select tenant {string} when clicking {string}",
  { timeout: 120 * 1000 },
  async function (this: CustomWorld, tenant: string, flag: string) {
    await this.basePage.goto(this.config.baseUrl);
    await this.basePage.fillTextbox("email", "huyen.le@yara.com");
    await this.basePage.clickButton("Send login link");
    const outlookContext = await this.context.browser()!.newContext({
      storageState: "outlook-auth.json",
    });
    try {
      const outlookPage = await outlookContext.newPage();
      await outlookPage.goto("https://outlook.office.com/mail");
      await outlookPage.waitForSelector("div[role='main']", { timeout: 60000 });
      let magicLink: string | null = null;
      for (let i = 0; i < 12; i++) {
        console.log(`Checking inbox attempt ${i + 1}`);
        await outlookPage.reload();
        await outlookPage.waitForSelector("div[role='option']", {
          timeout: 20000,
        });
        await outlookPage.waitForTimeout(5000);
        const emails = outlookPage.locator("div[role='option']");
        const count = await emails.count();
        console.log("Email count:", count);
        for (let j = 0; j < count; j++) {
          const email = emails.nth(j);
          const text = await email.innerText();
          console.log(`Email ${j}:`, text);
          if (!text.includes("Login to DVCS Ops Insights")) {
            continue;
          }
          console.log("Found login email");
          await email.click();
          await outlookPage.waitForSelector(
            "text=We've received a login request",
          );
          const linkElement = outlookPage.locator("a:has-text('Log In')");
          await linkElement.waitFor({
            state: "visible",
            timeout: 30000,
          });
          magicLink = await linkElement.getAttribute("href");
          break;
        }
        if (magicLink) {
          break;
        }
        console.log("Hasn't found login email...");
        await outlookPage.waitForTimeout(5000);
      }
      if (!magicLink) {
        throw new Error("Cannot find login link");
      }
      console.log("LOGIN LINK:", magicLink);
      await this.page.goto(magicLink, {
        waitUntil: "domcontentloaded",
      });
      await this.page.waitForLoadState("networkidle");
    } finally {
      await outlookContext.close();
    }
    await this.page.waitForURL(
      `${process.env.BASE_URL}/en-us/dashboard?countryCode=gh`,
    );
    await this.basePage.clickButton(flag);
    await this.basePage.selectOptionFromDropdown(tenant);
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
Then(
  "User verifies the {string} tab is selected",
  async function (tabname: string) {
    await this.basePage.verifyTabActive(tabname);
  },
);
When(
  "User selects timerange {string}",
  async function (this: CustomWorld, timeRange: string) {
    await this.basePage.selectTimeRange(timeRange);
  },
);

Then(
  "User verifies the {string} timerange is selected",
  async function (this: CustomWorld, timeRange: string) {
    await this.basePage.verifyTimerangeActive(timeRange);
  },
);
Then("User verifies static texts", async function (dataTable) {
  const data = dataTable.hashes()[0];
  await this.basePage.verifyWebAppTexts(
    data.webAppName,
    data.userName,
    data.email,
    data.titlePage,
    data.currentday,
  );
});
Then(
  "User verifies the incident details {string}, {string}, {string}, {string}",
  async function (
    expectedMonth: string,
    expectedDay: string,
    expectedWeekday: string,
    expectedTime: string,
  ) {
    await this.basePage.verifyIncidentByData(
      expectedMonth,
      expectedDay,
      expectedWeekday,
      expectedTime,
    );
  },
);
When("User clicks custom range {string}", async function (customRange: string) {
  await this.basePage.clickCustomRange(customRange);
});
When(
  "User selects start date {string} and end date {string}",
  async function (this: CustomWorld, startDate: string, endDate: string) {
    await this.basePage.selectDateRange(startDate, endDate);
  },
);
Then(
  "User verifies the date range {string} is displayed",
  async function (this: CustomWorld, dateRange: string) {
    await this.basePage.verifyDateRange(dateRange);
  },
);
