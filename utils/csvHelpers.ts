import fs from 'fs';

export function parseCsvToEmployees(csvPath: string): EmployeeData[] {
  const content = fs.readFileSync(csvPath, 'utf-8');

  const [header, ...rows] = content.trim().split('\n');
  const keys = header.split(',');

  return rows.map(row => {
    const values = row.split(',');
    const obj = Object.fromEntries(values.map((v, i) => [keys[i], v]));
    return {
      firstName: obj.firstName,
      lastName: obj.lastName,
      employeeId: obj.employeeId,
      username: obj.username,
      password: obj.password
    } as EmployeeData;
  });
}

export interface EmployeeData {
  firstName: string;
  lastName: string;
  employeeId: string;
  username: string;
  password: string;
}