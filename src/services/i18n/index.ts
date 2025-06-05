import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import th from './locales/th.json';

import type { VueMessageType, LocaleMessages } from 'vue-i18n';

const messages: { [key: string]: LocaleMessages<VueMessageType> } = {
    en: en,
    th: th,
}

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
});

export default function (app: { use: (arg0: any) => void; }) {
  app.use(i18n)
}