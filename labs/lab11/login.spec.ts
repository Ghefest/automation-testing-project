import { test } from '@playwright/test';
import { LoginPage } from './LoginPage';

test.describe('🧪 Lab 11 – Login flow with PageObject', () => {
  test('should log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('testuser', 'TestPassword123!');
    await loginPage.expectLoginSuccess();
  });
});
