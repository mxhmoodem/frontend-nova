import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('settings_language');
let initialLanguage = 'en';

if (savedLanguage) {
  try {
    const parsed = JSON.parse(savedLanguage);
    initialLanguage = parsed.language || 'en';
  } catch {
    initialLanguage = 'en';
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
