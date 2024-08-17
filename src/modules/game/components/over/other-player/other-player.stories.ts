import type { Meta, StoryObj } from '@storybook/vue3';
import OtherPlayer from '@game/components/over/other-player/other-player.vue';

const meta: Meta<typeof OtherPlayer> = {
  title: 'Game/OtherPlayer',
  component: OtherPlayer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    player: {
      id: '7e37-4ff7-fcd8-1dfe-0ad9',
      name: 'Bob',
      isBot: true,
      photo: '/parchis-vue/src/assets/images/bot.png',
      index: 2,
      color: 'GREEN',
      finished: true,
      isOffline: false,
      isMuted: false,
      chatMessage: '',
      counterMessage: 0,
      ranking: 2,
    },
  },
  decorators: [
    (): any => ({
      template: `
      <div style="margin: 1rem">
        <story/>
      </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SecondPosition: Story = {
  args: {
    player: {
      id: '7e37-4ff7-fcd8-1dfe-0ad9',
      name: 'Bob',
      isBot: true,
      photo: '/parchis-vue/src/assets/images/bot.png',
      index: 2,
      color: 'GREEN',
      finished: true,
      isOffline: false,
      isMuted: false,
      chatMessage: '',
      counterMessage: 0,
      ranking: 2,
    },
  },
};

export const ThirdPosition: Story = {
  args: {
    player: {
      id: '7e37-4ff7-fcd8-1dfe-0ad9',
      name: 'Bob',
      isBot: true,
      photo: '/parchis-vue/src/assets/images/bot.png',
      index: 2,
      color: 'GREEN',
      finished: true,
      isOffline: false,
      isMuted: false,
      chatMessage: '',
      counterMessage: 0,
      ranking: 3,
    },
  },
};

export const FourthPosition: Story = {
  args: {
    player: {
      id: '7e37-4ff7-fcd8-1dfe-0ad9',
      name: 'Bob',
      isBot: true,
      photo: '/parchis-vue/src/assets/images/bot.png',
      index: 2,
      color: 'GREEN',
      finished: true,
      isOffline: false,
      isMuted: false,
      chatMessage: '',
      counterMessage: 0,
      ranking: 4,
    },
  },
};
