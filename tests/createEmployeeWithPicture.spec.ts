import path from 'path';
import { test, expect } from '../fixtures/POMFixtures';
import { generateEmployeeData } from '../utils/randomData';

const employee = generateEmployeeData();

test('Create New Employee with profile picture', async ({ dashboardPage, pimPage}) => {
  const imagePath = path.resolve('assets','avatar.jpg');
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployeeWithPicture(employee, imagePath);
  await pimPage.verifyPersonalDetailsPage();
});

