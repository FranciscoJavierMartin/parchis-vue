import type { Meta, StoryObj } from '@storybook/vue3';
import FirstPosition from '@game/components/over/first-position/first-position.vue';

const meta: Meta<typeof FirstPosition> = {
  title: 'Game/FirstPosition',
  component: FirstPosition,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    first: {
      color: 'GREEN',
      finished: true,
      id: '123',
      index: 1,
      isOffline: true,
      name: 'Player 01',
      ranking: 1,
      isBot: false,
      counterMessage: 1,
    },
  },
  decorators: [
    (): any => ({
      template: `
        <div style="margin: 1.5rem">
          <story/>
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
