// /project/ui/po/RegisterPage.ts
import { expect, Locator, Page } from '@playwright/test';

export class RegisterPO {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private emailInput: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.emailInput = page.locator('#email');
    this.submitButton = page.locator('#submit');
  }

  getPage(): Page {
    return this.page;
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async submit() {
    await this.submitButton.click();
  }

  async assertSuccessVisible() {
    await expect(this.page.locator('.success-message')).toBeVisible();
  }
}
