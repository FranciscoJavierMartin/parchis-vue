import type { Meta, StoryObj } from '@storybook/vue3';
import ProfilePlayer from '@profiles/components/profile-player/profile-player.vue';
import { EPositionProfile } from '@board/interfaces/board.enum';
import { getInitialActionsTurnValue } from '@game/helpers/game.helper';

const meta: Meta<typeof ProfilePlayer> = {
  title: 'Profiles/ProfilePlayer',
  component: ProfilePlayer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: { control: 'select', options: Object.values(EPositionProfile) },
  },
  args: {
    player: {
      id: '7e37-4ff7-fcd8-1dfe-0ad9',
      name: 'Bob',
      isBot: true,
      photo: '/parchis-vue/src/assets/images/bot.png',
      index: 1,
      color: 'GREEN',
      finished: false,
      isOffline: false,
      isMuted: false,
      chatMessage: '',
      counterMessage: 0,
      ranking: 1,
    },
    hasTurn: false,
    basePosition: 'TOP',
    position: 'LEFT',
    actionsTurn: getInitialActionsTurnValue(1, [
      {
        id: '7e37-4ff7-fcd8-1dfe-0ad1',
        name: 'Alice',
        isBot: true,
        photo: '/parchis-vue/src/assets/images/bot.png',
        index: 1,
        color: 'GREEN',
        finished: false,
        isOffline: false,
        isMuted: false,
        chatMessage: '',
        counterMessage: 0,
        ranking: 1,
      },
      {
        id: '7e37-4ff7-fcd8-1dfe-0ad9',
        name: 'Bob',
        isBot: true,
        photo: '/parchis-vue/src/assets/images/bot.png',
        index: 2,
        color: 'BLUE',
        finished: false,
        isOffline: false,
        isMuted: false,
        chatMessage: '',
        counterMessage: 0,
        ranking: 2,
      },
    ]),
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

export const TopLeft: Story = {
  args: {
    position: 'LEFT',
    basePosition: 'TOP',
  },
};

export const TopRight: Story = {
  args: {
    position: 'RIGHT',
    basePosition: 'TOP',
  },
};

export const BottomLeft: Story = {
  args: {
    position: 'LEFT',
    basePosition: 'BOTTOM',
  },
};

export const BottomRight: Story = {
  args: {
    position: 'RIGHT',
    basePosition: 'BOTTOM',
  },
};

export const HasTurn: Story = {
  args: {
    hasTurn: true,
  },
};
