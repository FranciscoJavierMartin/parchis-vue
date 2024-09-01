import { describe, test, beforeEach, afterEach, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import { OptionsGameStateSymbol } from '@sounds/constants/sounds.constants';
import MenuOptions from './menu-options.vue';

describe('menu-options.vue', () => {
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
    const wrapper = mount(MenuOptions, {
      global: {
        plugins: [i18n],
        provide: {
          [OptionsGameStateSymbol]: {
            SOUNS: false,
            CHAT: false,
            MUSIC: false,
          },
        },
      },
    });

    expect(wrapper.find('.menu-options-button').exists()).toBe(true);
    expect(wrapper.find('.menu-options-button .icon-gear').exists()).toBe(true);
  });
});
