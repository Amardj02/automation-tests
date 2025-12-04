import path from 'path';
import { test, expect } from '../fixtures/POMFixtures';
import { w } from '@faker-js/faker/dist/airline-DF6RqYmq';


test('Create New Employee with profile picture', async ({ dashboardPage, pimPage, employee }) => {
  const imagePath = path.resolve('assets','avatar.jpg');
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployeeWithPicture(employee, imagePath);
  await expect(pimPage.page).toHaveURL(/pim\/viewPersonalDetails/);
  await expect(pimPage.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
});

