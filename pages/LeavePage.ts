import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LeavePage extends BasePage {
  readonly page: Page;

  readonly leaveListLink: Locator;
  readonly entitlementsParent: Locator;
  readonly entitlementsTab: Locator;
  readonly employeeNameInput: Locator;
  readonly leaveTypeDropdown: Locator;
  readonly leaveTypeOption: (name: string) => Locator;
  readonly amountInput: Locator;
  readonly saveButton: Locator;
  readonly confirmButton: Locator;
  readonly assignLeaveLink: Locator;
  readonly leaveTypeSelect: Locator;
  readonly startDatePicker: Locator;
  readonly endDatePicker: Locator;
  readonly assignButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.leaveListLink = page.locator('a.oxd-main-menu-item[href="/web/index.php/leave/viewLeaveModule"]');
    this.entitlementsParent = page.locator('li.--parent:has(span > i.oxd-icon)').first();
    this.entitlementsTab = page.locator('a.oxd-topbar-body-nav-tab-link').first();

    this.employeeNameInput = page.locator('.oxd-autocomplete-text-input input');
    this.leaveTypeDropdown = page.locator('.oxd-select-text--arrow').first();
    this.leaveTypeOption = (name: string) => page.getByRole('option', { name });
    this.amountInput = page.getByRole('textbox').nth(2);

    this.saveButton = page.locator('button[type="submit"]');
    this.confirmButton = page.locator('button.oxd-button--secondary.orangehrm-button-margin[type="button"]');
    this.assignLeaveLink = page.locator('li.oxd-topbar-body-nav-tab a.oxd-topbar-body-nav-tab-item').nth(3);

    this.leaveTypeSelect = page.locator('.oxd-select-wrapper .oxd-select-text-input');
    this.startDatePicker = page.locator('.oxd-date-input input').first();
    this.endDatePicker = page.locator('.oxd-date-input input').nth(1);
    this.assignButton = page.locator('button.oxd-button--secondary.orangehrm-left-space[type="submit"]');
  }

  async navigateToLeaveList() {
    await this.leaveListLink.click();
  }

  async navigateToEntitlements() {
    await this.entitlementsParent.click();
    await this.entitlementsTab.click();
  }

  async navigateToAssignLeave() {
    await this.assignLeaveLink.click();
  }

  async addEntitlement(employeeName: string, leaveType: string, amount: string) {
    await this.employeeNameInput.fill(employeeName);
    await this.leaveTypeOption(employeeName).click();

    await this.leaveTypeDropdown.click();
    await this.leaveTypeOption(leaveType).click();

    await this.amountInput.fill(amount);
    await this.saveButton.click();
    await this.confirmButton.click();
  }

 async assignLeave(
  employeeName: string,
  leaveType: string,
  startDate: string,
  endDate: string
) {
  await this.employeeNameInput.fill(employeeName);
  await this.leaveTypeOption(employeeName).click();

  await this.leaveTypeSelect.click();
  await this.leaveTypeOption(leaveType).click();
  await this.startDatePicker.clear();
  await this.startDatePicker.fill(startDate);
  await this.endDatePicker.clear();
  await this.endDatePicker.fill(endDate);

  await this.assignButton.click();
}
}
