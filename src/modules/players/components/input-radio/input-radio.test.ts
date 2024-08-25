import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import InputRadio from './input-radio.vue';

describe('input-radio.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(InputRadio, {
      props: {
        label: '2P',
        value: 2,
      },
    });

    expect(wrapper.find('label.form-control').exists()).toBe(true);
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true);
  });
});
