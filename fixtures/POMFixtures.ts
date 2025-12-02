import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import { generateEmployeeData } from '../utils/randomData';
import { LeavePage } from '../pages/LeavePage';
import {generateLeaveDates} from "../utils/dateHelpers"
import {generateRandomPersonalDetails, generateWorkExperience, generateEducationLevel} from "../utils/randomPersonalDetails"


const ADMIN_USERNAME = process.env.ADMIN_USERNAME as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;

type MyFixtures = {
  employee: { firstName: string; lastName: string; employeeId: string };
  leaveDates: {startDate: string; endDate: string};
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PIMPage;
  leavePage: LeavePage;
  personalDetails:{
    middleName: string;
    gender: '1' | '2';
    maritalStatus: string;
    nationality: string;
  }
  workExperience:{
    company: string;
    jobTitle: string;
  }
  educationLevel:{ educationLevel: string };
};

export const test = base.extend<MyFixtures>({
  employee: async ({}, use) => {
    const employeeData = generateEmployeeData();
    await use(employeeData);
  },
  leaveDates: async ({}, use) => {
    const leaveDates = generateLeaveDates();
    await use(leaveDates);
  },
  personalDetails: async ({}, use) => {
    const personalDetails = generateRandomPersonalDetails();
    await use(personalDetails);
  },
  workExperience: async ({}, use) => {
    const workExperience = generateWorkExperience();
    await use(workExperience);
  },
  educationLevel: async ({}, use) => {
    const educationLevel = generateEducationLevel();
    await use(educationLevel);
  },
  

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.openApplication();
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
