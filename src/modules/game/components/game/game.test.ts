import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import router from '@/router';
import i18n from '@/i18n';
import Game from './game.vue';

describe('game.vue', () => {
  // const mockRoute = {
  //   params: {},
  // };
  // const mockRouter = {
  //   push: vi.fn(),
  // };

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
        // mocks: {
        //   $route: mockRoute,
        //   $router: mockRouter,
        // },
        plugins: [i18n, router],
        provide: {
          OptionsGameState: {
            SOUND: false,
            MUSIC: false,
            CHAT: false,
          },
          OptionsGamePlaySound: vi.fn(),
        },
      },
    });

    expect(wrapper.find('.game-board-wrapper').exists()).toBe(true);
  });
});
