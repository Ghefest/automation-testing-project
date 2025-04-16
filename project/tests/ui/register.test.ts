import { test } from '@playwright/test';
import { RegisterBO } from '../../bo/RegisterBO';

test('Register flow with captcha warning', async ({ page }) => {
  const registerBO = new RegisterBO(page);
  await registerBO.registerUser('testuser_' + Date.now(), 'Password123!', 'Test');
});
