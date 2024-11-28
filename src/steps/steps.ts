import { createBdd } from 'playwright-bdd';
import fs from "fs";
import format from "date-fns/format";
import GenData from "../utils/genData";

const { Given, When, Then } = createBdd();

Given('I open booking page', async ({ page }) => {
	const url = process.env.URL;
	if (url) {
		await page.goto(url);
	}
});

When('I selecting Location', async ({ page }) => {
	await page.locator("button[id='consent_prompt_accept_all_cookies']").click();
	await page.locator("form[data-testid='booking-magnet-form-trains'] input[name='destination']").first().click();
	await page.locator("ul[data-testid='popular-list-container'] button").nth(0).click(); // Selecting the first available location
	await page.waitForTimeout(1000);
});

When('I selecting Return Date', async ({ page }) => {
	await page.locator("button[aria-label='Add return journey']").first().click();
	await page.locator("div[data-testid='popover-container-wrapper']").waitFor();
	await page.locator("tbody td:not([aria-disabled])").nth(1).click(); // Selecting the second available date
	await page.waitForTimeout(1000);
	await page.getByRole("button", { name: "Search" }).first().click();
	await page.getByRole("button", { name: "Search" }).first().waitFor({ state: "hidden" });
	await page.waitForLoadState("domcontentloaded");
});

When('I selecting Ticket Price', async ({ page }) => {
	await page.locator("div[data-testid='search-results-outbound-journey-price']").first().click();
	await page
		.locator("div[data-testid='search-results-outbound-tab-panels'] [data-testid='search-results-outbound-tab-panel'][open] button")
		.click();
	await page.waitForLoadState("domcontentloaded");
	await page.waitForTimeout(1000);

	await page.locator("div[data-testid='search-results-inbound-journey-price']").first().click();
	await page
		.locator("div[data-testid='search-results-inbound-tab-panels'] [data-testid='search-results-inbound-tab-panel'][open] button")
		.click();
	await page.waitForLoadState("domcontentloaded");
	await page.waitForTimeout(1000);
	await page.locator("button", { hasText: "Continue to checkout" }).click();
	await page.locator("button", { hasText: "Continue to checkout" }).waitFor({ state: "hidden" });
	await page.waitForLoadState("domcontentloaded");
	await page.waitForTimeout(1000);
});

When('I proceeding to Checkout', async ({ page }) => {
	const user = new GenData().genUserData();

	// await this.page.getByText("Check out as a guest").first().click();
	await page.waitForTimeout(5000);
	await page.locator("//span[text()='Check out as a guest']/../..").first().click();
	await page.waitForLoadState("domcontentloaded");

	// Fill customer details
	await page.locator("input[id='first-name-0']").fill(user.firstName);
	await page.locator("input[id='last-name-0']").fill(user.lastName);
	await page.locator("input[id='email-0']").fill(user.email);
	await page.locator("input[id='customer.email']").fill(user.email);
	await page.locator("fieldset[id='customer.phoneNumber'] input").fill(user.phoneNumber);

	// Fill payment details
	const cardNumberFrame = await page.frameLocator("iframe[title*='card number']");
	await cardNumberFrame.getByPlaceholder("1234 5678 9012 3456").fill("4111 1111 4555 1142");

	const expiryDateFrame = await page.frameLocator("iframe[title*='expiry date']");
	await expiryDateFrame.getByPlaceholder("MM/YY").fill("03/30");

	const cvcFrame = await page.frameLocator("iframe[title*='security code']");
	await cvcFrame.getByPlaceholder("3 digits").fill("737");

	await page.getByPlaceholder("J. Smith").fill(user.firstName); // Name on card

	// Fill billing address
	await page.locator("input[id='address-line1']").fill("abc");
	await page.locator("input[id='address-level2']").fill("abc");
	await page.locator("input[id='postal-code']").fill("70000");

	// Accept terms and complete payment
	await page.locator("input[id='agree']").click();
	// await this.page.getByText("Buy now").first().click();
	await page.locator("//span[text()='Buy now']/../..").first().click();
	await page.waitForLoadState("domcontentloaded");
	await page.waitForTimeout(1000);

	// Retrieve and save the booking reference
	const referenceCode = await page.locator("p", { hasText: "Booking reference" }).locator("span").innerText();
	console.log("Booking Reference (PNR):", referenceCode);

	const timestamp = format(Date.now(), "yyyyMMddHHmmss");
	const fileName = `./test-${timestamp}.txt`;

	fs.writeFile(fileName, referenceCode, (err) => {
		if (err) {
			console.error("Error saving booking reference:", err);
		}
	});

});
