import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import TotalTokens from './total-tokens.vue';

describe('total-tokens.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(TotalTokens, {
      props: {
        indexPosition: 2,
        value: 4,
      },
    });

    const element = wrapper.find('.game-total-tokens');
    expect(element.exists()).toBe(true);
    expect(element.find('.game-total-tokens-value').exists()).toBe(true);
    expect(element.find('.game-total-tokens-value').text()).toBe('4');
    const { top, left } = getComputedStyle(wrapper.find('.game-total-tokens').element);

    expect(top).toBe('286px');
    expect(left).toBe('156px');
  });
});
