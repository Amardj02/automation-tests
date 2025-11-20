import { test, expect } from '@playwright/test';
import { generateEmployeeData } from '../utils/randomData';
import {LoginPage} from "../pages/LoginPage";
import {DashboardPage} from "../pages/DashboardPage";
import {PIMPage} from "../pages/PIMPage"


test('Create New Employee', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const pimPage = new PIMPage(page);
  const successToast = page.locator('.oxd-toast--success');
  const employee = generateEmployeeData();

  await loginPage.openApplication();
  await loginPage.login('Admin', 'admin123');
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployee(employee);



  await expect(successToast).toBeVisible();
  await expect(successToast).toContainText('Success');
  await expect(page).toHaveURL(/pim\/viewPersonalDetails/);
  await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
});