import { faker } from '@faker-js/faker';
import { test, expect } from '../../fixtures/POMFixtures';
import {getAdminSessionCookie, getUserSessionCookie} from '../../utils/authHelper';

  const employeePayload = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 10000, max: 99999 }).toString(),
  };

  let buzzMessage: string;
  const timestamp = Date.now(); 
  buzzMessage = `Automated Buzz message ${faker.lorem.sentence()} - ${timestamp}`;
  const buzzPayload = {
  type: 'text',
  text: buzzMessage
  };

test('[API] Verify Buzz Message Visibility and Interaction', async ({ request,  playwright }) => {
  const adminCookie = await getAdminSessionCookie();

  const adminApi = await playwright.request.newContext({
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      Cookie: `orangehrm=${adminCookie}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const buzzResponse = await adminApi.post('api/v2/buzz/posts', { data: buzzPayload });
  expect(buzzResponse.status()).toBe(200);
  const buzzResponseBody = await buzzResponse.json();
  console.log('Buzz post Response:', buzzResponseBody);


  const empResponse = await adminApi.post('api/v2/pim/employees', { data: employeePayload });
  expect(empResponse.status()).toBe(200);
  const empData = await empResponse.json();
  const empNumber = empData.data?.empNumber;
  console.log("Employee data:", empData)

  const userCredentialsPayload = {
    username: faker.internet.username(),
    password : 'password123',
    status : true,
    userRoleId: 2,
    empNumber
  }

  const userWithCredentailsResponse = await adminApi.post('api/v2/admin/users', { data: userCredentialsPayload });
  expect(userWithCredentailsResponse.status()).toBe(200);
  const userData = await userWithCredentailsResponse.json();
  console.log('Created User with Login Credentials:', userData);

  const userCookie = await getUserSessionCookie(userCredentialsPayload.username, userCredentialsPayload.password);

  const userApi = await playwright.request.newContext({
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      Cookie: `orangehrm=${userCookie}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  
const buzzFeedResponse = await userApi.get('api/v2/buzz/feed');
expect(buzzFeedResponse.status()).toBe(200);
const buzzFeedResponseBody = await buzzFeedResponse.json();

const matchingPosts = buzzFeedResponseBody.data.filter((post: any) => post.text === buzzMessage);

console.log('Matching posts:', matchingPosts);
expect(matchingPosts.length).toBeGreaterThan(0);

const shareId = matchingPosts[0].id;
expect(shareId).toBeTruthy();

const likeResponse = await userApi.post(
  `api/v2/buzz/shares/${shareId}/likes`
);
const likeResponseBody = await likeResponse.json();
console.log('Like Response:', likeResponseBody);
expect(likeResponse.status()).toBe(200);

const adminFeedResponse = await adminApi.get('api/v2/buzz/feed');
expect(adminFeedResponse.status()).toBe(200);

const adminFeedBody = await adminFeedResponse.json();

const likedPost = adminFeedBody.data.find(
  (post: any) => post.id === shareId
);
console.log('Liked Post Details:', likedPost);
expect(likedPost).toBeTruthy();
expect(likedPost.stats.numOfLikes).toBeGreaterThan(0);
});