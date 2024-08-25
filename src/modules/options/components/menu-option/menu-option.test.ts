import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import MenuOption from './menu-option.vue';

describe('menu-option.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(MenuOption, {
      props: {
        label: 'sound',
        icon: 'sound',
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.menu-option').exists()).toBe(true);
    expect(wrapper.find('.icon-sound').exists()).toBe(true);
    expect(wrapper.find('.menu-option-label').exists()).toBe(true);
    expect(wrapper.find('.menu-option-label').text()).toBe('sound');
    expect(wrapper.find('#menu-option-sound').exists()).toBe(true);
  });
});
