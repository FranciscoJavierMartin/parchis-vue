import type { Meta, StoryObj } from '@storybook/vue3';
import HomeOptions from '@home/components/home-options/home-options.vue';

const meta: Meta<typeof HomeOptions> = {
  title: 'Home/HomeOptions',
  component: HomeOptions,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (): any => ({
      template: `
      <div style="margin: 1rem">
        <story/>
      </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithServiceError: Story = {
  args: {
    serviceError: true,
  },
};
