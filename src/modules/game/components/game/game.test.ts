import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import router from '@/router';
import i18n from '@/i18n';
import {
  OptionsGamePlaySoundSymbol,
  OptionsGameStateSymbol,
} from '@sounds/constants/sounds.constants';
import Game from './game.vue';

describe('game.vue', () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'screen';
    document.body.appendChild(el);
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('renders properly', () => {
    const wrapper = shallowMount(Game, {
      shallow: true,
      props: {
        totalPlayers: 2,
        initialTurn: 1,
        users: [
          {
            id: 'asdf',
            name: 'Alice',
            isBot: true,
            isOnline: false,
          },
          {
            id: 'qwert',
            name: 'Bob',
            isBot: true,
            isOnline: false,
          },
        ],
      },
      global: {
        plugins: [i18n, router],
        provide: {
          [OptionsGameStateSymbol]: {
            SOUND: false,
            MUSIC: false,
            CHAT: false,
          },
          [OptionsGamePlaySoundSymbol]: vi.fn(),
        },
      },
    });

    expect(wrapper.find('.game-board-wrapper').exists()).toBe(true);
  });
});
