import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits home page', async ({ page }) => {
  await page.goto('/');
  expect(page.locator('a').getByRole('link', { name: /Play online/i })).toBeDefined();
  expect(page.locator('a').getByRole('link', { name: /Play offline/i })).toBeDefined();
});
