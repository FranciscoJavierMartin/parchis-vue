import type { Meta, StoryObj } from '@storybook/vue3';
import LoadingIndicator from '@common/components/loading-indicator/loading-indicator.vue';

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Common/Loading Indicator',
  component: LoadingIndicator,
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
