import { nextTick, onMounted, ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import MenuOptionsModal from '@options/components/menu-options-modal/menu-options-modal.vue';
import AppWrapper from '@layouts/components/wrapper/app-wrapper/app-wrapper.vue';

const meta: Meta<typeof MenuOptionsModal> = {
  title: 'Options/MenuOptionsModal',
  component: MenuOptionsModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (args: object): object => ({
      components: { AppWrapper },
      setup(): object {
        const isOpen = ref<boolean>(false);

        onMounted(() => {
          nextTick();
          isOpen.value = true;
        });

        return { args, isOpen };
      },
      template: `
        <app-wrapper>
          <div id="screen" />
          <div style="margin: 1rem">
            <story v-if="isOpen" />
          </div>
        </app-wrapper>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
