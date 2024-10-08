import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { EColors, EtypeTile } from '@board/interfaces/board.enum';
import TokenPiece from '@tokens/components/token/token-piece/token-piece.vue';
import TokenTooltip from '@tokens/components/token/token-tooltip/token-tooltip.vue';
import GameToken from './game-token.vue';

describe('game-token.vue', () => {
  test('renders properly', () => {
    const testDiv = document.createElement('div');
    testDiv.style.setProperty('--size-tile', '26px');
    const wrapper = mount(GameToken, {
      attachTo: testDiv,
      props: {
        diceAvailable: [],
        diceList: [],
        color: EColors.BLUE,
        typeTile: EtypeTile.NORMAL,
        index: 0,
        totalTokens: 4,
        position: 1,
        enableTooltip: false,
        isMoving: false,
        animated: false,
        canSelectToken: true,
        isDisabledUI: false,
        debug: false,
        coordinate: { x: 5, y: 5 },
        positionTile: 4,
      },
    });

    expect(wrapper.find('.game-token').exists()).toBe(true);
    expect(wrapper.find('.game-token').classes()).not.toContain('moving');
    expect(wrapper.find('.game-token').classes()).not.toContain('animated');
    const { height, left, top, width, zIndex } = getComputedStyle(
      wrapper.find('.game-token').element,
    );
    expect(left).toBe('5px');
    expect(top).toBe('5px');
    // JSDom don't support CSS variables
    // expect(height).toBe('26px');
    // expect(width).toBe('26px');
    expect(zIndex).toBe('1');

    expect(wrapper.findComponent(TokenPiece).exists()).toBe(true);
    expect(wrapper.find('.game-token button.game-token-button').exists()).toBe(false);
    expect(wrapper.findComponent(TokenTooltip).exists()).toBe(false);
  });

  test('show button', () => {
    const wrapper = mount(GameToken, {
      props: {
        diceAvailable: [{ key: 1, value: 2 }],
        diceList: [],
        color: EColors.BLUE,
        typeTile: EtypeTile.NORMAL,
        index: 0,
        totalTokens: 4,
        position: 1,
        enableTooltip: false,
        isMoving: false,
        animated: false,
        canSelectToken: true,
        isDisabledUI: false,
        debug: false,
        coordinate: { x: 5, y: 5 },
        positionTile: 4,
      },
    });

    expect(wrapper.find('button.game-token-button').exists()).toBe(true);
  });

  test('emit handleSelectedToken', async () => {
    const wrapper = mount(GameToken, {
      props: {
        diceAvailable: [{ key: 1, value: 2 }],
        diceList: [{ key: 1, value: 2 }],
        color: EColors.BLUE,
        typeTile: EtypeTile.NORMAL,
        index: 2,
        totalTokens: 4,
        position: 1,
        enableTooltip: false,
        isMoving: false,
        animated: false,
        canSelectToken: true,
        isDisabledUI: false,
        debug: false,
        coordinate: { x: 5, y: 5 },
        positionTile: 4,
      },
    });

    await wrapper.find('button.game-token-button').trigger('click');
    const emitted = wrapper.emitted();
    expect(emitted).toHaveProperty('handleSelectedToken');
    expect(emitted['handleSelectedToken']).toStrictEqual([[{ diceIndex: 0, tokenIndex: 2 }]]);
  });

  test('show tooltip', async () => {
    const wrapper = mount(GameToken, {
      props: {
        diceAvailable: [
          { key: 1, value: 2 },
          { key: 2, value: 3 },
        ],
        diceList: [
          { key: 1, value: 2 },
          { key: 2, value: 3 },
        ],
        color: EColors.BLUE,
        typeTile: EtypeTile.NORMAL,
        index: 2,
        totalTokens: 4,
        position: 1,
        enableTooltip: false,
        isMoving: false,
        animated: false,
        canSelectToken: true,
        isDisabledUI: false,
        debug: false,
        coordinate: { x: 5, y: 5 },
        positionTile: 4,
      },
    });

    await wrapper.find('button.game-token-button').trigger('click');
    const emitted = wrapper.emitted();
    expect(emitted).not.toHaveProperty('handleSelectedToken');
    expect(wrapper.findComponent(TokenTooltip).exists()).toBe(true);
  });
});
