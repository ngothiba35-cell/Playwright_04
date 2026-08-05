import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
    username: Locator;
    password: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        super(page);
    
    this.username = page.locator('#userName');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login');
 }

async open(url: string) {
    await this.navigate(url);
}

async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await Promise.all([
        this.page.waitForNavigation({ url: '**/profile', waitUntil: 'networkidle', timeout: 20000 }),
        this.loginButton.click(),
    ]);
}
}