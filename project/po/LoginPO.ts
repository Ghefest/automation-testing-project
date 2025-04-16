import { Page } from '@playwright/test';

export class LoginPO {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/login');
  }

  async fillUsername(username: string) {
    await this.page.locator('#userName').fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator('#password').fill(password);
  }

  async submit() {
    await this.page.locator('#login').click();
  }

  async expectUrlToBe(expectedUrl: string) {
    await this.page.waitForURL(expectedUrl);
  }
}
