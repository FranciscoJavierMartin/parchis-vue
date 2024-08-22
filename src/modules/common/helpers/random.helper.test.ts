import { describe, expect, test } from 'vitest';
import { getRandomNumber } from './random.helper';

describe('getRandomNumber', () => {
  test('Check number is between range', () => {
    const ranges = [
      [1, 10],
      [2, 20],
      [3, 30],
      [4, 40],
      [5, 50],
    ];
    const results = ranges.map(([min, max]) => getRandomNumber(min, max));

    ranges.forEach(([min, max], index: number) => {
      expect(results[index]).toBeGreaterThanOrEqual(min);
      expect(results[index]).toBeLessThanOrEqual(max);
    });
  });
});
