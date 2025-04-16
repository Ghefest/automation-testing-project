import { expect, Page } from '@playwright/test';
import { RegisterPO } from '../po/RegisterPO';

export class RegisterBO {
  private readonly po: RegisterPO;

  constructor(page: Page) {
    this.po = new RegisterPO(page);
  }

  async registerUser(firstName: string, lastName: string, username: string, password: string) {
    await this.po.getPage().goto('/register');

    await this.po.fillFirstName(firstName);
    await this.po.fillLastName(lastName);
    await this.po.fillUsername(username);
    await this.po.fillPassword(password);

    const page = this.po.getPage();
    const recaptchaFrame = page.frameLocator('iframe[title="reCAPTCHA"]');
    await recaptchaFrame.locator('#recaptcha-anchor').click();

    await page.waitForTimeout(2000);

    await this.po.submit();
  }

  async assertSuccessfulRegistration(expectedUrl: string) {
    await expect(this.po.getPage()).toHaveURL(expectedUrl);
  }
}
