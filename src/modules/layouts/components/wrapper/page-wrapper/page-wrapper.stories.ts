import type { Meta, StoryObj } from '@storybook/vue3';
import PageWrapper from '@layouts/components/wrapper/page-wrapper/page-wrapper.vue';

const meta: Meta<typeof PageWrapper> = {
  title: 'Layouts/PageWrapper',
  component: PageWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
