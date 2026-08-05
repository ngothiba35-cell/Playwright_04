import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_object/Login';
import { ProfilePage } from '../page_object/Profile';
import { login } from '../test_data/login';
import { bookName } from '../test_data/book';

test.describe('Delete Book', () => {

    test('Delete book successfully', async ({ page }) => {

        // Create Page Objects
        const loginPage = new LoginPage(page);
        const profilePage = new ProfilePage(page);

        // Step 1: Open Login page
        await loginPage.open(login.urls.login);

        // Step 2: Login
        await loginPage.login(
            login.username,
            login.password
        );

        // Verify user is redirected to Profile page
        await expect(page).toHaveURL(login.urls.profile);

        // Step 3: Search book
        await profilePage.searchBook(bookName.title);

        // Step 4: Verify the book exists
        const row = profilePage.bookRowLocator(bookName.title);
        await expect(row).toBeVisible();

        // Step 5: Delete the book
        await profilePage.deleteBook(bookName.title);

        // Step 6: Verify the book is deleted
        await expect(
            profilePage.bookRowLocator(bookName.title)
        ).toHaveCount(0);

    });

});