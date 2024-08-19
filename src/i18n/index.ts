import en from '@/i18n/locales/en.json';
import es from '@/i18n/locales/es.json';
import { DEFAULT_LANGUAGE_CODE } from '@/modules/common/constants/storage.constants';
import { createI18n } from 'vue-i18n';

// configure i18n
const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANGUAGE_CODE,
  fallbackLocale: DEFAULT_LANGUAGE_CODE,
  messages: { en, es },
});

export default i18n;
