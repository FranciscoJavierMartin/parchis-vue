import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits offline page', async ({ page }) => {
  await page.goto('/parchis-vue/offline');

  await page.waitForSelector('.game-offline', { state: 'visible' });

  expect(await page.locator('.game-offline-player').count()).toBe(4);

  // Change number of players
  await expect(page.getByLabel(/2P/i)).toBeChecked();
  expect(await page.locator('.game-offline-input-name:not(:disabled)').count()).toBe(2);
  expect(await page.locator('.game-offline-input-name:disabled').count()).toBe(2);

  await page.getByLabel(/3P/i).setChecked(true);

  await expect(page.getByLabel(/2P/i)).not.toBeChecked();
  await expect(page.getByLabel(/3P/i)).toBeChecked();

  expect(await page.locator('.game-offline-input-name:not(:disabled)').count()).toBe(3);
  expect(await page.locator('.game-offline-input-name:disabled').count()).toBe(1);

  // Change token color
  await expect(
    page.locator('.game-offline-token-color').locator('.game-token-piece').first(),
  ).toHaveClass('game-token-piece red');
  await page.locator('.game-offline-token-color').first().click();

  await expect(page.locator('.select-token-color-tooltip')).toBeVisible();
  await page.locator('.select-token-color-tooltip').locator('button.green').click();

  await expect(
    page.locator('.game-offline-token-color').locator('.game-token-piece').first(),
  ).toHaveClass('game-token-piece green');
  await expect(page.locator('.select-token-color-tooltip')).toBeVisible();

  // Click outside
  await page.locator('.game-offline-input-name').first().click();

  await expect(page.locator('.select-token-color-tooltip')).toBeHidden();

  // Change player name
  await page.locator('.game-offline-input-name:not(:disabled)').nth(0).clear({ force: true });
  await page.locator('.game-offline-input-name:not(:disabled)').nth(0).fill(`Player ${0}0`);
  await expect(page.locator('.game-offline-input-name:not(:disabled)').nth(0)).toHaveValue(
    `Player ${0}0`,
  );

  await page.locator('.game-offline-input-name:not(:disabled)').nth(1).clear({ force: true });
  await page.locator('.game-offline-input-name:not(:disabled)').nth(1).fill(`Player ${1}0`);
  await expect(page.locator('.game-offline-input-name:not(:disabled)').nth(1)).toHaveValue(
    `Player ${1}0`,
  );

  await page.locator('.game-offline-input-name:not(:disabled)').nth(2).clear({ force: true });
  await page.locator('.game-offline-input-name:not(:disabled)').nth(2).fill(`Player ${2}0`);
  await expect(page.locator('.game-offline-input-name:not(:disabled)').nth(2)).toHaveValue(
    `Player ${2}0`,
  );

  // Is bot
  await Promise.all(
    (await page.locator('.game-offline-player').all()).map(async (row) => {
      await expect(row.locator('label input')).not.toBeChecked();
    }),
  );

  await page.locator('.game-offline-player').nth(2).locator('label.input-switch').click();

  await expect(
    page.locator('.game-offline-player').nth(2).locator('label.input-switch input'),
  ).toBeChecked();

  // Play button
  await page.locator('button[type="submit"].game-offline-play').click();

  await expect(page.locator('.game-board')).toBeVisible();
});
