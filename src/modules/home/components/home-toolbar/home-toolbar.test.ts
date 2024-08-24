import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import router from '@/router';
import i18n from '@/i18n';
import { ToastAddToastSymbol } from '@toast/constants/toast.constants';
import { ROUTES } from '@/router/routes';
import HomeToolbar from './home-toolbar.vue';

describe('home-toolbar.vue', () => {
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
    const wrapper = mount(HomeToolbar, {
      props: {
        isAuth: true,
      },
      global: {
        plugins: [router, i18n],
        provide: {
          [ToastAddToastSymbol]: vi.fn(),
        },
      },
    });

    expect(wrapper.find('.home-toolbar').exists()).toBe(true);

    const link = wrapper.findComponent('.button.blue') as any;
    expect(link.props().to).toEqual({ name: ROUTES.ABOUT.name });
    expect(link.find('.icon-info').exists()).toBe(true);

    expect(wrapper.find('.button.blue[title="Share"]').exists()).toBe(true);
    expect(wrapper.find('.button.blue[title="Share"] .icon-share').exists()).toBe(true);

    expect(wrapper.find('.button.blue[title="Logout"]').exists()).toBe(true);
    expect(wrapper.find('.button.blue[title="Logout"] .icon-logout').exists()).toBe(true);
  });
});
