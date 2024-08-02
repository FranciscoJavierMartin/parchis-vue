import type { Meta, StoryObj } from '@storybook/vue3';
import { EBoardColors } from '@/modules/board/interfaces/board.enum';
import GameBoard from '@board/components/game-board/game-board.vue';

const meta: Meta<typeof GameBoard> = {
  title: 'Board/GameBoard',
  component: GameBoard,
  tags: ['autodocs'],
  argTypes: {
    boardColor: { control: 'select', options: Object.values(EBoardColors) },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BluePlayerBoard: Story = {
  args: {
    boardColor: EBoardColors.BRGY,
  },
};

export const GreenPlayerBoard: Story = {
  args: {
    boardColor: EBoardColors.GYBR,
  },
};

export const RedPlayerBoard: Story = {
  args: {
    boardColor: EBoardColors.RGYB,
  },
};

export const YellowPlayerBoard: Story = {
  args: {
    boardColor: EBoardColors.YBRG,
  },
};
