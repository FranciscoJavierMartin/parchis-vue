import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import HomeAlert from './home-alert.vue';
import i18n from '@/i18n';

describe('home-alert.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(HomeAlert, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.home-alert').exists()).toBe(true);
    expect(wrapper.find('.icon-info').exists()).toBe(true);
    expect(wrapper.find('.icon-info svg path').attributes()['fill']).toBe('#856404');
    expect(wrapper.find('.home-alert span').text()).toContain('Something went wrong connecting');
  });
});
