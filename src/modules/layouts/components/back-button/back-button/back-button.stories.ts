import { nextTick, onMounted, ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BackButton from '@layouts/components/back-button/back-button/back-button.vue';

const meta: Meta<typeof BackButton> = {
  title: 'Layouts/BackButton',
  component: BackButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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

export const WithoutConfirmation: Story = {
  args: {
    withConfirmation: false,
  },
};

export const WithConfirmation: Story = {
  args: {
    withConfirmation: true,
  },
};
