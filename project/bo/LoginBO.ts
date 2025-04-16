import { Page } from '@playwright/test';
import { LoginPO } from '../po/LoginPO';

export class LoginBO {
  private readonly po: LoginPO;

  constructor(page: Page) {
    this.po = new LoginPO(page);
  }

  async login(username: string, password: string, expectedUrl: string) {
    await this.po.goto();
    await this.po.fillUsername(username);
    await this.po.fillPassword(password);
    await this.po.submit();
    await this.po.expectUrlToBe(expectedUrl);
  }
}
