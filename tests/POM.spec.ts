import { test, expect } from '@playwright/test';
import { generateEmployeeData } from '../utils/randomData';
import {LoginPage} from "../pages/LoginPage";
import {DashboardPage} from "../pages/DashboardPage";
import {PIMPage} from "../pages/PIMPage"
import path from 'path';


test('Create New Employee', async ({ page }) => {
  const imagePath = path.resolve('assets','avatar.jpg');
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const pimPage = new PIMPage(page);
  const successToast = page.locator('.oxd-toast--success');
  const employee = generateEmployeeData();

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployeeWithPicture(employee,imagePath);



  await expect(successToast).toBeVisible();
  await expect(successToast).toContainText('Success');
  await expect(page).toHaveURL(/pim\/viewPersonalDetails/);
  await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
});