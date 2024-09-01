import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import router from '@/router';
import { OptionsGameStateSymbol } from '@/modules/sounds/constants/sounds.constants';
import { ToastAddToastSymbol } from '@/modules/toast/constants/toast.constants';
import HomeView from './home-view.vue';

describe('home-view.vue', () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'screen';
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('renders properly', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [i18n, router],
        provide: {
          [OptionsGameStateSymbol]: {
            SOUND: true,
            MUSIC: true,
            CHAT: true,
          },
          [ToastAddToastSymbol]: vi.fn(),
        },
      },
    });

    expect(wrapper.find('.game-logo').exists()).toBe(true);
    expect(wrapper.find('.home-options').exists()).toBe(true);
  });
});
