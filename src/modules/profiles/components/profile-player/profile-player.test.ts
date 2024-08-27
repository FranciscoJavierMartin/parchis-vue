import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import i18n from '@/i18n';
import ProfileImage from '@profiles/components/profile-image/profile-image.vue';
import ProfileDice from '@profiles/components/profile-dice/profile-dice.vue';
import ProfileRanking from '@profiles/components/profile-ranking/profile-ranking.vue';
import ProfilePlayer from './profile-player.vue';

describe('profile-player.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(ProfilePlayer, {
      props: {
        basePosition: 'BOTTOM',
        hasTurn: false,
        position: 'LEFT',
        player: {
          color: 'BLUE',
          name: 'Alice',
          counterMessage: 0,
          finished: false,
          id: 'asdfg',
          index: 1,
          isOffline: false,
          ranking: 1,
        },
        actionsTurn: {
          diceList: [],
          diceRollNumber: 0,
          diceValue: 0,
          disabledDice: false,
          isDisabledUI: false,
          showDice: false,
          timerActivated: false,
        },
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.game-profile').exists()).toBe(true);
    expect(wrapper.find('.game-profile').classes()).toContain('bottom');
    expect(wrapper.find('.game-profile').classes()).toContain('left');
    expect(wrapper.find('.game-profile-dice-name').exists()).toBe(true);
    expect(wrapper.findComponent(ProfileImage).exists()).toBe(true);
    expect(wrapper.findComponent(ProfileDice).exists()).toBe(false);
    expect(wrapper.findComponent(ProfileRanking).exists()).toBe(false);
  });
});
