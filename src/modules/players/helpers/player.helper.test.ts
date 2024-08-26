import { describe, expect, test } from 'vitest';
import { getPlayersColors } from './player.helper';
import type { TTotalPlayers } from '@/modules/game/interfaces/game.interface';

describe('getPlayersColors', () => {
  test.for([
    [2, 'BLUE', 'GREEN'],
    [3, 'BLUE', 'RED', 'GREEN'],
    [4, 'BLUE', 'RED', 'GREEN', 'YELLOW'],
  ])('for %i players', ([totalPlayers, ...expected]) => {
    expect(getPlayersColors('BRGY', totalPlayers as TTotalPlayers)).toStrictEqual(expected);
  });
});
