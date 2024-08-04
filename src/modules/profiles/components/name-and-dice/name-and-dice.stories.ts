import type { Meta, StoryObj } from '@storybook/vue3';
import NameAndDice from '@profiles/components/name-and-dice/name-and-dice.vue';

const meta: Meta<typeof NameAndDice> = {
  title: 'Profiles/NameAndDice',
  component: NameAndDice,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    diceAvailable: [],
    hasTurn: false,
    name: 'Player 1',
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        return { args };
      },
      template: `
        <div style="margin: 1rem;">
          <story />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDices: Story = {
  args: {
    name: 'Player 1',
    hasTurn: false,
    diceAvailable: [
      { key: 1, value: 5 },
      { key: 2, value: 3 },
    ],
  },
};

export const CurrentTurn: Story = {
  args: {
    name: 'Player 1',
    hasTurn: true,
    diceAvailable: [],
  },
};
