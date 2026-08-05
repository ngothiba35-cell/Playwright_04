import { Page, Locator, expect } from "@playwright/test";

export class BasePage{
    readonly page : Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string){
        await this.page.goto(url);
    }

    async click (locator: Locator){
        await locator.click();
    }

    async fill(locator: Locator, value: string){
        await locator.fill(value);
    }

    async verifyText (locator:Locator, expected: string){
        await expect(locator).toHaveText(expected);
    }
}