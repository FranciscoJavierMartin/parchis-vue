import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import SelectNumberPlayers from '@players/components/select-number-players/select-number-players.vue';
import type { TTotalPlayers } from '@game/interfaces/game.interface';

const meta: Meta<typeof SelectNumberPlayers> = {
  title: 'Players/SelectNumberPlayers',
  component: SelectNumberPlayers,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  decorators: [
    (args: object): object => ({
      setup(): object {
        const totalPlayers = ref<TTotalPlayers>(2);

        return { args, totalPlayers };
      },
      template: `
        <div style="margin: 1rem;">
          <story v-model="totalPlayers" />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
