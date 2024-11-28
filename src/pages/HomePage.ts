import { Locator, Page, expect } from "@playwright/test";
import CommonPage from "./CommonPage";

class AdditionalDetailsPage extends CommonPage {
  readonly page: Page;
  readonly opportunityDropDown: Locator;
  readonly studyingDropdown: Locator;
  readonly opportunityDropDownOptions: Locator;
  readonly studyingDropdownOptions: Locator;
  readonly signInButton: Locator;
  readonly postJobButton: Locator;
  readonly lookingForFiled: Locator;
  readonly popularSearch: Locator;


  constructor(page: Page) {
    super(page);
    this.page = page;
    this.opportunityDropDown = this.page.locator("select#i-m-looking-for");
    this.opportunityDropDownOptions = this.page.locator("select#i-m-looking-for option");
    this.studyingDropdown = this.page.locator("select#i-m-studying");
    this.studyingDropdownOptions = this.page.locator("select#i-m-studying option");
    this.signInButton = this.page.locator("div[class*='Headerstyle__HeaderBar'] a", { hasText: "Sign in" });
    this.postJobButton = this.page.locator("div[class*='Headerstyle__HeaderBar'] a", { hasText: "Post job" });
    this.lookingForFiled = this.page.locator("input#keyword-search");
    this.popularSearch = this.page.locator("div[class*='QuickSearch__QuickSearchWrapper'] div[class*='QuickSearch__QuickSearchButtonsWrapper'] a");

  }

  async selectOpportunityDropdown() {
    // let randomIndex = Math.floor(Math.random() * await this.opportunityDropDownOptions.count());
    // if (randomIndex == 0) {
    //   randomIndex = 1;
    // }
    // await this.opportunityDropDown.selectOption({ index: randomIndex });
    // return await this.opportunityDropDownOptions.nth(randomIndex).textContent();
  }

  async selectStudyingDropdown() {
    let randomIndex = Math.floor(Math.random() * await this.studyingDropdownOptions.count());
    if (randomIndex == 0) {
      randomIndex = 1;
    }
    await this.studyingDropdown.selectOption({ index: randomIndex });
    return await this.studyingDropdownOptions.nth(randomIndex).textContent();
  }

  async verifyUserWithNameLogIn() {
    console.log(this.page.url());
    const user = this.page.locator("div[class*='Headerstyle__Header'] button span[class*='icon--profi']");
    await expect(user).toBeVisible();
  }
  async verifySignUpSuccess() {
    await expect(this.page.locator("div", { hasText: "You successfully verified your email address." }).first()
    ).toBeVisible();

  }

  async clickSignInButton() {
    await this.signInButton.click();
  }
  async clickGoToHomeButton() {
    await this.page.locator("button", { hasText: "Go to Homepage" }).click();
  }

  async verifySignInButtonDisplayed() {
    await expect(this.signInButton).toBeVisible();
  }

  async clickPostJobButton() {
    await this.postJobButton.click();
    await this.waitPageLoaded();
  }

  async inputLookingForField(value: string) {
    await this.lookingForFiled.fill(value);
  }

  async selectRandomPopularSearch() {
    const amountPopularSearch = await this.popularSearch.count();
    let randomIndex = Math.floor(Math.random() * amountPopularSearch);
    if (randomIndex == amountPopularSearch) {
      randomIndex = amountPopularSearch - 1;
    }
    const popularValue = await this.popularSearch.nth(randomIndex).innerText();
    await this.popularSearch.nth(randomIndex).click();
    await this.waitLoading();

    return popularValue;
  }

  async searchJobOnHomePage(value: string) {
    await this.lookingForFiled.fill(value);
    await this.clickShowJobButton();
  }
}

export default AdditionalDetailsPage;
