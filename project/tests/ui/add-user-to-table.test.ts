import { test } from '@playwright/test';
import { PageFactory } from '../../core/factories/PageFactory';
import { TableBO } from '../../bo/TableBO';

test('Add user to table', async ({ page }) => {
  const factory = new PageFactory(page);
  const tableBO = new TableBO(factory.table());

  await tableBO.goto();
  await tableBO.openForm();
  await tableBO.fillForm('Roman', 'roman@example.com', 30, 10000, 'QA', 'Pryimak');
  await tableBO.submit();
  await tableBO.verifyUserVisible();
});
