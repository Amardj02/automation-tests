import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  protected readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successToast = page.locator('.oxd-toast--success');
  }

  protected async waitForSuccessToast() {
    await expect(this.successToast).toHaveText(/Success/, { timeout: 10000 });
  }
}
