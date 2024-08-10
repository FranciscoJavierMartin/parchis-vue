import type { Meta, StoryObj } from '@storybook/vue3';
import ShowTotalTokens from '@tokens/components/token/show-total-tokens/show-total-tokens.vue';

const meta: Meta<typeof ShowTotalTokens> = {
  title: 'Tokens/ShowTotalTokens',
  component: ShowTotalTokens,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    totalTokens: {},
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        return { args };
      },
      template: `
        <div style="margin: 1rem; transform: translateY(0px)">
          <story />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalTokens: {
      1: 1,
      10: 2,
    },
  },
};
