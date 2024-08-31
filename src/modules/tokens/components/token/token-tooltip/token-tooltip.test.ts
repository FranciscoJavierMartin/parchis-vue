import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import TokenTooltip from './token-tooltip.vue';
import DiceFace from '@/modules/dice/components/dice-face/dice-face.vue';

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
    expect(tokenTooltip.findAll('button')).toHaveLength(2);
    expect(tokenTooltip.findAllComponents(DiceFace)).toHaveLength(2);
  });
});
