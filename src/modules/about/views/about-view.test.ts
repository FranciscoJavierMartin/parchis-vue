import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import router from '@/router';
import GameLogo from '@common/components/game-logo/game-logo.vue';
import MenuOptions from '@layouts/components/menu-options/menu-options.vue';
import BackButton from '@layouts/components/back-button/back-button/back-button.vue';
import PageWrapper from '@layouts/components/wrapper/page-wrapper/page-wrapper.vue';
import AboutView from './about-view.vue';
import { OptionsGameStateSymbol } from '@/modules/sounds/constants/sounds.constants';

describe('about-view.vue', () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'screen';
    document.body.appendChild(el);
  });

  afterEach(() => {
    // clean up
    document.body.innerHTML = '';
  });

  test('renders properly', () => {
    const wrapper = mount(AboutView, {
      global: {
        plugins: [i18n, router],
        components: { GameLogo, MenuOptions, BackButton, PageWrapper },
        provide: {
          [OptionsGameStateSymbol]: {
            SOUND: true,
            MUSIC: true,
            CHAT: true,
          },
        },
      },
    });

    expect(wrapper.text()).toMatch(/The origins of/i);
  });
});
