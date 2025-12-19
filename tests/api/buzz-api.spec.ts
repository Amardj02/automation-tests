import { test, expect } from '../../fixtures/ApiResourceFixtures';
import { faker } from '@faker-js/faker';
import { getUserSessionCookie, getAdminSessionCookie } from '../../utils/authHelper';

  const empPayload = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 10000, max: 99999 }).toString(),
  };
  let buzzMessage = `Automated Buzz message ${faker.lorem.sentence()} - ${Date.now()}`;

 test('Buzz flow: post, feed, like', async ({employeesResource, userResource, postsResource, feedResource, sharesResource,}) => {

  await postsResource.createPost({ type: 'text', text: buzzMessage });

  const empResp = await employeesResource.createEmployee(empPayload);
  const empNumber = (await empResp.json()).data?.empNumber;

  const userPayload = {
    username: faker.internet.username(),
    password: 'password123',
    status: true,
    userRoleId: 2,
    empNumber,
  };
  await userResource.createUser(userPayload);

  const userCookie = await getUserSessionCookie(userPayload.username, userPayload.password);
  
  const feedResp = await feedResource.getFeed(userCookie);
  const feedData = await feedResp.json();
  const shareId = feedData.data.find((p: any) => p.text === buzzMessage).id;
  await sharesResource.likePost(shareId, userCookie);


  const adminFeedResp = await feedResource.getFeed();
  const likedPost = (await adminFeedResp.json()).data.find((p: any) => p.id === shareId);
  expect(likedPost.stats.numOfLikes).toBeGreaterThan(0);

  console.log('Post:',likedPost);
});

