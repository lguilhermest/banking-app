import { initReactI18next } from 'react-i18next';
import * as locales from './locales';
import i18n from 'i18next';

const resources = {
  pt: {
    translation: locales.pt,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
});

export default i18n;
