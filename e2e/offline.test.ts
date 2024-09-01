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

  const inputs = await page.locator('.game-offline-input-name:not(:disabled)').all();

  await Promise.all(
    inputs.map(async (input, index: number) => {
      await input.clear({ force: true });
      await input.fill(`Player ${index}0`);
    }),
  );

  await Promise.all(
    inputs.map(async (input, index: number) => {
      const text = await input.inputValue();
      console.log({ expected: `Player ${index}0`, value: text });
      await expect(input).toHaveValue(`Player ${index}0`);
      // await input.fill(`Pslayer ${index}0`);
    }),
  );

  // const t = await inputs[0].textContent();

  // expect(await page.locator('.game-offline-input-name:not(:disabled)').count()).toBe(3);
  // expect(await page.locator('.game-offline-input-name:disabled').count()).toBe(1);
  // await page.locator('.game-offline-input-name').first().fill('Hello world');
  // const t = await page.locator('.game-offline-input-name').first().inputValue();

  // const input = page.locator('.game-offline-input-name').first();
  // await input.fill('Hello world');

  // const t = await input.textContent();

  // console.log(t);
});
