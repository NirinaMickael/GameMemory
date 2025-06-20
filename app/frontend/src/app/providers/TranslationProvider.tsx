import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from '@/config/i18n/en.json';
import FR from '@/config/i18n/fr.json';
import type { PropsWithChildren } from 'react';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: EN },
      fr: { translation: FR },
    },
    lng: 'fr', // default language
    fallbackLng: 'en', // when key missed
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });
}

export function TranslationProvider({ children }: PropsWithChildren) {
  return children;
}
