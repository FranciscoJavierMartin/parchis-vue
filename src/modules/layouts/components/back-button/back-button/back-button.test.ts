import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BackButton from './back-button.vue';
import i18n from '@/i18n';
import router from '@/router';
import { ROUTES } from '@/router/routes';

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

  test('renders with link', () => {
    const wrapper = mount(BackButton, {
      props: {
        withConfirmation: false,
      },
      global: {
        plugins: [i18n, router],
      },
    });

    const link = wrapper.findComponent('.game-back-button') as any;
    expect(link.props().to).toEqual({ name: ROUTES.HOME.name });
    expect(link.find('.icon-back').exists()).toBe(true);
  });
});
