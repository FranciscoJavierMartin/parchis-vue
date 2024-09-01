import { test, expect } from '@playwright/test';

test('interact with options menu - (change language)', async ({ page }) => {
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

test('interact with options menu - (sound option)', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('button.menu-options-button', { state: 'visible' });
  await page.click('button.menu-options-button');

  await expect(page.locator('.menu-options-modal')).toBeVisible();
  await expect(page.locator('.menu-option-label').first()).toHaveText('Sound');

  await page.locator('#menu-option-Chat').check();

  await page.locator('label[for="menu-option-Chat"]').click();

  // console.log(navigator.mediaSession.playbackState !== 'none');

  // expect(page.locator('audio')).toBeDefined();
  // await page.waitForSelector('audio');
  // console.log(page.locator('audio').getAttribute('paused'));
  // // console.log(document.getElementsByTagName('audio'));

  await page.locator('#menu-option-Chat').uncheck();
});
