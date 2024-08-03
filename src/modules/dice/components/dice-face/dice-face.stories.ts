import type { Meta, StoryObj } from '@storybook/vue3';
import DiceFace from '@dice/components/dice-face/dice-face.vue';

const meta: Meta<typeof DiceFace> = {
  title: 'Dice/DiceFace',
  component: DiceFace,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    size: 100,
    animate: false,
    shadow: false,
  },
  decorators: [
    (): any => ({
      template: `
      <div style="margin: 1rem">
        <story/>
      </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Face1: Story = {
  args: {
    value: 1,
  },
};

export const Face2: Story = {
  args: {
    value: 2,
  },
};

export const Face3: Story = {
  args: {
    value: 3,
  },
};

export const Face4: Story = {
  args: {
    value: 4,
  },
};

export const Face5: Story = {
  args: {
    value: 5,
  },
};

export const Face6: Story = {
  args: {
    value: 6,
  },
};
