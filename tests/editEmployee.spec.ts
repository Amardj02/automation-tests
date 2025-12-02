import { test, expect } from '../fixtures/POMFixtures';
import path from 'path';

let createdEmployee: { firstName: string; lastName: string; employeeId: string };

test.beforeEach(async ({ dashboardPage, pimPage, employee }) => {
  const imagePath = path.resolve(__dirname, '../assets/avatar.jpg');
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployee(employee, imagePath);
  createdEmployee = employee;
});


test('Edit employee personal details', async ({ pimPage, dashboardPage, personalDetails, workExperience,educationLevel}) => {
  
  await dashboardPage.navigateToPIM();
  await pimPage.searchEmployee(
    `${createdEmployee.firstName} ${createdEmployee.lastName}`,
    createdEmployee.employeeId
  );
  await pimPage.openEmployeeDetails(createdEmployee.employeeId);
  await pimPage.editPersonalDetails(
    personalDetails.middleName,
    personalDetails.nationality,
    personalDetails.maritalStatus,
    personalDetails.gender
  );
 await pimPage.navigateToQualificationsTab();
 await pimPage.addWorkExperience(workExperience.company, workExperience.jobTitle);
 await pimPage.addEducation(educationLevel.educationLevel);
});