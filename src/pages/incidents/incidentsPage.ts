import { Page, expect, Locator } from "@playwright/test";
import * as dotenv from "dotenv";
import { BaseLocator } from "../core/baseLocator";

dotenv.config(); // Load environment variables from .env

export class BaseIncidents {
  locator: BaseLocator;

  constructor(protected page: Page) {
    this.locator = new BaseLocator(page);
  }
  private get calendarContainer() {
    return (index: number) =>
      this.page.locator(
        `(//*[@data-testid="date-range-picker-custom"]//div[contains(@class,"calendar-section")])[${index}]`,
      );
  }
  private monthLabel(calendar: Locator) {
    return calendar.locator(".rdp-caption_label");
  }
  private prevBtn(calendar: Locator) {
    return calendar.locator(".rdp-button_previous");
  }
  private dayLocator(calendar: Locator, date: string) {
    return calendar.locator(
      `//*[@data-day="${date}" and not(@data-disabled="true")]`,
    );
  }
  month = (month: string) =>
    this.page.locator(
      `//div[contains(@class, 'text-xs') and contains(text(), '${month}')]`,
    );
  dayAndWeekday = (daynumber: string, weekdaytext: string) =>
    this.page.locator(
      `//div[contains(@class, 'flex') and contains(@class, 'items-baseline') and .//span[normalize-space()="${daynumber}"] and .//span[normalize-space()="${weekdaytext}"]]`,
    );
  time = (timetext: string) =>
    this.page.locator(`//time[normalize-space()="${timetext}"]`);

  async selectCustomRange(customRange: string): Promise<void> {
    const button = this.locator.customRange(customRange);
    await button.waitFor({ state: "visible", timeout: 10000 });
    await button.click();
  }

  async pickDate(calendarIndex: number, date: string) {
    const calendar = this.calendarContainer(calendarIndex);
    const monthLabel = this.monthLabel(calendar);
    const prevBtn = this.prevBtn(calendar);
    const targetMonth = new Date(date).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    while (true) {
      const currentMonth = (await monthLabel.textContent())?.trim();
      if (currentMonth === targetMonth) break;
      const isDisabled = await prevBtn.getAttribute("aria-disabled");
      if (isDisabled === "true") {
        throw new Error(`Cannot navigate to the target month: ${targetMonth}`);
      }
      await prevBtn.click();
    }
    const day = this.dayLocator(calendar, date);
    if ((await day.count()) === 0) {
      throw new Error(`Date ${date} does not exist or is disabled`);
    }
    await day.click();
  }

  async verifySelectedDateRange(
    startDate: string,
    endDate: string,
  ): Promise<void> {
    const formatDate = (date: string): string => {
      return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };
    const expectedRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    const button = this.locator.customRange(expectedRange);
    await button.waitFor({
      state: "visible",
      timeout: 10000,
    });
    await expect(button).toContainText(expectedRange);
  }

  async verifyIncidentByData(
    month: string,
    daynumber: string,
    weekdaytext: string,
    timetext: string,
  ): Promise<void> {
    const monthText = (await this.month(month).textContent())?.trim() || "";
    const dayAndWeekdayText =
      (
        await this.dayAndWeekday(daynumber, weekdaytext).textContent()
      )?.trim() || "";
    const timeText = (await this.time(timetext).textContent())?.trim() || "";
    expect(monthText).toContain(month);
    expect(dayAndWeekdayText).toContain(daynumber);
    expect(dayAndWeekdayText).toContain(weekdaytext);
    expect(timeText).toBe(timetext);
  }
}
