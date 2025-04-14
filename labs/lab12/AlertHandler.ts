import { Page, expect } from '@playwright/test';

export class AlertHandler {
  constructor(private page: Page) {}

  async acceptAlert() {
    this.page.once('dialog', async (dialog) => {
      console.log(`⚠️ Alert Text: ${dialog.message()}`);
      await dialog.accept();
    });
  }
}
