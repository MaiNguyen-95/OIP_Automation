import { When } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";

//#region Step Definitions

// Step open the first incident that still has the given action button
When(
  "User opens the first incident that can be marked {string}",
  { timeout: 180 * 1000 },
  async function (this: CustomWorld, buttonName: string) {
    await this.incidentPage.openFirstIncidentWithButton(buttonName);
  },
);

//#endregion
