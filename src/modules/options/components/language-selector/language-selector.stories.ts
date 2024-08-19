import type { Meta, StoryObj } from '@storybook/vue3';
import { useI18n } from 'vue-i18n';
import LanguageSelector from '@options/components/language-selector/language-selector.vue';

const meta: Meta<typeof LanguageSelector> = {
  title: 'Options/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  decorators: [
    (args: object): object => ({
      setup(): object {
        const { locale } = useI18n();

        return { args, locale };
      },
      template: `
        <div style="margin: 1rem">
          <h1>Locale: {{ locale }}</h1>
          <story />
        </div>
    `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
