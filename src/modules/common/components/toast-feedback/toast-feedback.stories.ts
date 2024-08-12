import { nextTick, onMounted, ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import ToastFeedback from '@common/components/toast-feedback/toast-feedback.vue';

const meta: Meta<typeof ToastFeedback> = {
  title: 'Common/ToastFeedback',
  component: ToastFeedback,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  decorators: [
    (args: object): object => ({
      setup(): object {
        const isOpen = ref<boolean>(false);

        onMounted(() => {
          nextTick();
          isOpen.value = true;
        });

        return { args, isOpen };
      },
      template: `
        <div>
          <div style="margin: 1rem; height: 100%; width: 100%;">
            <story v-if="isOpen" />
          </div>
          <div id="toast-container" />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Hello world',
  },
};
