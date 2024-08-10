import type { Meta, StoryObj } from '@storybook/vue3';
import HomeAlert from '@home/components/home-alert/home-alert.vue';

const meta: Meta<typeof HomeAlert> = {
  title: 'Home/HomeAlert',
  component: HomeAlert,
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
