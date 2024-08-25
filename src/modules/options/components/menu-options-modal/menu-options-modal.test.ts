import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import { OptionsGameStateSymbol } from '@sounds/constants/sounds.constants';
import MenuOptionsModal from './menu-options-modal.vue';

describe('menu-options-modal.vue', () => {
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
    const wrapper = mount(MenuOptionsModal, {
      props: {
        showModal: true,
      },
      global: {
        plugins: [i18n],
        provide: {
          [OptionsGameStateSymbol]: {
            SOUND: false,
            MUSIC: false,
            CHAT: false,
          },
        },
      },
    });

    expect(wrapper.find('.menu-options-modal').exists()).toBe(true);
  });
});
