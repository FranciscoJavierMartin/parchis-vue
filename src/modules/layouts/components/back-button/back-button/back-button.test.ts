import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BackButton from './back-button.vue';
import i18n from '@/i18n';
import router from '@/router';

describe('back-button.vue', () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'screen';
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('renders with button', () => {
    const wrapper = mount(BackButton, {
      global: {
        plugins: [i18n, router],
      },
    });

    expect(wrapper.find('button.game-back-button').exists()).toBe(true);
    expect(wrapper.find('button.game-back-button .icon-back').exists()).toBe(true);
  });
});
