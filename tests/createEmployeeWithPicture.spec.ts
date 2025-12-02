import path from 'path';
import { test, expect } from '../fixtures/POMFixtures';


test('Create New Employee with profile picture', async ({ dashboardPage, pimPage, employee }) => {
  const imagePath = path.resolve('assets','avatar.jpg');
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployee(employee, imagePath);

  await pimPage.waitForSuccessToast();
  await expect(pimPage.page).toHaveURL(/pim\/viewPersonalDetails/);
  await expect(pimPage.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
});

