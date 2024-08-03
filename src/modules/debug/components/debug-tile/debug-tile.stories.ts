import type { Meta, StoryObj } from '@storybook/vue3';
import DebugTile from '@debug/components/debug-tile/debug-tile.vue';

const meta: Meta<typeof DebugTile> = {
  title: 'Debug/DebugTile',
  component: DebugTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    coordinate: { x: 168, y: 211 },
    invertedColor: false,
  },
  decorators: [
    (): any => ({
      template: `
      <div>
        <story>
          1
        </story>
      </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
