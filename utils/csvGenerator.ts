import { faker } from '@faker-js/faker';
import fs from 'fs';

export function generateCsvUserData(staticPassword: string) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const employeeId = faker.number.int({ min: 10000, max: 99999 }).toString();
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;

  return {
    firstName,
    lastName,
    employeeId,
    username,
    password: staticPassword,
  };
}

export function ensureFolderExists(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

export function writeCsvFile(filePath: string, rows: string[]) {
  fs.writeFileSync(filePath, rows.join('\n'), 'utf-8');
}

export function generateCsvRows(userCount: number, staticPassword: string) {
  const headers = ['firstName', 'lastName', 'employeeId','username', 'password'];
  const rows: string[] = [headers.join(',')];

  for (let i = 0; i < userCount; i++) {
    const user = generateCsvUserData(staticPassword);
    rows.push([user.firstName, user.lastName, user.employeeId, user.username, user.password].join(','));
  }

  return rows;
}

export function getRandomUserCount(min = 10, max = 30) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function deleteFileIfExists(filePath: string) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}