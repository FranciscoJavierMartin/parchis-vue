import type { Meta, StoryObj } from '@storybook/vue3';
import SetupPlayers from '@players/components/setup-players/setup-players.vue';

const meta: Meta<typeof SetupPlayers> = {
  title: 'Players/SetupPlayers',
  component: SetupPlayers,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
