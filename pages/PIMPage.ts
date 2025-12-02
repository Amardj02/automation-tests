import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { th } from '@faker-js/faker/.';

export class PIMPage  extends BasePage{
  readonly page: Page;
  readonly addButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly submitButton: Locator;
  readonly profilePicInput : Locator;
  readonly employeeFullNameInput: Locator;
  readonly searchButton: Locator;
  readonly middleNameInput: Locator;
  readonly genderRadioGroup: Locator;
  readonly maritalStatusDropdown: Locator;
  readonly nationalityDropdown: Locator;
  readonly personalDetailsSaveButton: Locator;
  readonly QualifcationsTab: Locator;
  readonly addWorkExperienceButton: Locator;
  readonly companyInput: Locator;
  readonly jobTitleInput: Locator;
  readonly addEducationButton: Locator;
  readonly educationLevelDropdown: Locator;
  readonly saveButton: Locator;
  employeeRow: (employeeId: string) => Locator;
  editButton: (employeeId: string) => Locator;
 
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
    this.employeeFullNameInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.searchButton = page.locator('button[type="submit"].oxd-button--secondary');
    this.employeeRow = (employeeId: string) =>
      this.page.locator('.oxd-table-row--clickable', { hasText: employeeId });
    this.editButton = (employeeId: string) =>
      this.employeeRow(employeeId).locator('button:has(i.bi-pencil-fill)');
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' })
    this.genderRadioGroup = this.page.locator('input[type="radio"]'); 
    this.maritalStatusDropdown = page.locator('div.oxd-select-text-input').nth(1);
    this.nationalityDropdown = page.locator('div.oxd-select-text-input').first();
    this.personalDetailsSaveButton = page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button');
    this.QualifcationsTab = page.getByRole('link', { name: 'Qualifications' });
    this.addWorkExperienceButton = page.locator('button.oxd-button--text', { hasText: 'Add' }).first();
    this.companyInput = page.getByRole('textbox').nth(1);
    this.jobTitleInput = page.getByRole('textbox').nth(2);
    this.addEducationButton = page.locator('button.oxd-button--text', { hasText: 'Add' }).nth(1);
    this.educationLevelDropdown = page.locator('div.oxd-select-text-input');
    this.saveButton = page.getByRole('button', { name: 'Save' }).first();
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
async searchEmployee(fullName: string, employeeId: string) {
    await this.employeeFullNameInput.fill(fullName);
    await this.employeeIdInput.fill(employeeId);
    await this.searchButton.click();

  const row = this.employeeRow(employeeId); 
  await row.waitFor({ state: 'visible', timeout: 5000 }); 
  }
async openEmployeeDetails(employeeId: string) {
    await this.editButton(employeeId).click();
  }
async selectNationality(nationality: string) {
  const option = this.page.locator('div[role="option"]', { hasText: nationality });
  
  await this.nationalityDropdown.click();
  await option.waitFor({ state: 'visible' });
  await option.click();
}
async selectMaritalStatus(maritalStatus: string) {
  const option = this.page.locator('div[role="option"]', { hasText: maritalStatus });

  await this.maritalStatusDropdown.click();
  await option.waitFor({ state: 'visible'});
  await option.click();
}
async editPersonalDetails(middleName: string, nationality: string, maritalStatus: string, gender: '1' | '2') {
  await this.middleNameInput.click();
  await this.middleNameInput.fill(middleName);

  await this.selectNationality(nationality);

  await this.selectMaritalStatus(maritalStatus);

  const genderOption = this.page.locator(`input[type="radio"][value="${gender}"]`);
  await genderOption.waitFor({ state: 'visible' });
  await genderOption.click({ force: true });

  await this.personalDetailsSaveButton.click();
  await this.waitForSuccessToast();
}
async navigateToQualificationsTab() {
  await this.QualifcationsTab.click();

}
async addWorkExperience(company: string, jobTitle: string) {
  await this.addWorkExperienceButton.click();
  await this.companyInput.click();
  await this.companyInput.fill(company);
  await this.jobTitleInput.click();
  await this.jobTitleInput.fill(jobTitle);
  await this.saveButton.click();
  await this.waitForSuccessToast();
}
async addEducation(educationLevel: string) {
  const option = this.page.locator('div[role="option"]', { hasText: educationLevel });

  await this.addEducationButton.click();
  await this.educationLevelDropdown.click();
  await option.waitFor({ state: 'visible'});
  await option.click();
  await this.saveButton.click();
  await this.waitForSuccessToast();

}}
