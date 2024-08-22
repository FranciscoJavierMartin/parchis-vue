import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import botImage from '@/assets/images/bot.png';
import PlayerAvatar from './player-avatar.vue';

describe('player-avatar.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(PlayerAvatar);

    const img = wrapper.find('img');
    // Trigger manually in test
    img.trigger('error');

    expect(img.exists()).toBe(true);
    expect(img.attributes()['src']).contains('assets/images/default.png');
    expect(img.attributes()['alt']).toBe('');
  });

  test('renders with alt', () => {
    const wrapper = mount(PlayerAvatar, {
      props: {
        name: 'John',
      },
    });

    const img = wrapper.find('img');
    // Trigger manually in test
    img.trigger('error');

    expect(img.exists()).toBe(true);
    expect(img.attributes()['src']).contains('assets/images/default.png');
    expect(img.attributes()['alt']).toBe('John');
  });
});
