import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DropDown from './drop-down.vue';

describe('drop-down.vue', () => {
  test('renders without options', () => {
    const wrapper = mount(DropDown, {
      props: {
        options: [],
      },
    });

    expect(wrapper.find('.items').exists()).toBe(false);
  });
});
