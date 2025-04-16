import { expect, Page } from '@playwright/test';
import { RegisterPO } from '../po/RegisterPO';

export class RegisterBO {
  private readonly po: RegisterPO;

  constructor(page: Page) {
    this.po = new RegisterPO(page);
  }

  async registerUser(name: string, email: string, password: string) {
    await this.po.getPage().goto('/register');
    await this.po.fillUsername(name);
    await this.po.fillEmail(email);
    await this.po.fillPassword(password);
    await this.po.submit();
  }

  async assertSuccessfulRegistration(expectedUrl: string) {
    await expect(this.po['page']).toHaveURL(expectedUrl);
  }
}
