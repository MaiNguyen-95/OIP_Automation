import { setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(30 * 1000);

import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { CustomWorld } from "./world";
import { dashboardPage } from "../pages/dashboard/dashboardPage";
import { BasePage } from "../pages/core/basePage";
import { LoginPage } from "../pages/login/loginPage";
import { BaseLocator } from "../pages/core/baseLocator";

let browser: Browser;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function (this: CustomWorld) {
    this.context = await browser.newContext({
        extraHTTPHeaders: {
            "x-tenant-id": process.env.TENANT_ID!,
            Origin: process.env.BASE_URL!,
            Referer: process.env.BASE_URL!,
        },
    });

    this.page = await this.context.newPage();

    this.dashboardPage = new dashboardPage(this.page);
    this.basePage = new BasePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.baseLocator = new BaseLocator(this.page);
});

After(async function (this: CustomWorld) {
    await this.page?.close();
    await this.context?.close();
});

AfterAll(async function () {
    await browser?.close();
});
