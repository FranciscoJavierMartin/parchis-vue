import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits about page', async ({ page }) => {
  await page.goto('/parchis-vue/about');

  await page.waitForSelector('.about-page', { state: 'visible' });

  await expect(page.locator('.about-page').locator('p').first()).toContainText('The origins of');
});
