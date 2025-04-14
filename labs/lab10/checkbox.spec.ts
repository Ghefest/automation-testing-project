import { test, expect } from '@playwright/test';

test.describe('🧪 Lab 10 – DemoQA Checkbox page', () => {
  test('interact with elements and verify visibility', async ({ page }) => {
    // 1. Navigate to the page
    await page.goto('https://demoqa.com/checkbox');

    // 2. Select 3 different elements
    const expandAllBtn = page.getByTitle('Expand all');
    const collapseAllBtn = page.getByTitle('Collapse all');
    const homeCheckbox = page.locator('label[for="tree-node-home"] .rct-checkbox');

    // 3. Interact with all selected elements
    await expandAllBtn.click();
    await expect(expandAllBtn).toBeVisible();

    await homeCheckbox.click();
    await expect(homeCheckbox).toBeVisible();

    await collapseAllBtn.click();
    await expect(collapseAllBtn).toBeVisible();

    // 4. Final visibility assertion for all 3
    await expect(expandAllBtn).toBeVisible();
    await expect(homeCheckbox).toBeVisible();
    await expect(collapseAllBtn).toBeVisible();
  });
});
