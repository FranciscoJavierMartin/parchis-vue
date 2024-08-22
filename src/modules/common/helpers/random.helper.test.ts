import { describe, expect, test } from 'vitest';
import { getRandomNumber, randomValueDice, getRandomValueDice } from './random.helper';
import type { IActionsTurn } from '@game/interfaces/game.interface';

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

describe('getRandomValueDice', () => {
  test('Random dice value', () => {
    const originalActionTurn: IActionsTurn = {
      diceList: [],
      diceRollNumber: 0,
      diceValue: 0,
      disabledDice: false,
      isDisabledUI: false,
      showDice: false,
      timerActivated: true,
      actionsBoardGame: 'ROLL_DICE',
    };

    const newActionsTurn = getRandomValueDice(originalActionTurn);

    expect(newActionsTurn !== originalActionTurn).toBe(true);
    expect(newActionsTurn.timerActivated).toBe(false);
    expect(newActionsTurn.disabledDice).toBe(true);
    expect(newActionsTurn.diceRollNumber).toBeGreaterThan(0);
    expect(newActionsTurn.diceValue).toBeGreaterThan(0);
  });
});
