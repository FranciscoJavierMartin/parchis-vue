import { describe, expect, test, vitest, vi, afterEach, beforeAll } from 'vitest';
import { copyToClipboard } from './copy-to-clipboard.helper';

describe('copyToClipboard', () => {
  beforeAll(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn(),
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('check if it is copied from clipboard', async () => {
    const writeTextMock = vitest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    copyToClipboard('John Doe');
    expect(writeTextMock).toHaveBeenCalledWith('John Doe');
    expect(writeTextMock).toHaveBeenCalledTimes(1);
  });
});
