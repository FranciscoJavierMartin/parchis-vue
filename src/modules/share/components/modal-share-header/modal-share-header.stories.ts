import type { Meta, StoryObj } from '@storybook/vue3';
import ModalShareHeader from '@share/components/modal-share-header/modal-share-header.vue';

const meta: Meta<typeof ModalShareHeader> = {
  title: 'Share/ModalShareHeader',
  component: ModalShareHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'Add title',
  },
  decorators: [
    (args: object): object => ({
      setup(): object {
        return { args };
      },
      template: `
        <div style="margin: 1rem; background-color: white;">
          <story />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
