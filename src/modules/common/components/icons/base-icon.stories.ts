import type { Meta, StoryObj } from '@storybook/vue3';
import BaseIcon from '@common/components/icons/base-icon.vue';
import WinnerCrownIcon from '@common/components/icons/winner-crown.vue';
import { ICONS_DATA } from '@common/constants/icons.constants';

const meta: Meta<typeof BaseIcon> = {
  title: 'Common/Icons',
  component: BaseIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    type: 'info',
    fill: 'blue',
    isMuted: false,
  },
  argTypes: {
    type: { control: 'select', options: Object.keys(ICONS_DATA) },
  },
  decorators: [
    (): any => ({
      template: `
      <div style="height: 100px; width: 100px; padding: 1rem">
        <story/>
      </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WinnerCrown: Story = {
  render() {
    return {
      components: { WinnerCrownIcon },
      template: `
        <div>
          <winner-crown-icon/>
        </div>
      `,
    };
  },
};
