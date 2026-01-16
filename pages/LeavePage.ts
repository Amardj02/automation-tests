import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LeavePage extends BasePage {

  private readonly leaveListLink: Locator;
  private readonly entitlementsParent: Locator;
  private readonly entitlementsTab: Locator;
  private readonly employeeNameInput: Locator;
  private readonly leaveTypeDropdown: Locator;
  private readonly amountInput: Locator;
  private readonly saveButton: Locator;
  private readonly confirmButton: Locator;
  private readonly assignLeaveLink: Locator;
  private readonly leaveTypeSelect: Locator;
  private readonly startDatePicker: Locator;
  private readonly endDatePicker: Locator;
  private readonly assignButton: Locator;

  constructor(page: Page) {
    super(page);

    this.leaveListLink = page.locator('a.oxd-main-menu-item[href="/web/index.php/leave/viewLeaveModule"]');
    this.entitlementsParent = page.locator('li.--parent:has(span > i.oxd-icon)').first();
    this.entitlementsTab = page.locator('a.oxd-topbar-body-nav-tab-link').first();
    this.employeeNameInput = page.locator('.oxd-autocomplete-text-input input');
    this.leaveTypeDropdown = page.locator('.oxd-select-text--arrow').first();
    this.amountInput = page.getByRole('textbox').nth(2);
    this.saveButton = page.locator('button[type="submit"]');
    this.confirmButton = page.locator('button.oxd-button--secondary.orangehrm-button-margin[type="button"]');
    this.assignLeaveLink = page.locator('li.oxd-topbar-body-nav-tab a.oxd-topbar-body-nav-tab-item').nth(3);
    this.leaveTypeSelect = page.locator('.oxd-select-wrapper .oxd-select-text-input');
    this.startDatePicker = page.locator('.oxd-date-input input').first();
    this.endDatePicker = page.locator('.oxd-date-input input').nth(1);
    this.assignButton = page.locator('button.oxd-button--secondary.orangehrm-left-space[type="submit"]');
  }

  private leaveTypeOption(name: string): Locator {
    return this.page.getByRole('option', { name });
  }

  private async selectEmployee(name: string) {
    await this.employeeNameInput.fill(name);
    await this.leaveTypeOption(name).click();
  }

  public async navigateToLeaveList() {
    await this.leaveListLink.click();
  }

  public async navigateToEntitlements() {
    await this.entitlementsParent.click();
    await this.entitlementsTab.click();
  }

  public async navigateToAssignLeave() {
    await this.assignLeaveLink.click();
  }

  public async addEntitlement(employeeName: string, leaveType: string, amount: string) {
    await this.selectEmployee(employeeName);

    await this.leaveTypeDropdown.click();
    await this.leaveTypeOption(leaveType).click();

    await this.amountInput.fill(amount);
    await this.saveButton.click();
    await this.confirmButton.click();
  }

  public async assignLeave(
    employeeName: string,
    leaveType: string,
    startDate: string,
    endDate: string
  ) {
    await this.selectEmployee(employeeName);

    await this.leaveTypeSelect.click();
    await this.leaveTypeOption(leaveType).click();

    await this.startDatePicker.clear();
    await this.startDatePicker.fill(startDate);

    await this.endDatePicker.clear();
    await this.endDatePicker.fill(endDate);

    await this.assignButton.click();
    await this.waitForSuccessToast();
  }
}
