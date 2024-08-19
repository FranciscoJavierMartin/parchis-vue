import { setup, type Preview } from '@storybook/vue3';
import { createI18n } from 'vue-i18n';
import router from '@/router';
import en from '@/i18n/locales/en.json';
import es from '@/i18n/locales/es.json';

// configure i18n
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, es },
});

import '../src/styles/main.css';

setup((app) => {
  app.use(i18n);
  app.use(router);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
