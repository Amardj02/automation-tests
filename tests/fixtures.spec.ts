import { test, expect } from '../fixtures/POMFixtures';


test('Create New Employee', async ({ dashboardPage, pimPage, employee }) => {

  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployee(employee);

  await pimPage.waitForSuccessToast();
  await expect(pimPage.page).toHaveURL(/pim\/viewPersonalDetails/);
  await expect(pimPage.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
});

