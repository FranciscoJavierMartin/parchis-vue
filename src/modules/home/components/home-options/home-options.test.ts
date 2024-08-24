import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeOptions from './home-options.vue';
import router from '@/router';
import i18n from '@/i18n';

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
});
