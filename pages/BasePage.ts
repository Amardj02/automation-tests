import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successToast = page.locator('.oxd-toast--success');
  }

async waitForSuccessToast() {
  await this.successToast.waitFor({ state: 'visible', timeout: 15000 });
  await expect(this.successToast).toHaveText(/Success/, { timeout: 10000 });
}
}