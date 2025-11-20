import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import { generateEmployeeData } from '../utils/randomData';

type MyFixtures = {
  employee: { firstName: string; lastName: string; employeeId: string };
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PIMPage;
};

export const test = base.extend<MyFixtures>({
  employee: async ({}, use) => {
    const employeeData = generateEmployeeData();
    await use(employeeData);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.openApplication();
    await loginPage.login('Admin', 'admin123');
    await use(loginPage);
  },

  dashboardPage: async ({ loginPage }, use) => {
    const dashboardPage = new DashboardPage(loginPage.page);
    await use(dashboardPage);
  },

  pimPage: async ({ loginPage }, use) => {
    const pimPage = new PIMPage(loginPage.page);
    await use(pimPage);
  },
});

export { expect } from '@playwright/test';
