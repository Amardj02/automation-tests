import { test, expect } from '../fixtures/POMFixtures';


test.beforeEach(async ({ dashboardPage, pimPage, employee }) => {
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployee(employee);
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
