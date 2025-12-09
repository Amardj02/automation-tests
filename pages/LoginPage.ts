import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  private async openApplication() {
    await this.page.goto('auth/login');
  }

  public async login(username: string, password: string) {
    await this.openApplication();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
