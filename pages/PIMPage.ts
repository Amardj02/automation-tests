import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PIMPage  extends BasePage{
  private readonly addButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly employeeIdInput: Locator;
  private readonly submitButton: Locator;
  private readonly profilePicInput : Locator;
  private readonly employeeFullNameInput: Locator;
  private readonly searchButton: Locator;
  private readonly middleNameInput: Locator;
  private readonly genderRadioGroup: Locator;
  private readonly maritalStatusDropdown: Locator;
  private readonly nationalityDropdown: Locator;
  private readonly personalDetailsSaveButton: Locator;
  private readonly QualifcationsTab: Locator;
  private readonly addWorkExperienceButton: Locator;
  private readonly companyInput: Locator;
  private readonly jobTitleInput: Locator;
  private readonly addEducationButton: Locator;
  private readonly educationLevelDropdown: Locator;
  private readonly saveButton: Locator;
  private readonly createLoginDetailsSlider: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly pimMenu: Locator;
  employeeRow: (employeeId: string) => Locator;
  editButton: (employeeId: string) => Locator;
 
  constructor(page: Page) {
    super(page);
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
    this.createLoginDetailsSlider = page.locator('.oxd-switch-input');
    this.usernameInput = page.locator('input.oxd-input.oxd-input--active[autocomplete="off"]').first();
    this.passwordInput = page.locator('input.oxd-input.oxd-input--active[type="password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);
    this.pimMenu = page.locator('a.oxd-main-menu-item[href*="pim/viewPimModule"]');
  }

private async openAddEmployee() {
    await this.addButton.click();
  }

private async fillEmployeeForm(employee: { firstName: string; lastName: string; employeeId: string }) {
    await this.firstNameInput.fill(employee.firstName);
    await this.lastNameInput.fill(employee.lastName);
    await this.employeeIdInput.fill(employee.employeeId);
  }

private async submitForm() {
    await this.submitButton.click();
  }
private async uploadProfilePicture(imagePath: string) {
  console.log(imagePath)
  await this.profilePicInput.setInputFiles(imagePath);
}
public async addNewEmployee(
  employee: { firstName: string; lastName: string; employeeId: string }
) {
  await this.openAddEmployee();
  await this.fillEmployeeForm(employee);

  await this.submitForm();
  await this.waitForSuccessToast();
}

public async addNewEmployeeWithPicture(
  employee: { firstName: string; lastName: string; employeeId: string },
  imagePath: string
) {
  await this.openAddEmployee();
  await this.fillEmployeeForm(employee);
  await this.uploadProfilePicture(imagePath);

  await this.submitForm();
  await this.waitForSuccessToast();
}
public async searchEmployee(fullName: string, employeeId: string) {
    await this.employeeFullNameInput.fill(fullName);
    await this.employeeIdInput.fill(employeeId);
    await this.searchButton.click();

  const row = this.employeeRow(employeeId); 
  await row.waitFor({ state: 'visible', timeout: 5000 }); 
  }
public async openEmployeeDetails(employeeId: string) {
    await this.editButton(employeeId).click();
  }
private async selectNationality(nationality: string) {
  const option = this.page.locator('div[role="option"]', { hasText: nationality });
  
  await this.nationalityDropdown.click();
  await option.waitFor({ state: 'visible' });
  await option.click();
}
private async selectMaritalStatus(maritalStatus: string) {
  const option = this.page.locator('div[role="option"]', { hasText: maritalStatus });

  await this.maritalStatusDropdown.click();
  await option.waitFor({ state: 'visible'});
  await option.click();
}
public async editPersonalDetails(middleName: string, nationality: string, maritalStatus: string, gender: '1' | '2') {
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
public async navigateToQualificationsTab() {
  await this.QualifcationsTab.click();

}
public async addWorkExperience(company: string, jobTitle: string) {
  await this.addWorkExperienceButton.click();
  await this.companyInput.click();
  await this.companyInput.fill(company);
  await this.jobTitleInput.click();
  await this.jobTitleInput.fill(jobTitle);
  await this.saveButton.click();
  await this.waitForSuccessToast();
}
public async addEducation(educationLevel: string) {
  const option = this.page.locator('div[role="option"]', { hasText: educationLevel });

  await this.addEducationButton.click();
  await this.educationLevelDropdown.click();
  await option.waitFor({ state: 'visible'});
  await option.click();
  await this.saveButton.click();
  await this.waitForSuccessToast();

}
public async addNewEmployeeWithLoginCredentials(employee: {
  firstName: string;
  lastName: string;
  employeeId: string;
  username: string;
  password: string;
}) {
  await this.openAddEmployee();
  await this.fillEmployeeForm(employee);
  await this.createLoginDetailsSlider.click();
  await this.usernameInput.fill(employee.username);
  await this.passwordInput.fill(employee.password);
  await this.confirmPasswordInput.click();
  await this.confirmPasswordInput.fill(employee.password);
  await this.submitForm();
  await this.waitForSuccessToast();
}
public async addNewEmployees(employees: Array<{
  firstName: string;
  lastName: string;
  employeeId: string;
  username: string;
  password: string;
}>) {
  for (const employee of employees) {
    await this.addNewEmployeeWithLoginCredentials(employee);
    await this.verifyPersonalDetailsPage();
    await this.navigateToPIM();
  }
}

private async navigateToPIM() {
  await this.pimMenu.click();
}

public async verifyPersonalDetailsPage(){
  await expect(this.page).toHaveURL(/pim\/viewPersonalDetails/);
  await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
}
}