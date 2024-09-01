import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits about page', async ({ page }) => {
  await page.goto('/parchis-vue/about');

  await page.waitForSelector('.about-page', { state: 'visible' });

  await expect(page.locator('.about-page').locator('p').first()).toContainText('The origins of');
});

test('return to home page', async ({ page }) => {
  await page.goto('/parchis-vue/about');

  await page.waitForSelector('.about-page', { state: 'visible' });

  await page.locator('button.game-back-button').click();

  await expect(page.locator('.confirm-modal')).toBeVisible();
  await expect(page.locator('.confirm-modal h2')).toHaveText('Exit');
  await expect(page.locator('.confirm-modal span.text')).toHaveText(
    'Are you sure you want to quit the game?',
  );

  await page.locator('button.button-no').click();

  await expect(page.locator('.confirm-modal')).toBeHidden();

  await page.locator('button.game-back-button').click();

  await page.locator('button.button-yes').click();

  expect(page.url().endsWith('/parchis-vue/')).toBe(true);
});
