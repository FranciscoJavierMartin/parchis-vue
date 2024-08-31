import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits home page', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('a.button.blue', { state: 'visible' });

  await expect(page.locator('[href*="/parchis-vue/online"]')).toBeVisible();
  await expect(page.locator('[href*="/parchis-vue/offline"]')).toBeVisible();
  await expect(page.locator('[href*="/parchis-vue/about"]')).toBeVisible();
  await expect(page.locator('button[title*="Share"]')).toBeVisible();
});

test('interact with options menu', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('button.menu-options-button', { state: 'visible' });
  await page.click('button.menu-options-button');

  await expect(page.locator('.menu-options-modal')).toBeVisible();
  await expect(page.locator('.menu-option-label').first()).toHaveText('Sound');

  await expect(page.locator('.drop-down .selected span')).toHaveText('English');
  await page.locator('.drop-down .selected').click();

  expect(await page.locator('.drop-down :not(.selected) .option span').count()).toBe(2);

  expect(
    await page.locator('.drop-down :not(.selected) .option span').allInnerTexts(),
  ).toStrictEqual(['English', 'Spanish']);

  await page.locator('.drop-down :not(.selected) .option span').last().click();
  await expect(page.locator('.drop-down .selected span')).toHaveText('Spanish');

  await expect(page.locator('.menu-option-label').first()).not.toHaveText('Sound');
  await expect(page.locator('.menu-option-label').first()).toHaveText('Sonido');

  await page.locator('button.menu-options-close').click();

  await expect(page.locator('.menu-options-modal')).toBeHidden();
});
