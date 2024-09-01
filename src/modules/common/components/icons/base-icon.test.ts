import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseIcon from './base-icon.vue';

describe('base-icon.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        type: 'info',
        fill: 'red',
      },
    });

    expect(wrapper.find('.icon-wrapper.icon-info').exists()).toBe(true);
    expect(wrapper.find('path').attributes()['fill']).toBe('red');
    expect(wrapper.find('line').exists()).toBe(false);
  });

  test('renders another icon', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        type: 'arrow',
        fill: 'red',
      },
    });

    expect(wrapper.find('.icon-wrapper.icon-arrow').exists()).toBe(true);
  });

  test('renders muted icon', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        type: 'info',
        fill: 'red',
        isMuted: true,
      },
    });

    expect(wrapper.find('.icon-wrapper.icon-info').exists()).toBe(true);
    expect(wrapper.find('path').attributes()['fill']).toBe('red');
    expect(wrapper.find('line').exists()).toBe(true);
    expect(wrapper.find('line').attributes()['stroke']).toBe('white');
  });
});
