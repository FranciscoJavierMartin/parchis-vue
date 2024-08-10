import type { Meta, StoryObj } from '@storybook/vue3';
import ShareButton from '@share/components/share-button/share-button.vue';

const meta: Meta<typeof ShareButton> = {
  title: 'Share/ShareButton',
  component: ShareButton,
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
      // TODO: Add slots
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

export const NativeOption: Story = {
  args: {
    useNativeOption: true,
  },
};

export const NonNativeOption: Story = {
  args: {
    useNativeOption: false,
  },
};
