import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { EColors } from '@board/interfaces/board.enum';
import SelectTokenColorTooltip from './select-token-color-tooltip.vue';

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

  test('change color when click on one', async () => {
    const wrapper: any = mount(SelectTokenColorTooltip, {
      props: {
        modelValue: EColors.BLUE,
        'onUpdate:modelValue': async (e) => wrapper.setProps({ modelValue: e }),
      },
    });

    expect(wrapper.find('.select-token-color-tooltip').exists()).toBe(true);

    await wrapper.find('button.green').trigger('click');

    expect(wrapper.find('button.green.selected').exists()).toBe(true);
    expect(wrapper.find('button.blue.selected').exists()).toBe(false);
  });
});
