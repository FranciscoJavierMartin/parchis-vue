import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { EBoardColors } from '@board/interfaces/board.enum';
import GameBoard from './game-board.vue';

describe('game-board.vue', () => {
  test('renders blue corner', () => {
    const wrapper = mount(GameBoard, {
      props: {
        boardColor: EBoardColors.BRGY,
      },
    });

    expect(wrapper.find('.game-board.BRGY').exists()).toBe(true);
  });

  test('renders green corner', () => {
    const wrapper = mount(GameBoard, {
      props: {
        boardColor: EBoardColors.GYBR,
      },
    });

    expect(wrapper.find('.game-board.GYBR').exists()).toBe(true);
  });

  test('renders red corner', () => {
    const wrapper = mount(GameBoard, {
      props: {
        boardColor: EBoardColors.RGYB,
      },
    });

    expect(wrapper.find('.game-board.RGYB').exists()).toBe(true);
  });

  test('renders yellow corner', () => {
    const wrapper = mount(GameBoard, {
      props: {
        boardColor: EBoardColors.YBRG,
      },
    });

    expect(wrapper.find('.game-board.YBRG').exists()).toBe(true);
  });
});
