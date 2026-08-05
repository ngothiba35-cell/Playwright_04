// ProfilePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly url = 'https://demoqa.com/profile';
  readonly searchBox = '#searchBox';
  readonly tableBody = '.rt-tbody';

  constructor(page: Page) {
    this.page = page;
  }

  // Optional navigation (in case login didn't auto-navigate)
  async goto() {
    await this.page.goto(this.url);
  }

  // Search for a book using the profile search box (client-side filter)
  async searchBook(title: string) {
    await this.page.fill(this.searchBox, title);
    // small wait for table to update
    await this.page.waitForTimeout(300);
  }

  // Returns a Locator for the row that contains the given book title
  bookRowLocator(title: string): Locator {
    // Use :has-text for stable text matching within the row container
    return this.page.locator(`${this.tableBody} .rt-tr-group:has-text("${title}")`);
  }

  // Delete a book by title. Handles the confirmation modal and browser dialogs.
  async deleteBook(title: string) {
    const row = this.bookRowLocator(title).first();
    await expect(row).toBeVisible({ timeout: 5000 });

    // Locate delete control inside the specific row
    const deleteButton = row.locator('span[title="Delete"], button[title="Delete"], svg[title="Delete"]');

    // Ensure delete button exists and click it
    await expect(deleteButton).toHaveCount(1);
    await deleteButton.first().click();

    // Handle in-page confirmation modal (DemoQA uses an OK button with id closeSmallModal-ok)
    const confirmBtn = this.page.locator('#closeSmallModal-ok');
    if (await confirmBtn.count() > 0) {
      await confirmBtn.first().click();
    }

    // Also accept any native dialog just in case
    this.page.on('dialog', async (dialog) => {
      try {
        await dialog.accept();
      } catch {
        /* ignore */
      }
    });

    // Wait until the row disappears
    await expect(this.bookRowLocator(title)).toHaveCount(0, { timeout: 5000 });
  }
}