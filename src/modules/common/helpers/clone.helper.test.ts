import { describe, expect, test } from 'vitest';
import { cloneDeep } from './clone.helper';

describe('cloneDeep', () => {
  test('clone object', () => {
    const original = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const copy = cloneDeep(original);

    expect(copy).not.toBe(original);
    expect(copy === original).toBe(false);
    expect(copy.b === original.b).toBe(false);
    expect(copy).toStrictEqual(original);
  });

  test('clone boolean', () => {
    const original = true;

    const copy = cloneDeep(original);

    expect(copy).toBe(original);
  });

  test('clone numer', () => {
    const original = 1;

    const copy = cloneDeep(original);

    expect(copy).toBe(original);
  });
});
