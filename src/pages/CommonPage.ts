import { Locator, Page, expect } from "@playwright/test";
import * as gmail from 'gmail-tester';
import path from "path";

class CommonPage {
  readonly page: Page;
  readonly loadingIcon: Locator;



  constructor(page: Page) {
    this.page = page;
    this.loadingIcon = this.page.locator("div[class*='loading-message']").first();

  }

  async openURL(url: string) {
    try {
      await this.page.goto(url, { timeout: 1005 * 60 * 1000 });
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error: any) {
      if (!error.message.includes('NS_BINDING_ABORTED')) {
        throw error;
      }
    }

  }

  async waitLoading() {
    //   await this.loadingIcon.waitFor({ state: "hidden" });
    //   await expect(this.loadingIcon).toHaveCount(0);
    await this.page.waitForTimeout(2000);


  }

  async waitPageLoaded() {
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  async chooseRandomNumber(min, max) {
    min = min - 1;
    max = max - 1;
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async gotoSpecificPage(value: string) {
    const url = process.env.AUT_URL + value;
    console.log("Go to: " + url);
    await this.openURL(url);
  }


}


export default CommonPage;
