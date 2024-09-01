import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import router from '@/router';
import { OptionsGameStateSymbol } from '@sounds/constants/sounds.constants';
import OfflineView from './online-view.vue';

describe('online-view.vue', () => {
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
    const wrapper = mount(OfflineView, {
      global: {
        plugins: [i18n, router],
        provide: {
          [OptionsGameStateSymbol]: {
            SOUND: false,
            MUSIC: false,
            CHAT: false,
          },
        },
      },
    });

    expect(wrapper.find('.page-wrapper').exists()).toBe(true);
    expect(wrapper.find('.online-page').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Online');
  });
});
