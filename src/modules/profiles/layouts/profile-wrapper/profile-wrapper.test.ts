import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import ProfilePlayer from '@profiles/components/profile-player/profile-player.vue';
import ProfileWrapper from './profile-wrapper.vue';

describe('profile-wrapper.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(ProfileWrapper, {
      props: {
        position: 'LEFT',
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

    expect(wrapper.findComponent(ProfilePlayer).exists()).toBe(true);
  });

  test('doesnt renders', () => {
    const wrapper = mount(ProfileWrapper, {
      props: {
        position: 'RIGHT',
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

    expect(wrapper.findComponent(ProfilePlayer).exists()).toBe(false);
  });
});
