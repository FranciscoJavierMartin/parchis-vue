import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import InputSwitch from './input-switch.vue';

describe('input-switch.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(InputSwitch, {
      props: {
        id: 'abcd',
      },
      global: {
        plugins: [i18n],
      },
    });

    const label = wrapper.find('.input-switch');

    expect(label.exists()).toBe(true);
    expect(label.attributes()['for']).toBe('abcd');
    expect(label.attributes()['aria-label']).toBe('Player is bot');

    const input = wrapper.find('#abcd');

    expect(input.exists()).toBe(true);
    expect(input.attributes()['disabled']).toBeFalsy();

    const slider = wrapper.find('.slider');

    expect(slider.exists()).toBe(true);

    expect(wrapper.find('.slider-icon').exists()).toBe(false);
  });
});
