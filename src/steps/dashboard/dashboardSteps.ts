import { When, Then } from "@cucumber/cucumber";
//View all service
When("From {string} I click {string}", async function (datatestid: string, text: string) {
    await this.dashboardPage.clicktopservice(datatestid, text);
    await this.page.waitForTimeout(2000);
});
//Click to close popup Services latency
When("I click to {string} button to close popup Services latency", async function (btnclose: string) {
    await this.dashboardPage.clickbtnClose(btnclose);
});
//Verify popup list of service
Then("I verify popup is {string}", async function (state: string) {
    await this.dashboardPage.verifyPopup(this.dashboardPage.popupService(), state as "open" | "closed");
});
//Verify UI Uptime values match with API response
Then("I verify uptime for {string} matches API field {string}", async function (timeLabel: string, apiKey: string) {
    await this.dashboardPage.verifyDynamicUptimeMatchesApi(timeLabel, apiKey);
});
//Verify UI Latency values match with API response
Then("I verify both {string} and {string} latency metrics for {string} timerange on card {string} match API", async function (p95Label, p99Label, timerange, cardName) {
    await this.dashboardPage.verifyAllLatencyMetrics(cardName, timerange);
});
//Verify list of services is visible when user click plus to expand list of each service
Then("I verify list of service is visible", async function () {
    await this.dashboardPage.verifyApiListIsVisible();
});
//verify the duration is correct with the API
Then("The latency for {string} should be {string}", async function (apiName: string, expectedTime: string) {
    await this.dashboardPage.verifyApiLatency(apiName, expectedTime);
});
