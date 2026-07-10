import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";
import { getMagicLinkAndOpen } from "../../pages/login/loginPage";

Given("I navigate to the login page", async function (this: CustomWorld) {
    await this.basePage.goto(this.config.baseUrl);
});
// Fill input
When("I fill input {string} with {string}", async function (this: CustomWorld, inputName: string, value: string) {
    await this.basePage.fillInGeneralInputField(inputName, value);
});
// Click button login
When("I click button {string}", async function (text: string) {
    await this.basePage.clickButtonByText(text);
});
//verify send login link successful
Then("I should see text {string}", async function (this: CustomWorld, text: string) {
    await this.basePage.expectTextVisible(text);
});
//Click to open dropdown filter
When("I click to open tenant combobox {string}", async function (datatestid: string) {
    await this.basePage.clickFilter(datatestid);
});
//Select option in dropdown filter
When("I selects {string} option on combobox", async function (filtername: string) {
    await this.basePage.clickOptionFilter(filtername);
    await this.page.waitForTimeout(3000);
});
//Select timerange
When("I select {string} timerange {string}", async function (timerange: string, datatestid: string) {
    await this.basePage.selectTimerange(datatestid, timerange);
    await this.page.waitForTimeout(2000);
});
//Click to expand list of service
When("I click to expand list of service at {string}", async function (expandservice: string) {
    await this.basePage.clickExpandListOfService(expandservice);
    await this.page.waitForTimeout(2000);
});
//Open Outlook and click Login link
When("I login via Outlook magic link", { timeout: 120 * 1000 }, async function (this: CustomWorld) {
    await getMagicLinkAndOpen(this.context, this.page);
    await this.page.waitForLoadState("networkidle");
});
When("I verify login redirect to DVCS Ops Insights", async function (this: CustomWorld) {
    await this.loginPage.verifyRedirectToApp();
    await this.page.waitForTimeout(3000);
});
