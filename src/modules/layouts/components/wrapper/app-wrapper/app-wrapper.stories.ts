import type { Meta, StoryObj } from '@storybook/vue3';
import AppWrapper from '@layouts/components/wrapper/app-wrapper/app-wrapper.vue';

const meta: Meta<typeof AppWrapper> = {
  title: 'Layouts/AppWrapper',
  component: AppWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
