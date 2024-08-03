import type { Meta, StoryObj } from '@storybook/vue3';
import OfflineView from '@offline/views/offline-view.vue';
import AppWrapper from '@layouts/components/wrapper/app-wrapper/app-wrapper.vue';

const meta: Meta<typeof OfflineView> = {
  title: 'Pages/Offline',
  component: OfflineView,
  render: () => ({
    components: { OfflineView, AppWrapper },
    template: `
      <app-wrapper>
        <offline-view />
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

export const OfflinePage: Story = {};
