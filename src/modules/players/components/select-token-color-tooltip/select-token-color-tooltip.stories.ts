import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import SelectTokenColorTooltip from '@players/components/select-token-color-tooltip/select-token-color-tooltip.vue';
import type { TColors } from '@board/interfaces/board.interface';

const meta: Meta<typeof SelectTokenColorTooltip> = {
  title: 'Players/SelectTokenColorTooltip',
  component: SelectTokenColorTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    modelValue: 'RED',
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        const tokenColor = ref<TColors>('RED');

        return { args, tokenColor };
      },
      template: `
        <div style="transform: translate(50px, 50px)">
          <story v-model="tokenColor" />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TokenRedSelected: Story = {
  args: {
    modelValue: 'RED',
  },
};

export const TokenBlueSelected: Story = {
  args: {
    modelValue: 'BLUE',
  },
};

export const TokenYellowSelected: Story = {
  args: {
    modelValue: 'YELLOW',
  },
};

export const TokenGreenSelected: Story = {
  args: {
    modelValue: 'GREEN',
  },
};
