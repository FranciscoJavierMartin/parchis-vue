import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import TokenPiece from './token-piece.vue';

describe('token-piece.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(TokenPiece, {
      props: {
        color: 'BLUE',
      },
    });

    expect(wrapper.find('.game-token-piece').exists()).toBe(true);
    expect(wrapper.find('.game-token-piece span').exists()).toBe(false);
  });
});
