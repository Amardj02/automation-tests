import { test, expect } from '../../fixtures/POMFixtures';
import path from 'path';
import fs from 'fs';
import {ensureFolderExists, writeCsvFile, generateCsvRows, getRandomUserCount, deleteFileIfExists} from '../../utils/csvGenerator';
import {parseCsvToEmployees} from '../../utils/csvHelpers'

const tempDataFolder = path.resolve(__dirname, '../../assets/.temp-data');
const csvFilePath = path.join(tempDataFolder, 'userEnrollment.csv');
const password = 'Password123'; 

test.describe('Bulk User Enrollment', () => {


  test.beforeAll(async () => {
    ensureFolderExists(tempDataFolder);
    deleteFileIfExists(csvFilePath);
    const userCount = getRandomUserCount();
    const rows = generateCsvRows(userCount, password);
    writeCsvFile(csvFilePath, rows);
  });

  test('Enrolling multiple users in OrangeHRM', async ({ dashboardPage, pimPage }) => {
  const employees = parseCsvToEmployees(csvFilePath);

  await dashboardPage.navigateToPIM();

  await pimPage.addNewEmployees(employees);

  test.info().attach('userEnrollment.csv', {
    body: fs.readFileSync(csvFilePath),
    contentType: 'text/csv',
  });
  });


});
