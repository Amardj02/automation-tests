import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import { LeavePage } from '../pages/LeavePage';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PIMPage;
  leavePage: LeavePage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
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
  leavePage: async ({ loginPage }, use) => {
    const leavePage = new LeavePage(loginPage.page);
    await use(leavePage);
  },
});

export { expect } from '@playwright/test';
