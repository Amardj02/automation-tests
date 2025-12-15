import { test, expect } from '../fixtures/POMFixtures';
import path from 'path';
import { generateEmployeeData } from '../utils/randomData';
import { generateLeaveDates } from '../utils/dateHelpers';

const employee = generateEmployeeData();
const leaveDates = generateLeaveDates();

test.beforeEach(async ({ dashboardPage, pimPage}) => {

  const imagePath = path.resolve('assets','avatar.jpg');
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployeeWithPicture(employee, imagePath);
});

test('Assign leave as Admin', async ({ leavePage}) => {
  test.describe.configure({ timeout: 120000 }); 
  
  const fullName = `${employee.firstName} ${employee.lastName}`;

  await leavePage.navigateToLeaveList();
  await leavePage.navigateToEntitlements();
  await leavePage.addEntitlement(fullName, 'US - Vacation', '30');

  await leavePage.navigateToAssignLeave();
  await leavePage.assignLeave(fullName, 'US - Vacation', leaveDates.startDate, leaveDates.endDate);
});
