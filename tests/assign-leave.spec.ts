import { test, expect } from '../fixtures/POMFixtures';
import path from 'path';

test.beforeEach(async ({ dashboardPage, pimPage, employee }) => {
  const imagePath = path.resolve('assets','avatar.jpg');
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployee(employee, imagePath);
});

test('Assign leave as Admin', async ({ leavePage, employee, leaveDates}) => {
  const fullName = `${employee.firstName} ${employee.lastName}`;

  await leavePage.navigateToLeaveList();
  await leavePage.navigateToEntitlements();
  await leavePage.addEntitlement(fullName, 'US - Vacation', '30');

  await leavePage.navigateToAssignLeave();
  await leavePage.assignLeave(fullName, 'US - Vacation', leaveDates.startDate, leaveDates.endDate);
  await leavePage.waitForSuccessToast();
});
