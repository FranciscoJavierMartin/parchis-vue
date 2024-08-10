import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import MenuOption from '@options/components/menu-option/menu-option.vue';

const meta: Meta<typeof MenuOption> = {
  title: 'Options/MenuOption',
  component: MenuOption,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    icon: 'sound',
    label: 'Sound',
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        const isActivated = ref<boolean>(true);

        return { args, isActivated };
      },
      template: `
        <div style="margin: 1rem">
          <story v-model="isActivated"/>
          <span style="color: blue; font-size: 20px;" >{{ isActivated.valueOf() }}</span>
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
