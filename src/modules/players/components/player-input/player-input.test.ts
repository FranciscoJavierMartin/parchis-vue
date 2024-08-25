import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import SelectTokenColor from '@players/components/select-token-color/select-token-color.vue';
import InputName from '@players/components/input-name/input-name.vue';
import InputSwitch from '@common/components/input-switch/input-switch.vue';
import PlayerInput from './player-input.vue';

describe('player-input.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(PlayerInput, {
      props: {
        color: 'BLUE',
        id: 'qwerty',
        index: 1,
        disabled: false,
        name: '',
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.game-offline-player').exists()).toBe(true);
    expect(wrapper.findComponent(SelectTokenColor).exists()).toBe(true);
    expect(wrapper.findComponent(InputName).exists()).toBe(true);
    expect(wrapper.findComponent(InputSwitch).exists()).toBe(true);
  });
});
