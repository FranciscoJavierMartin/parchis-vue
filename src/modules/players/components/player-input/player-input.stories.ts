import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import PlayerInput from '@players/components/player-input/player-input.vue';
import { EColors } from '@/modules/board/interfaces/board.enum';
import type { TColors } from '@/modules/board/interfaces/board.interface';

const meta: Meta<typeof PlayerInput> = {
  title: 'Players/PlayerInput',
  component: PlayerInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    disabled: false,
    id: 'player-input-id-custom',
    index: 2,
    isOnline: false,
    name: '',
    color: EColors.RED,
    isBot: false,
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        const color = ref<TColors>(EColors.RED);
        const name = ref<string>('');
        const isBot = ref<boolean>(false);

        function handleColorDistribution(newColor: TColors, index: number): void {
          console.log(newColor);
          color.value = newColor;
          (args as any).color = newColor;
        }

        return { args, color, name, isBot, handleColorDistribution };
      },
      template: `
        <div style="margin: 3rem">
          <story 
            v-model:color="color"
            v-model:name="name" 
            v-model:is-bot="isBot" 
            v-bind="args" 
            @update:color="(color) => handleColorDistribution(color, args.index)"
            />
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
