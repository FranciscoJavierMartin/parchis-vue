import { describe, expect, test } from 'vitest';
import { delay } from './debounce.helper';

describe('delay', () => {
  test('check if time has passed', async () => {
    const previousTime: number = Date.now();
    await delay(200);
    const currentTime: number = Date.now();

    expect(currentTime - previousTime).toBeLessThanOrEqual(210);
    expect(currentTime - previousTime).toBeGreaterThanOrEqual(200);
  });
});
