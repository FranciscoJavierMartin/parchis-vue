import { nextTick, onMounted, ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import ShareModal from '@share/components/share-modal/share-modal.vue';

const meta: Meta<typeof ShareModal> = {
  title: 'Share/ShareModal',
  component: ShareModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    data: {
      title: 'Parchis',
      text: "Let's play Parchis",
      url: window.location.href,
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
          <div style="margin: 1rem; background-color: white;">
            <story v-if="isOpen"/>
          </div>
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
