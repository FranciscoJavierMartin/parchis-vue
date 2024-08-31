import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import debounce, { delay } from './debounce.helper';

describe('delay', () => {
  test('check if time has passed', async () => {
    const previousTime: number = Date.now();
    await delay(200);
    const currentTime: number = Date.now();

    expect(currentTime - previousTime).toBeLessThanOrEqual(250);
    expect(currentTime - previousTime).toBeGreaterThanOrEqual(200);
  });
});

describe('debounce', () => {
  let func = vi.fn();
  let debouncedFunc: Function;

  beforeEach(() => {
    vi.useFakeTimers();
    func = vi.fn();
    debouncedFunc = debounce(func, 1000);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  test('check fi function has been called', async () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    expect(func).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(func).toHaveBeenCalledOnce();
  });
});
