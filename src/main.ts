import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from '@/app.vue';
import router from '@/router';

import '@/styles/main.css';

import en from './i18n/locales/en.json';

// configure i18n
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en },
});

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount('#app');
