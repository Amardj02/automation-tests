import { Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  private readonly pimMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.locator('a.oxd-main-menu-item[href*="pim/viewPimModule"]');
  }

  async navigateToPIM() {
    await this.pimMenu.click();
  }
}
