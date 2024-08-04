import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import SelectTokenColor from '@players/components/select-token-color/select-token-color.vue';
import type { TColors } from '@board/interfaces/board.interface';

const meta: Meta<typeof SelectTokenColor> = {
  title: 'Players/SelectTokenColor',
  component: SelectTokenColor,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    disabled: false,
    modelValue: 'RED',
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        const tokenColor = ref<TColors>('RED');

        return { args, tokenColor };
      },
      template: `
        <div style="margin: 3rem;">
          <story v-model="tokenColor" />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const TokenRed: Story = {
  args: {
    modelValue: 'RED',
  },
};

export const TokenBlue: Story = {
  args: {
    modelValue: 'BLUE',
  },
};

export const TokenGreen: Story = {
  args: {
    modelValue: 'GREEN',
  },
};

export const TokenYellow: Story = {
  args: {
    modelValue: 'YELLOW',
  },
};
