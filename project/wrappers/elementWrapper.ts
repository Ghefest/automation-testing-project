import { Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

export class ElementWrapper {
  constructor(private locator: Locator, private name: string) {}

  async click() {
    await allure.step(`Click on "${this.name}"`, async () => {
      await this.locator.click();
    });
  }

  async fill(value: string) {
    await allure.step(`Fill "${this.name}" with "${value}"`, async () => {
      await this.locator.fill(value);
    });
  }

  async isVisible(): Promise<boolean> {
    return this.locator.isVisible();
  }

  async screenshotAttachment() {
    const shot = await this.locator.screenshot();
    allure.attachment(`${this.name} Screenshot`, shot, 'image/png');
  }
}
