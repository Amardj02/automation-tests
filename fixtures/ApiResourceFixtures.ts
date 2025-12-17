import { test as base } from '@playwright/test';
import { EmployeesResource } from '../resources/api/v2/pim/employees/EmployeesResource';
import { UserResource } from '../resources/api/v2/admin/users/UserResource';
import { PostsResource } from '../resources/api/v2/buzz/posts/PostsResource';
import { FeedResource } from '../resources/api/v2/buzz/feed/FeedResource';
import { SharesResource } from '../resources/api/v2/buzz/shares/SharesResource';
import { getAdminSessionCookie } from '../utils/authHelper';

type ApiResources = {
  employeesResource: EmployeesResource;
  userResource: UserResource;
  postsResource: PostsResource;
  feedResource: FeedResource;
  sharesResource: SharesResource;
};

export const test = base.extend<ApiResources>({
  employeesResource: async ({ playwright }, use) => {
    const cookie = await getAdminSessionCookie();
    const apiContext = await playwright.request.newContext();
    await use(new EmployeesResource(apiContext, cookie));
  },
  userResource: async ({ playwright }, use) => {
    const cookie = await getAdminSessionCookie();
    const apiContext = await playwright.request.newContext();
    await use(new UserResource(apiContext, cookie));
  },
  postsResource: async ({ playwright }, use) => {
    const cookie = await getAdminSessionCookie();
    const apiContext = await playwright.request.newContext();
    await use(new PostsResource(apiContext, cookie));
  },
  feedResource: async ({ playwright }, use) => {
    const cookie = await getAdminSessionCookie();
    const apiContext = await playwright.request.newContext();
    await use(new FeedResource(apiContext, cookie));
  },
  sharesResource: async ({ playwright }, use) => {
    const cookie = await getAdminSessionCookie();
    const apiContext = await playwright.request.newContext();
    await use(new SharesResource(apiContext, cookie));
  },
});

export { expect } from '@playwright/test';