import type { Meta, StoryObj } from '@storybook/vue3';
import ProfileDice from '@profiles/components/profile-dice/profile-dice.vue';
import type { TDiceValues } from '@/modules/dice/interfaces/dice.interface';
import { ref } from 'vue';

const meta: Meta<typeof ProfileDice> = {
  title: 'Profiles/ProfileDice',
  component: ProfileDice,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    disabledDice: false,
    diceRollNumber: 1,
    value: 3,
    showDice: true,
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        const diceValue = ref<TDiceValues>(3);

        function onHandleDoneDice(): void {
          console.log('Handle done dice');
        }

        function onHandleSelectDice(diceVal?: TDiceValues): void {
          if (diceVal) {
            diceValue.value = diceVal;
          } else {
            diceValue.value = 4;
          }
        }

        return { args, diceValue, onHandleDoneDice, onHandleSelectDice };
      },
      template: `
        <div style="margin-top: 3.5rem;">
          <story 
            v-bind="args"
            :value="diceValue"
            @handle-done-dice="onHandleDoneDice"
            @handle-select-dice="onHandleSelectDice"
            />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DisabledDice: Story = {
  args: {
    disabledDice: true,
  },
};

export const HideDice: Story = {
  args: {
    showDice: false,
  },
};
