import type { SelectOption } from './Settings.models';

export const LANGUAGES: SelectOption[] = [
  { value: 'en', label: 'settings.language.languages.en' },
  { value: 'fr', label: 'settings.language.languages.fr' },
  { value: 'de', label: 'settings.language.languages.de' },
  { value: 'es', label: 'settings.language.languages.es' },
  { value: 'zh', label: 'settings.language.languages.zh' },
  { value: 'ja', label: 'settings.language.languages.ja' },
];

export const DATE_FORMATS: SelectOption[] = [
  { value: 'MM/DD/YYYY', label: 'settings.language.dateFormats.us' },
  { value: 'DD/MM/YYYY', label: 'settings.language.dateFormats.eu' },
  { value: 'YYYY-MM-DD', label: 'settings.language.dateFormats.iso' },
];

export const TIME_FORMATS: SelectOption[] = [
  { value: '12h', label: 'settings.language.timeFormats.12h' },
  { value: '24h', label: 'settings.language.timeFormats.24h' },
];

// Local storage keys
export const STORAGE_KEYS = {
  LANGUAGE: 'settings_language',
  NOTIFICATION_CHANNELS: 'settings_notif_channels',
  NOTIFICATION_CATEGORIES: 'settings_notif_categories',
} as const;

// Default values
export const DEFAULT_LANGUAGE_PREFS = {
  language: 'en',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '24h' as const,
};

export const DEFAULT_NOTIFICATION_CHANNELS = {
  email: true,
  inApp: true,
};

export const DEFAULT_NOTIFICATION_CATEGORIES = {
  regulatoryAlerts: true,
  marketNews: true,
  paymentUpdates: true,
  systemAnnouncements: false,
};
