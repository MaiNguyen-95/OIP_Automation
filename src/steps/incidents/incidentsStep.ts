import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";

When("User clicks custom range {string}", async function (customRange: string) {
  await this.baseIncidents.selectCustomRange(customRange);
});
When(
  "User selects start date {string} and end date {string}",
  async function (startDate: string, endDate: string) {
    await this.baseIncidents.selectDateRange(startDate, endDate);
  },
);
Then(
  "User verifies the date range {string} is displayed",
  async function (dateRange: string) {
    await this.baseIncidents.verifySelectedDateRange(dateRange);
  },
);
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
