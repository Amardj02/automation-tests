import { faker } from '@faker-js/faker';
import { test, expect } from '../../fixtures/POMFixtures';

test('POST /api/v2/pim/employees - create employee (hard-coded cookie)', async ({ request, playwright }) => {
  const payload = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 10000, max: 99999 }).toString(),
  };
  const apiContext = await playwright.request.newContext({
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      Cookie: `orangehrm=8tm5g0gpbqisrbbnu1p6v2r50o`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const response = await apiContext.post('api/v2/pim/employees', {
    data: payload,
  });


  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log('API Response:', responseBody);
});

test('POST /api/v2/pim/employees - create employee (dynamically extracted cookie)', async ({ loginPage, playwright }) => {
  await loginPage.page.waitForTimeout(2000);
  const cookies = await loginPage.page.context().cookies();
  const sessionCookie = cookies.find(c => c.name === 'orangehrm')?.value;
  expect(sessionCookie).toBeTruthy();

  const apiContext = await playwright.request.newContext({
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      Cookie: `orangehrm=${sessionCookie}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const payload = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 10000, max: 99999 }).toString(),
  };

  const response = await apiContext.post('api/v2/pim/employees', {
    data: payload,
  });

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log('API Response:', responseBody);
});