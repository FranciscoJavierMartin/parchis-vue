import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import router from '@/router';
import { OptionsGameStateSymbol } from '@sounds/constants/sounds.constants';
import BackButton from '@layouts/components/back-button/back-button/back-button.vue';
import MenuOptions from '@layouts/components/menu-options/menu-options.vue';
import GameLogo from '@common/components/game-logo/game-logo.vue';
import SetupPlayers from '@players/components/setup-players/setup-players.vue';
import OfflineView from './offline-view.vue';

describe('offline-view.vue', () => {
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
    expect(wrapper.findComponent(BackButton).exists()).toBe(true);
    expect(wrapper.findComponent(MenuOptions).exists()).toBe(true);
    expect(wrapper.findComponent(MenuOptions).exists()).toBe(true);
    expect(wrapper.findComponent(GameLogo).exists()).toBe(true);
    expect(wrapper.findComponent(SetupPlayers).exists()).toBe(true);
  });
});
