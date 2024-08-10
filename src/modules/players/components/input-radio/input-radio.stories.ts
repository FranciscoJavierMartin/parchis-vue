import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import InputRadio from '@players/components/input-radio/input-radio.vue';
import type { TTotalPlayers } from '@game/interfaces/game.interface';

const meta: Meta<typeof InputRadio> = {
  title: 'Players/InputRadio',
  component: InputRadio,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'InputRadioId',
    value: 2,
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        const value = ref<TTotalPlayers>(3);

        return { args, value };
      },
      template: `
        <div style="margin: 1rem; display: flex; flex-direction: column; gap: 10px;">
          <story v-model="value" />
          <span style="color: blue; font-size: 20px;">{{ value }}</span>
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
