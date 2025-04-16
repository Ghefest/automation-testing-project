import { test } from '@playwright/test';
import { LoginBO } from '../../bo/LoginBO';
import { users } from '../../core/config/test.data';

test.describe('Login Flow', () => {
  for (const creds of users.validLogins) {
    test(`should login successfully as ${creds.username}`, async ({ page }) => {
      const loginBO = new LoginBO(page);
      await loginBO.login(creds.username, creds.password, creds.redirectUrl);
    });
  }
});
