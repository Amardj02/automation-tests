import { test, expect } from '../fixtures/POMFixtures';
import path from 'path';

let createdEmployee: { firstName: string; lastName: string; employeeId: string };

test.beforeEach(async ({ dashboardPage, pimPage, employee }) => {
  const imagePath = path.resolve(__dirname, '../assets/avatar.jpg');
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployee(employee, imagePath);
  createdEmployee = employee;
});


test('Edit employee personal details', async ({ pimPage, dashboardPage }) => {
  
  await dashboardPage.navigateToPIM();
  await pimPage.searchEmployee(
    `${createdEmployee.firstName} ${createdEmployee.lastName}`,
    createdEmployee.employeeId
  );
 await pimPage.openEmployeeDetails(createdEmployee.employeeId);
 await pimPage.editPersonalDetails('Alexander','Bosnian','Single');
 await pimPage.navigateToQualificationsTab();
 await pimPage.addWorkExperience('Tech Solutions','Software Engineer');
 await pimPage.addEducation("Master's Degree");
});