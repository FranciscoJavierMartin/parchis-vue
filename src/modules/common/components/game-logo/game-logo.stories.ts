import type { Meta, StoryObj } from '@storybook/vue3';
import GameLogo from '@common/components/game-logo/game-logo.vue';

const meta: Meta<typeof GameLogo> = {
  title: 'Common/GameLogo',
  component: GameLogo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (): any => ({
      components: { GameLogo },
      template: `
        <div style="margin-top: 5rem">
          <GameLogo/>
        </div>
      `,
    }),
  ],
};
