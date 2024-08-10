import type { Meta, StoryObj } from '@storybook/vue3';
import AppContainer from '@layouts/components/wrapper/app-container/app-container.vue';

const meta: Meta<typeof AppContainer> = {
  title: 'Layouts/AppContainer',
  component: AppContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
