import type { Meta, StoryObj } from '@storybook/vue3';
import GameOverModal from '@game/components/over/game-over-modal/game-over-modal.vue';
import { nextTick, onMounted, ref } from 'vue';

const meta: Meta<typeof GameOverModal> = {
  title: 'Game/GameOverModal',
  component: GameOverModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    players: [
      {
        id: 'f181-1a48-0224-2f26-3c79',
        name: 'Alice',
        isBot: true,
        photo: '/parchis-vue/src/assets/images/bot.png',
        index: 0,
        color: 'RED',
        finished: true,
        isOffline: false,
        isMuted: false,
        chatMessage: '',
        counterMessage: 0,
        ranking: 4,
      },
      {
        id: '7e37-4ff7-fcd8-1dfe-0ad9',
        name: 'Bob',
        isBot: true,
        photo: '/parchis-vue/src/assets/images/bot.png',
        index: 1,
        color: 'GREEN',
        finished: true,
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
        finished: true,
        isOffline: false,
        isMuted: false,
        chatMessage: '',
        counterMessage: 0,
        ranking: 2,
      },
      {
        id: '9683-239c-8902-ebdf-432a',
        name: 'David',
        isBot: true,
        photo: '/parchis-vue/src/assets/images/bot.png',
        index: 3,
        color: 'BLUE',
        finished: true,
        isOffline: false,
        isMuted: false,
        chatMessage: '',
        counterMessage: 0,
        ranking: 3,
      },
    ],
  },
  render(args) {
    return {
      components: { GameOverModal },
      setup(): object {
        const isOpen = ref<boolean>(false);

        onMounted(() => {
          nextTick();
          isOpen.value = true;
        });

        return { args, isOpen };
      },
      template: `
        <div>
          <div id="screen" />
          <GameOverModal v-if="isOpen" :players="args.players" />
        </div>
      `,
    };
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
