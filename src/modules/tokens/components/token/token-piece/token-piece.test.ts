import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { EColors } from '@board/interfaces/board.enum';
import type { TColors } from '@board/interfaces/board.interface';
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

  test.for(Object.keys(EColors) as TColors[])('renders %s token', (color: TColors) => {
    const wrapper = mount(TokenPiece, {
      props: {
        color,
      },
    });

    expect(wrapper.find('.game-token-piece').classes()).toContain(color.toLowerCase());
  });
});
