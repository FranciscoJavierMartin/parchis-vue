import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import i18n from '@/i18n';
import InputRadio from '@players/components/input-radio/input-radio.vue';
import SelectNumberPlayers from './select-number-players.vue';

describe('select-number-players.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(SelectNumberPlayers, {
      props: {
        numberPlayers: [2, 3, 4],
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.game-select-number-players').exists()).toBe(true);
    expect(wrapper.findAllComponents(InputRadio)).toHaveLength(3);
  });
});
