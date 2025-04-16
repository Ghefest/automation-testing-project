import { test } from '@playwright/test';
import { users } from '../../core/config/test.data';
import { RegisterBO } from '../../bo/RegisterBO';

test('Register flow with captcha warning', async ({ page }) => {
  const user = users.validLogins[0];
  const registerBO = new RegisterBO(page);

  const firstName = 'Test';
  const lastName = 'User';

  await registerBO.registerUser(firstName, lastName, user.username, user.password);
  await registerBO.assertSuccessfulRegistration(user.redirectUrl);
});
