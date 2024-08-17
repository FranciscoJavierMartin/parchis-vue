import { nextTick, onMounted, ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseModal from '@layouts/components/base-modal/base-modal.vue';

const meta: Meta<typeof BaseModal> = {
  title: 'Layouts/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    showModal: true,
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
            <story>
              <h1 style="color: red;">Base modal</h1>
            </story>
          </div>
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
