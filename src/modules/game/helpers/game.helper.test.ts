import { describe, expect, test } from 'vitest';
import { EActionsBoardGame } from '@game/interfaces/game.enum';
import { getInitialActionsTurnValue } from './game.helper';

describe('getInitialActionsTurnValue', () => {
  test('first player turn', () => {
    const actionsTurn = getInitialActionsTurnValue(1, [
      {
        color: 'BLUE',
        counterMessage: 0,
        finished: false,
        id: 'asdf',
        index: 1,
        isOffline: false,
        name: 'Alice',
        ranking: 1,
      },
      {
        color: 'YELLOW',
        counterMessage: 0,
        finished: false,
        id: 'qwerty',
        index: 0,
        isOffline: false,
        name: 'Bob',
        ranking: 1,
      },
    ]);

    expect(actionsTurn).toEqual({
      timerActivated: true,
      disabledDice: false,
      showDice: true,
      diceValue: 0,
      diceList: [],
      diceRollNumber: 0,
      isDisabledUI: false,
      actionsBoardGame: EActionsBoardGame.ROLL_DICE,
    });
  });

  test('online players', () => {
    const actionsTurn = getInitialActionsTurnValue(0, [
      {
        color: 'BLUE',
        counterMessage: 0,
        finished: false,
        id: 'asdf',
        index: 1,
        isOffline: false,
        isOnline: true,
        name: 'Alice',
        ranking: 1,
      },
      {
        color: 'YELLOW',
        counterMessage: 0,
        finished: false,
        id: 'qwerty',
        index: 0,
        isOffline: false,
        isOnline: true,
        name: 'Bob',
        ranking: 1,
      },
    ]);

    expect(actionsTurn).toEqual({
      timerActivated: true,
      disabledDice: false,
      showDice: true,
      diceValue: 0,
      diceList: [],
      diceRollNumber: 0,
      isDisabledUI: false,
      actionsBoardGame: EActionsBoardGame.ROLL_DICE,
    });
  });
});
