import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import GameToken from '@tokens/components/token/game-token/game-token.vue';
import TokenList from './token-list.vue';
import { EColors, EtypeTile } from '@/modules/board/interfaces/board.enum';

describe('token-list.vue', () => {
  test('renders properly for single player', () => {
    const wrapper = mount(TokenList, {
      props: {
        diceList: [{ key: 1, value: 2 }],
        listToken: [
          {
            index: 1,
            positionGame: 'BOTTOM_LEFT',
            tokens: [
              {
                diceAvailable: [],
                color: EColors.BLUE,
                typeTile: EtypeTile.NORMAL,
                index: 0,
                totalTokens: 4,
                position: 1,
                enableTooltip: false,
                isMoving: false,
                animated: false,
                canSelectToken: true,
                coordinate: { x: 5, y: 5 },
                positionTile: 4,
              },
              {
                diceAvailable: [],
                color: EColors.BLUE,
                typeTile: EtypeTile.NORMAL,
                index: 0,
                totalTokens: 4,
                position: 1,
                enableTooltip: false,
                isMoving: false,
                animated: false,
                canSelectToken: true,
                coordinate: { x: 5, y: 5 },
                positionTile: 4,
              },
              {
                diceAvailable: [],
                color: EColors.BLUE,
                typeTile: EtypeTile.NORMAL,
                index: 0,
                totalTokens: 4,
                position: 1,
                enableTooltip: false,
                isMoving: false,
                animated: false,
                canSelectToken: true,
                coordinate: { x: 5, y: 5 },
                positionTile: 4,
              },
            ],
          },
        ],
      },
    });

    expect(wrapper.findAllComponents(GameToken)).toHaveLength(3);
  });

  test('renders properly for multiple players', () => {
    const wrapper = mount(TokenList, {
      props: {
        diceList: [{ key: 1, value: 2 }],
        listToken: [
          {
            index: 1,
            positionGame: 'BOTTOM_LEFT',
            tokens: [
              {
                diceAvailable: [],
                color: EColors.BLUE,
                typeTile: EtypeTile.NORMAL,
                index: 0,
                totalTokens: 4,
                position: 1,
                enableTooltip: false,
                isMoving: false,
                animated: false,
                canSelectToken: true,
                coordinate: { x: 5, y: 5 },
                positionTile: 4,
              },
              {
                diceAvailable: [],
                color: EColors.BLUE,
                typeTile: EtypeTile.NORMAL,
                index: 0,
                totalTokens: 4,
                position: 1,
                enableTooltip: false,
                isMoving: false,
                animated: false,
                canSelectToken: true,
                coordinate: { x: 5, y: 5 },
                positionTile: 4,
              },
              {
                diceAvailable: [],
                color: EColors.BLUE,
                typeTile: EtypeTile.NORMAL,
                index: 0,
                totalTokens: 4,
                position: 1,
                enableTooltip: false,
                isMoving: false,
                animated: false,
                canSelectToken: true,
                coordinate: { x: 5, y: 5 },
                positionTile: 4,
              },
            ],
          },
          {
            index: 2,
            positionGame: 'TOP_RIGHT',
            tokens: [
              {
                diceAvailable: [],
                color: EColors.BLUE,
                typeTile: EtypeTile.NORMAL,
                index: 0,
                totalTokens: 4,
                position: 1,
                enableTooltip: false,
                isMoving: false,
                animated: false,
                canSelectToken: true,
                coordinate: { x: 5, y: 5 },
                positionTile: 4,
              },
              {
                diceAvailable: [],
                color: EColors.BLUE,
                typeTile: EtypeTile.NORMAL,
                index: 0,
                totalTokens: 4,
                position: 1,
                enableTooltip: false,
                isMoving: false,
                animated: false,
                canSelectToken: true,
                coordinate: { x: 5, y: 5 },
                positionTile: 4,
              },
            ],
          },
        ],
      },
    });

    expect(wrapper.findAllComponents(GameToken)).toHaveLength(5);
  });
});
