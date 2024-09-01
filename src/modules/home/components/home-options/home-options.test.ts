import { describe, expect, test } from 'vitest';
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils';
import router from '@/router';
import i18n from '@/i18n';
import { ROUTES } from '@/router/routes';
import HomeOptions from './home-options.vue';

describe('home-options.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(HomeOptions, {
      global: {
        plugins: [i18n, router],
      },
    });

    expect(wrapper.find('.home-options').exists()).toBe(true);
    expect(wrapper.find('.home-options .button.blue').exists()).toBe(true);
    expect(wrapper.find('.home-options .button.blue .icon-online').exists()).toBe(true);
    expect(wrapper.find('.home-options .button.blue').text()).toBe('Play online');

    expect(wrapper.find('.home-options .button.yellow').exists()).toBe(true);
    expect(wrapper.find('.home-options .button.yellow .icon-offline').exists()).toBe(true);
    expect(
      wrapper.find('.home-options .button.yellow .icon-offline svg path').attributes()['fill'],
    ).toBe('#8b5f00');

    expect(wrapper.find('.home-options .button.yellow').text()).toBe('Play offline');
  });

  test('skip play online', () => {
    const wrapper = mount(HomeOptions, {
      props: {
        serviceError: true,
      },
      global: {
        plugins: [i18n, router],
      },
    });

    expect(wrapper.find('.home-options').exists()).toBe(true);
    expect(wrapper.find('.home-options .button.blue').exists()).toBe(false);

    expect(wrapper.find('.home-options .button.yellow').exists()).toBe(true);
    expect(wrapper.find('.home-options .button.yellow').text()).toBe('Play offline');
  });

  test('navigate to online page', async () => {
    const wrapper = mount(HomeOptions, {
      global: {
        plugins: [i18n, router],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const link = wrapper.findComponent('.button.blue') as any;
    expect(link.props().to).toEqual({ name: ROUTES.ONLINE.name });
  });

  test('navigate to offline page', async () => {
    const wrapper = mount(HomeOptions, {
      global: {
        plugins: [i18n, router],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const link = wrapper.findComponent('.button.yellow') as any;
    expect(link.props().to).toEqual({ name: ROUTES.OFFLINE.name });
  });
});
