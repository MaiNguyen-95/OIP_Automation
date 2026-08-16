import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";
import { loginWithMagicLink } from "../../pages/login/loginPage";

//#region Step Definitions
Given(
  "I select tenant {string} when clicking {string}",
  { timeout: 120 * 1000 },
  async function (this: CustomWorld, tenant: string, flag: string) {
    await loginWithMagicLink(
      this.context,
      this.page,
      this.basePage,
      this.config.baseUrl,
      tenant,
      flag,
    );
  },
);

//#endregion
