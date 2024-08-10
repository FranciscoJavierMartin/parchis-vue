import type { Meta, StoryObj } from '@storybook/vue3';
import TokenTooltip from '@tokens/components/token/components/token-tooltip/token-tooltip.vue';
import { EColors } from '@/modules/board/interfaces/board.enum';

const meta: Meta<typeof TokenTooltip> = {
  title: 'Tokens/TokenTooltip',
  component: TokenTooltip,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: Object.values(EColors) },
  },
  args: {
    coordinate: { x: 0, y: 0 },
    diceAvailable: [
      { key: 1, value: 3 },
      { key: 2, value: 4 },
    ],
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

export const TwoDice: Story = {
  args: {
    diceAvailable: [
      { key: 1, value: 3 },
      { key: 2, value: 4 },
    ],
  },
};

export const ThreeDice: Story = {
  args: {
    diceAvailable: [
      { key: 1, value: 3 },
      { key: 2, value: 4 },
      { key: 3, value: 4 },
    ],
  },
};
