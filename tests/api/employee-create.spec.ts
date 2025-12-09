import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('POST /api/v2/pim/employees - create employee (hard-coded cookie)', async ({ request }) => {
  const payload = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 10000, max: 99999 }).toString(),
  };
  const response = await request.post('api/v2/pim/employees', {
    headers: {
      Cookie: 'orangehrm=pijaasm1d381lfis21i9934794',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: payload,
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log('API Response:', responseBody);
});
