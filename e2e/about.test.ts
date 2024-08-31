import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test.skip('visits about page', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('a.button.blue', { state: 'visible' });

  await expect(page.locator('[href*="/parchis-vue/online"]')).toBeVisible();
  await expect(page.locator('[href*="/parchis-vue/offline"]')).toBeVisible();
  await expect(page.locator('[href*="/parchis-vue/about"]')).toBeVisible();
  await expect(page.locator('button[title*="Share"]')).toBeVisible();
});
