import type { Meta, StoryObj } from '@storybook/vue3';
import Game from '@game/components/game/game.vue';
import { EBoardColors } from '@board/interfaces/board.enum';
import AppWrapper from '@layouts/components/wrapper/app-wrapper.vue';

const meta: Meta<typeof Game> = {
  title: 'Game/Game',
  component: Game,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  decorators: [
    (): any => ({
      components: { AppWrapper },
      template: `
      <app-wrapper>
        <div style="margin: 1rem">
          <story/>
        </div>
      </app-wrapper>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPlayers: 2,
    boardColor: EBoardColors.RGYB,
    debug: false,
    initialTurn: 1,
    typeGame: 'OFFLINE',
    users: [
      {
        id: 'f181-1a48-0224-2f26-3c79',
        name: 'Player 01',
        isBot: true,
        photo: '/parchis-vue/src/assets/images/bot.png',
      },
      {
        id: '7e37-4ff7-fcd8-1dfe-0ad9',
        name: 'Player 0',
        isBot: true,
        photo: '/parchis-vue/src/assets/images/bot.png',
      },
    ],
  },
};
