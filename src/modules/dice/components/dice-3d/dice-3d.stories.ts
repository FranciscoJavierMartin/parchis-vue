import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Dice3d from '@dice/components/dice-3d/dice-3d.vue';

const meta: Meta<typeof Dice3d> = {
  title: 'Dice/Dice3d',
  component: Dice3d,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    size: 100,
  },
  render(args) {
    return {
      components: { Dice3d },
      setup(): any {
        const diceRef = ref<typeof Dice3d | null>(null);

        return {
          diceRef,
          args,
        };
      },
      template: `
        <div>
          <Dice3d ref="diceRef" :size="args.size" />
          <button @click="diceRef.value?.rollDice(4)">Roll dice</button>
        </div>
    `,
    };
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
