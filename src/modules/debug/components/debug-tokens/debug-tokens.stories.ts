import type { Meta, StoryObj } from '@storybook/vue3';
import DebugTokens from '@debug/components/debug-tokens/debug-tokens.vue';
import { getInitialActionsTurnValue } from '@game/helpers/game.helper';
import type { IPlayer } from '@players/interfaces/user.interface';
import type { IListTokens } from '@tokens/interfaces/token.interface';

const meta: Meta<typeof DebugTokens> = {
  title: 'Debug/DebugTokens',
  component: DebugTokens,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    actionsTurn: getInitialActionsTurnValue(1, [
      {
        isOnline: false,
        isBot: true,
      } as IPlayer,
      {
        isOnline: false,
        isBot: true,
      } as IPlayer,
    ]),
    listTokens: [],
    players: [],
    typeGame: 'OFFLINE',
    onUpdateTokens(listTokens: IListTokens[]) {
      console.log(listTokens);
    },
    onHandleSelectDice(data) {
      console.log(data);
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
