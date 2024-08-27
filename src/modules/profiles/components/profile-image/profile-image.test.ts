import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import PlayerAvatar from '@common/components/player-avatar/player-avatar.vue';
import ProfileImage from './profile-image.vue';

describe('profile-image.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(ProfileImage, {
      props: {
        player: {
          color: 'BLUE',
          finished: false,
          id: 'asdf',
          index: 1,
          name: 'Alice',
          counterMessage: 0,
          isOffline: false,
          ranking: 1,
          isOnline: true,
          isMuted: false,
        },
        startTimer: false,
        position: 'LEFT',
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.game-profile-image').exists()).toBe(true);
    expect(wrapper.find('.game-profile-image-offline').exists()).toBe(false);
    expect(wrapper.findComponent(PlayerAvatar).exists()).toBe(true);
    expect(wrapper.find('button.game-profile-mute-chat').exists()).toBe(true);
    expect(wrapper.find('button .icon-chat').exists()).toBe(true);
    expect(wrapper.find('.game-profile-image-progress').exists()).toBe(false);
  });

  test('show left message', () => {
    const wrapper = mount(ProfileImage, {
      props: {
        player: {
          color: 'BLUE',
          finished: false,
          id: 'asdf',
          index: 1,
          name: 'Alice',
          counterMessage: 0,
          isOffline: true,
          ranking: 1,
          isOnline: true,
        },
        startTimer: false,
        position: 'LEFT',
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.game-profile-image-offline').exists()).toBe(true);
    expect(wrapper.find('.game-profile-image').exists()).toBe(true);
    expect(wrapper.findComponent(PlayerAvatar).exists()).toBe(true);
    expect(wrapper.find('button.game-profile-mute-chat').exists()).toBe(false);
    expect(wrapper.find('.game-profile-image-progress').exists()).toBe(false);
  });

  test('show timer', () => {
    const wrapper = mount(ProfileImage, {
      props: {
        player: {
          color: 'BLUE',
          finished: false,
          id: 'asdf',
          index: 1,
          name: 'Alice',
          counterMessage: 0,
          isOffline: false,
          ranking: 1,
          isOnline: true,
        },
        startTimer: true,
        position: 'LEFT',
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.game-profile-image-progress').exists()).toBe(true);
  });

  test('mute button', () => {
    const wrapper = mount(ProfileImage, {
      props: {
        player: {
          color: 'BLUE',
          finished: false,
          id: 'asdf',
          index: 1,
          name: 'Alice',
          counterMessage: 0,
          isOffline: false,
          ranking: 1,
          isOnline: true,
          isMuted: true,
        },
        startTimer: true,
        position: 'LEFT',
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('button.game-profile-mute-chat').classes()).toContain('mute');
  });
});
