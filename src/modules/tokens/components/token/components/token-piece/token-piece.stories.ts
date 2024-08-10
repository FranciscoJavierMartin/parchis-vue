import type { Meta, StoryObj } from '@storybook/vue3';
import TokenPiece from '@tokens/components/token/components/token-piece/token-piece.vue';
import { EColors } from '@board/interfaces/board.enum';

const meta: Meta<typeof TokenPiece> = {
  title: 'Tokens/TokenPiece',
  component: TokenPiece,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: Object.values(EColors) },
  },
  args: {
    color: EColors.RED,
    style: {
      // For display purpose
      margin: '2rem',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BlueToken: Story = {
  args: {
    color: EColors.BLUE,
  },
};

export const GreenToken: Story = {
  args: {
    color: EColors.GREEN,
  },
};

export const RedToken: Story = {
  args: {
    color: EColors.RED,
  },
};

export const YellowToken: Story = {
  args: {
    color: EColors.YELLOW,
  },
};
