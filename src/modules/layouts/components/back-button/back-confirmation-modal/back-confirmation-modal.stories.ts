import { nextTick, onMounted, ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BackConfirmationModal from '@layouts/components/back-button/back-confirmation-modal/back-confirmation-modal.vue';

const meta: Meta<typeof BackConfirmationModal> = {
  title: 'Layouts/BackConfirmationModal',
  component: BackConfirmationModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onCancel(): void {
      console.log('Cancel button pressed');
    },
    onConfirmation(): void {
      console.log('Confirmation button pressed');
    },
  },
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
          <div id="screen" />
          <div style="margin: 1rem">
            <story v-if="isOpen" />
          </div>
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
