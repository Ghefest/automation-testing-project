import { test, expect } from '@playwright/test';

test('Lab 14: Login test with Allure reporting', async ({ page }) => {
  await test.step('🔗 Navigate to login page', async () => {
    await page.goto('https://demoqa.com/login');
    await expect(page).toHaveTitle(/ToolsQA/);
  });

  await test.step('🔐 Fill credentials', async () => {
    await page.fill('#userName', 'testuser');
    await page.fill('#password', 'invalidpass');
    await page.click('#login');
  });

  await test.step('❌ Verify login failed', async () => {
    await expect(page.locator('#name')).toContainText('Invalid');
  });
});
