import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import i18n from '@/i18n';
import SelectTokenColorTooltip from '@players/components/select-token-color-tooltip/select-token-color-tooltip.vue';
import { EColors } from '@board/interfaces/board.enum';
import TokenPiece from '@tokens/components/token/token-piece/token-piece.vue';
import SelectTokenColor from './select-token-color.vue';

describe('select-token-color.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(SelectTokenColor, {
      props: {
        disabled: false,
        modelValue: EColors.BLUE,
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.game-offline-token-wrapper').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').attributes()['disabled']).toBeUndefined();
    expect(wrapper.find('button').findComponent(TokenPiece).exists()).toBe(true);
    expect(wrapper.findComponent(SelectTokenColorTooltip).exists()).toBe(false);
  });
});
