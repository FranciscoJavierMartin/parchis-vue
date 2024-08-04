import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BotSwitch from '@players/components/bot-switch/bot-switch.vue';

const meta: Meta<typeof BotSwitch> = {
  title: 'Players/BotSwitch',
  component: BotSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    id: '1234abcd',
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        const value = ref<boolean>(false);

        return { args, value };
      },
      template: `
        <div style="margin: 1rem; display: flex; flex-direction: column; gap: 10px;">
          <story v-model="value" />
          <span style="color: blue; font-size: 20px;">{{ value.valueOf() }}</span>
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
