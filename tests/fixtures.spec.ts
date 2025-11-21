import { test, expect } from '../fixtures/POMFixtures';


test('Create New Employee', async ({dashboardPage, pimPage, employee }) => {
  const successToast = pimPage.page.locator('.oxd-toast--success');
  
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployee(employee);

  await expect(successToast).toBeVisible();
  await expect(successToast).toContainText('Success');
  await expect(pimPage.page).toHaveURL(/pim\/viewPersonalDetails/);
  await expect(pimPage.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
});