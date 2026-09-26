import { Browser, BrowserContext, Page } from "@playwright/test";
import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { config } from "../support/config";
import { BaseDashboard } from "../pages/dashboard/dashboardPage";
import { BasePage } from "../pages/core/basePage";
import { IncidentPage } from "../pages/incidents/incidentPage";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  baseDashboard!: BaseDashboard;
  basePage!: BasePage;
  incidentPage!: IncidentPage;
  config = config;
  accessToken: string | undefined;
  moduleData!: Record<string, string[]>;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
