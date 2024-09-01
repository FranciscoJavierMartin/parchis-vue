import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import DiceFace from '@dice/components/dice-face/dice-face.vue';
import { EColors } from '@board/interfaces/board.enum';
import type { TColors } from '@board/interfaces/board.interface';
import TokenTooltip from './token-tooltip.vue';

describe('token-tooltip.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(TokenTooltip, {
      props: {
        color: 'BLUE',
        coordinate: { x: 5, y: 7 },
        diceAvailable: [
          { key: 1, value: 2 },
          { key: 2, value: 3 },
        ],
      },
    });

    const tokenTooltip = wrapper.find('.token-tooltip');
    expect(tokenTooltip.exists()).toBe(true);
    const { left, top } = getComputedStyle(tokenTooltip.element);
    // expect(top).toBe('5px');
    // expect(left).toBe('7px');

    expect(tokenTooltip.findAll('button')).toHaveLength(2);
    expect(tokenTooltip.findAllComponents(DiceFace)).toHaveLength(2);
  });

  test.for(Object.keys(EColors) as TColors[])('renders %s tooltip', (color: TColors) => {
    const wrapper = mount(TokenTooltip, {
      props: {
        color,
        coordinate: { x: 5, y: 7 },
        diceAvailable: [
          { key: 1, value: 2 },
          { key: 2, value: 3 },
        ],
      },
    });

    expect(wrapper.find('.token-tooltip').classes()).toContain(color.toLowerCase());
  });

  test('emits handleTooltipDice', async () => {
    const wrapper = mount(TokenTooltip, {
      props: {
        color: 'BLUE',
        coordinate: { x: 5, y: 7 },
        diceAvailable: [
          { key: 1, value: 2 },
          { key: 2, value: 3 },
        ],
      },
    });

    await wrapper.findAll('button')[0].trigger('click');
    expect(wrapper.emitted()).toHaveProperty('handleTooltipDice');
    expect(wrapper.emitted()['handleTooltipDice']).toStrictEqual([[{ key: 1, value: 2 }]]);
  });
});
