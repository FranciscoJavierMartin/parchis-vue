import type { Meta, StoryObj } from '@storybook/vue3';
import OnlineView from '@online/views/online-view.vue';
import AppWrapper from '@layouts/components/wrapper/app-wrapper/app-wrapper.vue';

const meta: Meta<typeof OnlineView> = {
  title: 'Pages/Online',
  component: OnlineView,
  render: () => ({
    components: { OnlineView, AppWrapper },
    template: `
      <app-wrapper>
        <online-view />
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

export const OnlinePage: Story = {};
