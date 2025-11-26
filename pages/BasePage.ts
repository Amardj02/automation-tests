import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successToast = page.locator('.oxd-toast--success');
  }

  async waitForSuccessToast() {
  await expect(this.successToast).toBeVisible();
  await expect(this.successToast).toContainText('Success');
}
}