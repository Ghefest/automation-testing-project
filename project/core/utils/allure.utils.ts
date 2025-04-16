import { test as base } from '@playwright/test';
import { allure } from 'allure-playwright';

export const test = base.extend({
  async page({ page }, use) {
    page.on('response', async (response) => {
      if (response.request().method() !== 'GET') {
        const req = response.request();
        const json = {
          url: req.url(),
          method: req.method(),
          headers: req.headers(),
          postData: req.postData(),
        };
        allure.attachment('Request JSON', JSON.stringify(json, null, 2), 'application/json');
      }
    });
    await use(page);
  },
});

export async function attachScreenshot(page: any, name: string = 'screenshot') {
  const screenshot = await page.screenshot();
  allure.attachment(name, screenshot, 'image/png');
}
