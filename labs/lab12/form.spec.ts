import { test } from '@playwright/test';
import { FormPage } from './FormPage';
import { AlertHandler } from './AlertHandler';

test('Lab 12: Fill form and handle alert with wrappers', async ({ page }) => {
  const formPage = new FormPage(page);
  const alertHandler = new AlertHandler(page);

  await formPage.goto();
  await formPage.login('Test', 'User', '1234567890');

  await alertHandler.acceptAlert();
  await formPage.submitButton.click();
});
