import type { Meta, StoryObj } from '@storybook/vue3';
import ProfileRanking from '@profiles/components/profile-ranking/profile-ranking.vue';

const meta: Meta<typeof ProfileRanking> = {
  title: 'Profiles/ProfileRanking',
  component: ProfileRanking,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    value: { control: 'select', options: [1, 2, 3, 4] },
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        return { args };
      },
      template: `
        <div style="margin: 1rem;">
          <story />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPosition: Story = {
  args: {
    value: 1,
  },
};

export const SecondPosition: Story = {
  args: {
    value: 2,
  },
};

export const ThirdPosition: Story = {
  args: {
    value: 3,
  },
};

export const FourthPosition: Story = {
  args: {
    value: 4,
  },
};
