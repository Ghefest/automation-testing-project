import { Locator, expect, Page } from '@playwright/test';

export class ElementWrapper {
  constructor(public locator: Locator, private page: Page) {}

  async click() {
    console.log('🖱 Clicking element...');
    await this.locator.scrollIntoViewIfNeeded();
    await this.locator.click();
  }

  async setText(value: string) {
    console.log(`📝 Setting text: ${value}`);
    await this.locator.fill(value);
  }

  async getText(): Promise<string> {
    const text = await this.locator.textContent();
    console.log(`📤 Retrieved text: ${text}`);
    return text ?? '';
  }
}
