import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from '@/app.vue';
import router from '@/router';
import { DEFAULT_LANGUAGE_CODE } from '@common/constants/storage.constants';

import '@/styles/main.css';

import en from '@/i18n/locales/en.json';
import es from '@/i18n/locales/es.json';

// configure i18n
const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANGUAGE_CODE,
  fallbackLocale: DEFAULT_LANGUAGE_CODE,
  messages: { en, es },
});

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount('#app');
