import type { Meta, StoryObj } from '@storybook/vue3';
import HomeToolbar from '@home/components/home-toolbar/home-toolbar.vue';

const meta: Meta<typeof HomeToolbar> = {
  title: 'Home/HomeToolbar',
  component: HomeToolbar,
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

export const UserUnauthenticated: Story = {
  args: {
    isAuth: false,
  },
};

export const UserAuthenticated: Story = {
  args: {
    isAuth: true,
  },
};
