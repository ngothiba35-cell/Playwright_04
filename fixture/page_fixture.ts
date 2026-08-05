import { test as base, expect } from "@playwright/test";
import { RegisterFormPage } from "../page_object/RegisterFormPage";
import { BookStorePage } from "../page_object/BookStore";
import { LoginPage } from "../page_object/Login";
import { ProfilePage } from "../page_object/Profile";

type AppFixtures = {
    studentPage: RegisterFormPage;
    bookStorePage: BookStorePage;
    loginPage: LoginPage;
    profilePage: ProfilePage;
};

export const test = base.extend<AppFixtures>({
    studentPage: async ({ page }, use) => {
        await use(new RegisterFormPage(page));
    },
    bookStorePage: async ({ page }, use) => {
        await use(new BookStorePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    }   

});

export { expect };
