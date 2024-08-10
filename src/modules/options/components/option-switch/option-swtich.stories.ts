import { nextTick, onMounted, ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import OptionSwitch from '@options/components/option-switch/option-switch.vue';

const meta: Meta<typeof OptionSwitch> = {
  title: 'Options/OptionSwitch',
  component: OptionSwitch,
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
        const isOpen = ref<boolean>(false);
        const value = ref<boolean>(false);

        onMounted(() => {
          nextTick();
          isOpen.value = true;
        });

        return { args, isOpen, value };
      },
      template: `
        <div style="margin: 1rem; display: flex; flex-direction: column; gap: 10px;">
          <story v-if="isOpen" v-model="value" />
          <span style="color: blue; font-size: 20px;">{{ value.valueOf() }}</span>
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
