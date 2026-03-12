export interface LanguagePrefs {
  language: string;
  dateFormat: string;
  timeFormat: string;
}

export interface NotificationChannels {
  email: boolean;
  inApp: boolean;
}

export interface NotificationCategories {
  regulatoryAlerts: boolean;
  marketNews: boolean;
  paymentUpdates: boolean;
  systemAnnouncements: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}
