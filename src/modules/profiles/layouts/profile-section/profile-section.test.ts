import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ProfileWrapper from '@profiles/layouts/profile-wrapper/profile-wrapper.vue';
import ProfileSection from './profile-section.vue';
import i18n from '@/i18n';

describe('profile-section.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(ProfileSection, {
      props: {
        actionsTurn: {
          diceList: [],
          diceRollNumber: 0,
          diceValue: 0,
          disabledDice: false,
          isDisabledUI: false,
          showDice: false,
          timerActivated: false,
        },
        basePosition: 'BOTTOM',
        currentTurn: 1,
        players: [
          {
            color: 'BLUE',
            counterMessage: 0,
            finished: false,
            id: 'qwerty',
            index: 0,
            isOffline: false,
            name: 'Alice',
            ranking: 1,
          },
          {
            color: 'RED',
            counterMessage: 0,
            finished: false,
            id: 'zxcvb',
            index: 0,
            isOffline: false,
            name: 'Bob',
            ranking: 1,
          },
        ],
        totalPlayers: 2,
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.game-profile-section').exists()).toBe(true);
    expect(wrapper.findAllComponents(ProfileWrapper)).toHaveLength(2);
  });
});
