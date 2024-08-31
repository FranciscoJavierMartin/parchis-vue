import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import TotalTokens from '@tokens/components/token/total-tokens/total-tokens.vue';
import ShowTotalTokens from './show-total-tokens.vue';

describe('show-total-tokens.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(ShowTotalTokens, {
      props: {
        totalTokens: {
          0: 1,
          2: 3,
        },
      },
    });

    expect(wrapper.findAllComponents(TotalTokens)).toHaveLength(2);
  });
});
