import type { Meta, StoryObj } from '@storybook/vue3';
import ProfileWrapper from '@profiles/layouts/profile-wrapper/profile-wrapper.vue';

const meta: Meta<typeof ProfileWrapper> = {
  title: 'Profiles/ProfileWrapper',
  component: ProfileWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    currentTurn: 1,
    totalPlayers: 4,
    actionsTurn: {
      timerActivated: true,
      disabledDice: true,
      showDice: true,
      diceValue: 0,
      diceList: [],
      diceRollNumber: 0,
      isDisabledUI: false,
      actionsBoardGame: 'ROLL_DICE',
    },
    players: [
      {
        id: 'f181-1a48-0224-2f26-3c79',
        name: 'Alice',
        isBot: true,
        photo: '/parchis-vue/src/assets/images/bot.png',
        index: 0,
        color: 'RED',
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
        id: '1d75-1fc3-979c-a64b-6e6d',
        name: 'Carol',
        isBot: true,
        photo: '/parchis-vue/src/assets/images/bot.png',
        index: 2,
        color: 'YELLOW',
        finished: false,
        isOffline: false,
        isMuted: false,
        chatMessage: '',
        counterMessage: 0,
        ranking: 1,
      },
      {
        id: '9683-239c-8902-ebdf-432a',
        name: 'David',
        isBot: true,
        photo: '/parchis-vue/src/assets/images/bot.png',
        index: 3,
        color: 'BLUE',
        finished: false,
        isOffline: false,
        isMuted: false,
        chatMessage: '',
        counterMessage: 0,
        ranking: 1,
      },
    ],
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

export const TopRightPosition: Story = {
  args: {
    basePosition: 'TOP',
    position: 'RIGHT',
  },
};

export const TopLeftPosition: Story = {
  args: {
    basePosition: 'TOP',
    position: 'LEFT',
  },
};

export const BottomRightPosition: Story = {
  args: {
    basePosition: 'BOTTOM',
    position: 'RIGHT',
  },
};

export const BottomLeftPosition: Story = {
  args: {
    basePosition: 'BOTTOM',
    position: 'LEFT',
  },
};
