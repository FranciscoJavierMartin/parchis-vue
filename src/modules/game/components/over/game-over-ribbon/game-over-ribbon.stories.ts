import type { Meta, StoryObj } from '@storybook/vue3';
import GameOverRibbon from '@game/components/over/game-over-ribbon/game-over-ribbon.vue';

const meta: Meta<typeof GameOverRibbon> = {
  title: 'Game/GameOverRibbon',
  component: GameOverRibbon,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Well played',
  },
  decorators: [
    (): any => ({
      template: `
      <div style="margin: 2rem 2.5rem">
        <story/>
      </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
