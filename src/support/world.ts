import { Browser, BrowserContext, Page } from "@playwright/test";
import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { config } from "../support/config";
import { dashboardPage } from "../pages/dashboard/dashboardPage";
import { BasePage } from "../pages/core/basePage";
import { LoginPage } from "../pages/login/loginPage";
import { BaseLocator } from "../pages/core/baseLocator";
export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    dashboardPage!: dashboardPage;
    basePage!: BasePage;
    loginPage!: LoginPage;
    baseLocator!: BaseLocator;

    config = config;
    accessToken: string | undefined;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);
