import type { Meta, StoryObj } from '@storybook/vue3';
import TotalTokens from '@tokens/components/token/components/total-tokens/total-tokens.vue';

const meta: Meta<typeof TotalTokens> = {
  title: 'Tokens/TotalTokens',
  component: TotalTokens,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    indexPosition: 40,
    value: 3,
  },
};
