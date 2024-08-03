import type { Meta, StoryObj } from '@storybook/vue3';
import DebugSelect from '@debug/components/debug-select/debug-select.vue';

const meta: Meta<typeof DebugSelect> = {
  title: 'Debug/DebugSelect',
  component: DebugSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Title',
    options: [
      { id: 1, label: 'Option 1' },
      { id: 2, label: 'Option 2' },
      { id: 3, label: 'Option 3' },
    ],
    disabled: false,
    modelValue: 1,
    'onUpdate:modelValue': (e): void => {
      console.log(e);
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
