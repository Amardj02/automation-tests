import { Page } from '@playwright/test';

export async function getSessionCookie(page: Page): Promise<string> {
 await page.waitForTimeout(10000);

  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(c => c.name === 'orangehrm')?.value;

  if (!sessionCookie) throw new Error('Session cookie not found');
  console.log('Extracted session cookie:', sessionCookie);

  return sessionCookie;
}