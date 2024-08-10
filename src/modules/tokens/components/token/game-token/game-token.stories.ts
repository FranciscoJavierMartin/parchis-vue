import type { Meta, StoryObj } from '@storybook/vue3';
import GameToken from '@tokens/components/token/game-token/game-token.vue';
import { EColors } from '@board/interfaces/board.enum';

const meta: Meta<typeof GameToken> = {
  title: 'Tokens/GameToken',
  component: GameToken,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    animated: false,
    canSelectToken: false,
    color: 'RED',
    coordinate: { x: 0, y: 0 },
    debug: true,
    diceAvailable: [],
    diceList: [],
    enableTooltip: false,
    index: 0,
    isDisabledUI: false,
    isMoving: false,
    position: 1,
    positionTile: 0,
    totalTokens: 1,
    typeTile: 'JAIL',
  },
  argTypes: {
    color: { control: 'select', options: Object.values(EColors) },
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        return { args };
      },
      template: `
        <div style="margin: 3rem; transform: translateY(0px)">
          <story />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TokenRed: Story = {
  args: {
    color: 'RED',
  },
};

export const TokenBlue: Story = {
  args: {
    color: 'BLUE',
  },
};

export const TokenYellow: Story = {
  args: {
    color: 'YELLOW',
  },
};

export const TokenGreen: Story = {
  args: {
    color: 'GREEN',
  },
};

export const DisableDebug: Story = {
  args: {
    debug: false,
  },
};
