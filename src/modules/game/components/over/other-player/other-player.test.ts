import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import i18n from '@/i18n';
import type { IPlayer } from '@players/interfaces/user.interface';
import botImage from '@/assets/images/bot.png';
import OtherPlayer from './other-player.vue';

describe('other-player.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(OtherPlayer, {
      props: {
        player: {
          ranking: 2,
          name: 'Alice',
          photo: botImage,
          color: 'RED',
        } as IPlayer,
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.other-player-container').exists()).toBe(true);

    expect(wrapper.find('.position').text()).toBe('2nd');
    expect(wrapper.find('.ranking-player-name.red').exists()).toBe(true);
    expect(wrapper.find('.ranking-player-name').text()).toBe('Alice');
  });

  test('3rd position', () => {
    const wrapper = mount(OtherPlayer, {
      props: {
        player: {
          ranking: 3,
          name: 'Alice',
          photo: botImage,
          color: 'YELLOW',
        } as IPlayer,
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.other-player-container').exists()).toBe(true);

    expect(wrapper.find('.position').text()).toBe('3rd');
    expect(wrapper.find('.ranking-player-name.yellow').exists()).toBe(true);
    expect(wrapper.find('.ranking-player-name').text()).toBe('Alice');
  });
});
