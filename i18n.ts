import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ko from './locales/ko.json';

const resources = {
  en: { translation: en },
  ko: { translation: ko },
};

const fallbackLng = 'en';

const getInitialLanguage = () => {
  const locales = Localization.getLocales();
  if (!locales || locales.length === 0) {
    return fallbackLng;
  }

  const primary = locales[0];
  const languageCode =
    (primary.languageCode ?? primary.languageTag ?? fallbackLng).toLowerCase();

  if (languageCode.startsWith('ko')) {
    return 'ko';
  }

  return fallbackLng;
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng,
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;

export const supportedLanguages = Object.keys(resources);
