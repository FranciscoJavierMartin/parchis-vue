import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GameBoard from './game-board.vue';
import { EBoardColors } from '../../interfaces/board.enum';

describe('game-board.vue', () => {
  test('renders blue corner', () => {
    const wrapper = mount(GameBoard, {
      props: {
        boardColor: EBoardColors.BRGY,
      },
    });

    expect(wrapper.find('.game-board.BRGY')).toBeDefined();
  });

  test('renders green corner', () => {
    const wrapper = mount(GameBoard, {
      props: {
        boardColor: EBoardColors.GYBR,
      },
    });

    expect(wrapper.find('.game-board.GYBR')).toBeDefined();
  });

  test('renders red corner', () => {
    const wrapper = mount(GameBoard, {
      props: {
        boardColor: EBoardColors.RGYB,
      },
    });

    expect(wrapper.find('.game-board.RGYB')).toBeDefined();
  });

  test('renders yellow corner', () => {
    const wrapper = mount(GameBoard, {
      props: {
        boardColor: EBoardColors.YBRG,
      },
    });

    expect(wrapper.find('.game-board.YBRG')).toBeDefined();
  });
});
