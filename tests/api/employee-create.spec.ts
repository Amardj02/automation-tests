import { test, expect } from '../../fixtures/ApiResourceFixtures';
import { faker } from '@faker-js/faker';

  const payload = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 10000, max: 99999 }).toString(),
  };
test('Create employee via API', async ({ employeesResource }) => {

  const response = await employeesResource.createEmployee(payload);
  expect(response.status()).toBe(200);
});