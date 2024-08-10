import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import InputName from '@players/components/input-name/input-name.vue';

const meta: Meta<typeof InputName> = {
  title: 'Players/InputName',
  component: InputName,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  decorators: [
    (args: object): object => ({
      setup(): object {
        const value = ref<string>('');

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

export const Enabled: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
