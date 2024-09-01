import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { IPlayer } from '@players/interfaces/user.interface';
import botImage from '@/assets/images/bot.png';
import GameOverModal from './game-over-modal.vue';
import i18n from '@/i18n';
import router from '@/router';
import { ToastAddToastSymbol } from '@/modules/toast/constants/toast.constants';
import BaseModal from '@/modules/layouts/components/base-modal/base-modal.vue';

describe('game-over-modal.vue', () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'screen';
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test.skip('renders properly', () => {
    const wrapper = mount(GameOverModal, {
      props: {
        players: [
          {
            ranking: 1,
            name: 'Alice',
            photo: botImage,
            color: 'BLUE',
          },
          {
            ranking: 2,
            name: 'Alice',
            photo: botImage,
            color: 'RED',
          },
          {
            ranking: 3,
            name: 'Alice',
            photo: botImage,
            color: 'YELLOW',
          },
          {
            ranking: 4,
            name: 'Alice',
            photo: botImage,
            color: 'GREEN',
          },
        ] as IPlayer[],
        showModal: true,
      },
      global: {
        plugins: [i18n, router],
        components: { BaseModal },
        provide: {
          [ToastAddToastSymbol]: vi.fn(),
        },
      },
    });

    // expect(wrapper.find('.game-over-options').exists()).toBe(true);
  });

  test('hide modal', () => {
    const wrapper = mount(GameOverModal, {
      props: {
        players: [
          {
            ranking: 1,
            name: 'Alice',
            photo: botImage,
            color: 'BLUE',
          },
          {
            ranking: 2,
            name: 'Alice',
            photo: botImage,
            color: 'RED',
          },
          {
            ranking: 3,
            name: 'Alice',
            photo: botImage,
            color: 'YELLOW',
          },
          {
            ranking: 4,
            name: 'Alice',
            photo: botImage,
            color: 'GREEN',
          },
        ] as IPlayer[],
        showModal: false,
      },
      global: {
        plugins: [i18n, router],
        provide: {
          [ToastAddToastSymbol]: vi.fn(),
        },
      },
    });

    expect(wrapper.find('.game-over-options').exists()).toBe(false);
  });
});
