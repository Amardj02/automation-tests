import { Page, chromium} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function getSessionCookie(page: Page) {
 await page.waitForSelector('h6.oxd-topbar-header-breadcrumb-module:has-text("Dashboard")', { state: 'visible' });

  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(c => c.name === 'orangehrm')?.value;

  if (!sessionCookie) throw new Error('Session cookie not found');


  return sessionCookie;
}

export async function getSessionCookieHeadless(username: string, password: string) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);

  await page.waitForSelector('h6.oxd-topbar-header-breadcrumb-module:has-text("Dashboard")');

  const cookies = await context.cookies();
  const sessionCookie = cookies.find(c => c.name === 'orangehrm')?.value;

  await browser.close();

  if (!sessionCookie) throw new Error('Session cookie not found');
  return sessionCookie;
}
export async function getUserSessionCookie(username: string, password: string): Promise<string> {
  return await getSessionCookieHeadless(username, password);
}

export async function getAdminSessionCookie() {
  return await getSessionCookieHeadless(
    process.env.ADMIN_USERNAME!,
    process.env.ADMIN_PASSWORD!
  );
}