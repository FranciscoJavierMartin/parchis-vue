import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import SelectTokenColorTooltip from './select-token-color-tooltip.vue';
import { EColors } from '@board/interfaces/board.enum';

describe('select-token-color-tooltip.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(SelectTokenColorTooltip, {
      props: {
        modelValue: 'BLUE',
      },
    });

    expect(wrapper.find('.select-token-color-tooltip').exists()).toBe(true);
    expect(wrapper.findAll('button')).toHaveLength(4);
    Object.keys(EColors).forEach((color) => {
      expect(wrapper.find(`button.${color.toLowerCase()}`).exists()).toBe(true);
    });
    expect(wrapper.findAll('button.selected')).toHaveLength(1);
  });
});
