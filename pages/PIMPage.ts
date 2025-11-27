import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PIMPage  extends BasePage{
  readonly page: Page;
  readonly addButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly submitButton: Locator;
  readonly profilePicInput : Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.addButton = page.locator('button:has(.bi-plus)');
    this.firstNameInput = page.locator('input.orangehrm-firstname[name="firstName"]');
    this.lastNameInput = page.locator('input.orangehrm-lastname[name="lastName"]');
    this.employeeIdInput = page.locator(
      'div.oxd-input-group:has(label:has-text("Employee Id")) input'
    );
    this.submitButton = page.locator('button[type="submit"]');
    this.profilePicInput = page.locator('input.oxd-file-input');
  }

  async openAddEmployee() {
    await this.addButton.click();
  }

  async fillEmployeeForm(employee: { firstName: string; lastName: string; employeeId: string }) {
    await this.firstNameInput.fill(employee.firstName);
    await this.lastNameInput.fill(employee.lastName);
    await this.employeeIdInput.fill(employee.employeeId);
  }

  async submitForm() {
    await this.submitButton.click();
  }
  async uploadProfilePicture(imagePath: string) {
  await this.profilePicInput.setInputFiles(imagePath);
}

async addNewEmployee(
  employee: { firstName: string; lastName: string; employeeId: string },
  imagePath: string
) {
  await this.openAddEmployee();
  await this.fillEmployeeForm(employee);
  await this.uploadProfilePicture(imagePath);

  await this.submitForm();
  await this.waitForSuccessToast();
}
}
