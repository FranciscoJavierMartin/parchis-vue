import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import SelectNumberPlayers from '@players/components/select-number-players/select-number-players.vue';
import SetupPlayers from './setup-players.vue';
import PlayerInput from '../player-input/player-input.vue';

describe('setup-players.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(SetupPlayers, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('form.game-offline').exists()).toBe(true);
    expect(wrapper.findComponent(SelectNumberPlayers).exists()).toBe(true);
    expect(wrapper.find('.game-offline-players').findAllComponents(PlayerInput)).toHaveLength(4);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').text()).toBe('Play');
    expect(wrapper.find('button .icon-play').exists()).toBe(true);
    expect(wrapper.find('button .icon-play svg path').attributes()['fill']).toBe('#8b5f00');
  });
});
