import type { Meta, StoryObj } from '@storybook/vue3';
import HomeView from '@home/views/home-view.vue';
import AppWrapper from '@layouts/components/wrapper/app-wrapper.vue';

const meta: Meta<typeof HomeView> = {
  title: 'Pages/Home',
  component: HomeView,
  render: () => ({
    components: { HomeView, AppWrapper },
    template: `
      <app-wrapper>
        <home-view />
      </app-wrapper>
      `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const HomePage: Story = {};
