import { Page, Locator } from '@playwright/test';

export class PIMPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator('button:has(.bi-plus)');
    this.firstNameInput = page.locator('input.orangehrm-firstname[name="firstName"]');
    this.lastNameInput = page.locator('input.orangehrm-lastname[name="lastName"]');
    this.employeeIdInput = page.locator(
      'div.oxd-input-group:has(label:has-text("Employee Id")) input'
    );
    this.submitButton = page.locator('button[type="submit"]');
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

  async addNewEmployee(employee: { firstName: string; lastName: string; employeeId: string }) {
    await this.openAddEmployee();
    await this.fillEmployeeForm(employee);
    await this.submitForm();
}
}
