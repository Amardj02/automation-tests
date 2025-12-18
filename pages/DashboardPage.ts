import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly pimMenu: Locator;
  private readonly dashboardHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.pimMenu = page.locator('a.oxd-main-menu-item[href*="pim/viewPimModule"]');
    this.dashboardHeader = page.locator(
      'h6.oxd-topbar-header-breadcrumb-module:has-text("Dashboard")'
    );
  }

  async navigateToPIM() {
    await this.pimMenu.click();
  }

  async waitForLoad() {
    await this.dashboardHeader.waitFor({ state: 'visible' });
  }
}
