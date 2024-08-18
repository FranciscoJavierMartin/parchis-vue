import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import DropDown from '@common/components/drop-down/drop-down.vue';

const meta: Meta<typeof DropDown> = {
  title: 'Common/DropDown',
  component: DropDown,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    options: [
      { value: '1', data: { text: 'Option 1' } },
      { value: '2', data: { text: 'Option 2' } },
      { value: '3', data: { text: 'Option 3' } },
      { value: '4', data: { text: 'Option 4' } },
    ],
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        const value = ref<string>('en');
        return { args, value };
      },
      template: `
        <div style="margin: 1rem; display: flex; flex-direction: column; gap: 10px;">
          <story v-model="value" >
            <template #selectedItem="{ item }">
              <span>{{ item?.data.text }}</span>
            </template>
            <template #option="{ item }">
              <span>{{ item.data.text }}</span>
            </template>
          </story>
          <span style="color: blue; font-size: 20px;">{{ value.valueOf() }}</span>
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
