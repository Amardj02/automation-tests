import { test, expect } from '../../fixtures/POMFixtures';
import path from 'path';
import { generateRandomPersonalDetails, generateWorkExperience, generateEducationLevel } from '../../utils/randomPersonalDetails';
import { generateEmployeeData } from '../../utils/randomData';

let createdEmployee: { firstName: string; lastName: string; employeeId: string };
const personalDetails = generateRandomPersonalDetails();
const workExperience = generateWorkExperience();
const educationLevel = generateEducationLevel();
const employee = generateEmployeeData();

test.beforeEach(async ({ dashboardPage, pimPage}) => {
  const imagePath = path.resolve('assets','avatar.jpg');
  await dashboardPage.navigateToPIM();
  await pimPage.addNewEmployeeWithPicture(employee, imagePath);
  createdEmployee = employee;
});


test('Edit employee personal details', async ({ pimPage, dashboardPage}) => {
  
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