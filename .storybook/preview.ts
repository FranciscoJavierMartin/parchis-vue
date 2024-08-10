import { setup, type Preview } from '@storybook/vue3';
import router from '@/router';

import '../src/styles/main.css';

setup((app) => {
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
