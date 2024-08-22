import { describe, expect, test } from 'vitest';
import { getRandomNumber, randomValueDice } from './random.helper';

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

describe('randomValueDice', () => {
  test('Check dice number is between range', () => {
    const results = new Array(100).map(() => randomValueDice());

    results.forEach((result) => {
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    });
  });
});
