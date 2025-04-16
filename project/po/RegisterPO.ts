import { expect, Locator, Page } from '@playwright/test';

export class RegisterPO {
  private page: Page;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#firstname');
    this.lastNameInput = page.locator('#lastname');
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#register');
  }

  getPage(): Page {
    return this.page;
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async assertSuccessVisible() {
    await expect(this.page.locator('.success-message')).toBeVisible();
  }
}
