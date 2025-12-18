import { test as base } from '@playwright/test';
import { EmployeesResource } from '../resources/api/v2/pim/employees/EmployeesResource';
import { UserResource } from '../resources/api/v2/admin/users/UserResource';
import { PostsResource } from '../resources/api/v2/buzz/posts/PostsResource';
import { FeedResource } from '../resources/api/v2/buzz/feed/FeedResource';
import { SharesResource } from '../resources/api/v2/buzz/shares/SharesResource';
import { getAdminSessionCookie } from '../utils/authHelper';
import { APIRequestContext } from '@playwright/test';

type ApiResources = {
  apiContext: APIRequestContext;
  adminCookie: string;
  employeesResource: EmployeesResource;
  userResource: UserResource;
  postsResource: PostsResource;
  feedResource: FeedResource;
  sharesResource: SharesResource;
};

export const test = base.extend<ApiResources>({
  apiContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext();
    await use(context);
    await context.dispose();
  },
  
  adminCookie: async ({}, use) => {
    const cookie = await getAdminSessionCookie();
    await use(cookie);
  },

  employeesResource: async ({ apiContext, adminCookie }, use) => {
    await use(new EmployeesResource(apiContext, adminCookie));
  },

  userResource: async ({ apiContext, adminCookie }, use) => {
    await use(new UserResource(apiContext, adminCookie));
  },

  postsResource: async ({ apiContext, adminCookie }, use) => {
    await use(new PostsResource(apiContext, adminCookie));
  },

  feedResource: async ({ apiContext, adminCookie }, use) => {
    await use(new FeedResource(apiContext, adminCookie));
  },

  sharesResource: async ({ apiContext, adminCookie }, use) => {
    await use(new SharesResource(apiContext, adminCookie));
  },
});

export { expect } from '@playwright/test';