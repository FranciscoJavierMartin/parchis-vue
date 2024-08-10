import type { Meta, StoryObj } from '@storybook/vue3';
import PlayerAvatar from '@common/components/player-avatar/player-avatar.vue';

const meta: Meta<typeof PlayerAvatar> = {
  title: 'Common/PlayerAvatar',
  component: PlayerAvatar,
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

export const Default: Story = {
  args: {
    name: 'Player default',
  },
};

export const PlayerWithPhoto: Story = {
  args: {
    name: 'Player with photo',
    photo: '../../../../assets/images/bot.png',
  },
};
