import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import i18n from '@/i18n';
import type { IPlayer } from '@players/interfaces/user.interface';
import botImage from '@/assets/images/bot.png';
import FirstPosition from './first-position.vue';

describe('first-position.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(FirstPosition, {
      props: {
        first: {
          ranking: 1,
          name: 'Alice',
          photo: botImage,
          color: 'BLUE',
        } as IPlayer,
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.first-position-container').exists()).toBe(true);
    expect(wrapper.find('.first-position-container-winner-photo .winner-crown').exists()).toBe(
      true,
    );
    expect(wrapper.find('.position').text()).toBe('1st');
    expect(wrapper.find('.ranking-player-name.blue').exists()).toBe(true);
    expect(wrapper.find('.ranking-player-name').text()).toBe('Alice');
  });
});
