import type { Meta, StoryObj } from '@storybook/vue3';
import ProfileImage from '@profiles/components/profile-image/profile-image.vue';
import { EPositionProfile } from '@board/interfaces/board.enum';

const meta: Meta<typeof ProfileImage> = {
  title: 'Profiles/ProfileImage',
  component: ProfileImage,
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
    startTimer: false,
    position: 'LEFT',
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

export const WithTimer: Story = {
  args: {
    startTimer: true,
  },
};

export const PositionLeft: Story = {
  args: {
    position: 'LEFT',
  },
};

export const PositionRight: Story = {
  args: {
    position: 'RIGHT',
  },
};

export const OfflinePlayer: Story = {
  args: {
    player: {
      id: '7e37-4ff7-fcd8-1dfe-0ad9',
      name: 'Bob',
      isBot: true,
      photo: '/parchis-vue/src/assets/images/bot.png',
      index: 1,
      color: 'GREEN',
      finished: false,
      isOffline: true,
      isMuted: false,
      chatMessage: '',
      counterMessage: 0,
      ranking: 1,
    },
  },
};

export const MutedPlayer: Story = {
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
      isOnline: true,
      isMuted: true,
      chatMessage: '',
      counterMessage: 0,
      ranking: 1,
    },
  },
};

export const NonMutedPlayer: Story = {
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
      isOnline: true,
      isMuted: false,
      chatMessage: '',
      counterMessage: 0,
      ranking: 1,
    },
  },
};
