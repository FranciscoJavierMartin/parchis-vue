import type { Meta, StoryObj } from '@storybook/vue3';
import AboutView from '@about/views/about-view.vue';
import AppWrapper from '@layouts/components/wrapper/app-wrapper/app-wrapper.vue';

const meta: Meta<typeof AboutView> = {
  title: 'Pages/About',
  component: AboutView,
  render: () => ({
    components: { AboutView, AppWrapper },
    template: `
      <app-wrapper>
        <about-view />
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

export const AboutPage: Story = {};
