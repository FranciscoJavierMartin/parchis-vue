import type { Meta, StoryObj } from '@storybook/vue3';
import BoardDebug from '@debug/components/board-debug/board-debug.vue';

const meta: Meta<typeof BoardDebug> = {
  title: 'Debug/BoardDebug',
  component: BoardDebug,
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
