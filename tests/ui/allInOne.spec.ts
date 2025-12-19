import { test, expect } from '@playwright/test';
import { generateEmployeeData } from '../../utils/randomData';

test('Create New Employee', async ({ page }) => {
  const employee = generateEmployeeData();

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();
  await page.locator('a.oxd-main-menu-item[href*="pim/viewPimModule"]').click();
  const addButton = page.locator('button:has(.bi-plus)');
  await addButton.click();
  await page.locator('input.orangehrm-firstname[name="firstName"]').fill(employee.firstName);
  await page.locator('input.orangehrm-lastname[name="lastName"]').fill(employee.lastName);
  await page.locator('div.oxd-input-group:has(label:has-text("Employee Id")) input').fill(employee.employeeId);
  await page.locator('button[type="submit"]').click();


  const successToast = page.locator('.oxd-toast--success');
  await expect(successToast).toBeVisible();
  await expect(successToast).toContainText('Success');

  await expect(page).toHaveURL(/pim\/viewPersonalDetails/);

  await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
});