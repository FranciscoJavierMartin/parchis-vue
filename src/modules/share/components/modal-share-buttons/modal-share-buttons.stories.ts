import type { Meta, StoryObj } from '@storybook/vue3';
import ModalShareButtons from '@share/components/modal-share-buttons/modal-share-buttons.vue';

const meta: Meta<typeof ModalShareButtons> = {
  title: 'Share/ModalShareButtons',
  component: ModalShareButtons,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    data: {
      title: 'Parchis',
      text: "Let's play Parchis",
      url: window.location.href,
    },
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
