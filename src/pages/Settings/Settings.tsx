import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { Button } from '../../components/common/Button/Button';
import { useTheme } from '../../hooks/useTheme/useTheme';
import { useAuth } from '../../hooks/useAuth/useAuth';
import {
  LANGUAGES,
  DATE_FORMATS,
  TIME_FORMATS,
  STORAGE_KEYS,
  DEFAULT_LANGUAGE_PREFS,
  DEFAULT_NOTIFICATION_CHANNELS,
  DEFAULT_NOTIFICATION_CATEGORIES,
} from './Settings.config';
import type {
  LanguagePrefs,
  NotificationChannels,
  NotificationCategories,
} from './Settings.models';
import './Settings.css';

// Local storage helper
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

// Sub-components
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="settings-section">
      <h3 className="settings-section__title">{title}</h3>
      <div className="settings-section__body">{children}</div>
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  id: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      className={`settings-toggle ${checked ? 'settings-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
      type="button"
    >
      <span className="settings-toggle__thumb" />
    </button>
  );
}

function SettingRow({
  label,
  description,
  htmlFor,
  children,
}: {
  label: string;
  description?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="settings-row">
      <div className="settings-row__label-group">
        <label className="settings-row__label" htmlFor={htmlFor}>
          {label}
        </label>
        {description && (
          <p className="settings-row__description">{description}</p>
        )}
      </div>
      <div className="settings-row__control">{children}</div>
    </div>
  );
}

// Main Component

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  // Language & Locale
  const [langPrefs, setLangPrefs] = useState<LanguagePrefs>(() =>
    loadFromStorage(STORAGE_KEYS.LANGUAGE, DEFAULT_LANGUAGE_PREFS)
  );

  // Notification channels
  const [notifChannels, setNotifChannels] = useState<NotificationChannels>(() =>
    loadFromStorage(
      STORAGE_KEYS.NOTIFICATION_CHANNELS,
      DEFAULT_NOTIFICATION_CHANNELS
    )
  );

  // Notification categories
  const [notifCategories, setNotifCategories] =
    useState<NotificationCategories>(() =>
      loadFromStorage(
        STORAGE_KEYS.NOTIFICATION_CATEGORIES,
        DEFAULT_NOTIFICATION_CATEGORIES
      )
    );

  // Persist prefs
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, JSON.stringify(langPrefs));
  }, [langPrefs]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.NOTIFICATION_CHANNELS,
      JSON.stringify(notifChannels)
    );
  }, [notifChannels]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.NOTIFICATION_CATEGORIES,
      JSON.stringify(notifCategories)
    );
  }, [notifCategories]);

  // Handlers
  function updateLang(key: keyof LanguagePrefs, value: string) {
    setLangPrefs((prev) => ({ ...prev, [key]: value }));
    // Update i18n language when language changes
    if (key === 'language') {
      i18n.changeLanguage(value);
    }
  }

  function updateChannel(key: keyof NotificationChannels, value: boolean) {
    setNotifChannels((prev) => ({ ...prev, [key]: value }));
  }

  function updateCategory(key: keyof NotificationCategories, value: boolean) {
    setNotifCategories((prev) => ({ ...prev, [key]: value }));
  }

  // Render

  return (
    <div className="settings-container">
      <h2 className="settings__heading">
        {t('settings.title')}
        <InformationButton
          tooltip={t('common.moreInformation')}
          ariaLabel="Information"
        />
      </h2>
      <p className="settings__subheading">{t('settings.subtitle')}</p>

      <div className="settings-sections">
        <SectionCard title={t('settings.theme.title')}>
          <SettingRow
            label={t('settings.theme.appearance')}
            description={t('settings.theme.appearanceDescription')}
            htmlFor="theme-toggle"
          >
            <div className="settings-theme-options">
              <button
                className={`settings-theme-btn ${theme === 'light' ? 'settings-theme-btn--active' : ''}`}
                onClick={() => setTheme('light')}
                type="button"
              >
                <span className="settings-theme-btn__icon">
                  <IoMdSunny />
                </span>
                {t('settings.theme.light')}
              </button>
              <button
                className={`settings-theme-btn ${theme === 'dark' ? 'settings-theme-btn--active' : ''}`}
                onClick={() => setTheme('dark')}
                type="button"
              >
                <span className="settings-theme-btn__icon">
                  <IoMdMoon />
                </span>
                {t('settings.theme.dark')}
              </button>
            </div>
          </SettingRow>
        </SectionCard>

        <SectionCard title={t('settings.userProfile.title')}>
          <SettingRow
            label={t('settings.userProfile.name')}
            description={t('settings.userProfile.nameDescription')}
          >
            <div className="settings-readonly-field">{user?.name ?? '—'}</div>
          </SettingRow>

          <SettingRow
            label={t('settings.userProfile.email')}
            description={t('settings.userProfile.emailDescription')}
          >
            <div className="settings-readonly-field">{user?.email ?? '—'}</div>
          </SettingRow>

          <div className="settings-divider" />

          <div className="settings-row settings-row--actions">
            <Button
              text={t('common.logout')}
              icon={<FiLogOut />}
              variant="danger"
              onClick={logout}
            />
          </div>
        </SectionCard>

        <SectionCard title={t('settings.language.title')}>
          <SettingRow
            label={t('settings.language.language')}
            description={t('settings.language.languageDescription')}
            htmlFor="select-language"
          >
            <select
              id="select-language"
              className="settings-select"
              value={langPrefs.language}
              onChange={(e) => updateLang('language', e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {t(l.label)}
                </option>
              ))}
            </select>
          </SettingRow>

          <SettingRow
            label={t('settings.language.dateFormat')}
            description={t('settings.language.dateFormatDescription')}
            htmlFor="select-date"
          >
            <select
              id="select-date"
              className="settings-select"
              value={langPrefs.dateFormat}
              onChange={(e) => updateLang('dateFormat', e.target.value)}
            >
              {DATE_FORMATS.map((f) => (
                <option key={f.value} value={f.value}>
                  {t(f.label)}
                </option>
              ))}
            </select>
          </SettingRow>

          <SettingRow
            label={t('settings.language.timeFormat')}
            description={t('settings.language.timeFormatDescription')}
            htmlFor="select-time"
          >
            <select
              id="select-time"
              className="settings-select"
              value={langPrefs.timeFormat}
              onChange={(e) => updateLang('timeFormat', e.target.value)}
            >
              {TIME_FORMATS.map((f) => (
                <option key={f.value} value={f.value}>
                  {t(f.label)}
                </option>
              ))}
            </select>
          </SettingRow>
        </SectionCard>

        <SectionCard title={t('settings.notifications.title')}>
          <p className="settings-section__subtitle">
            {t('settings.notifications.channels')}
          </p>

          <SettingRow
            label={t('settings.notifications.email')}
            description={t('settings.notifications.emailDescription')}
            htmlFor="toggle-email"
          >
            <ToggleSwitch
              id="toggle-email"
              checked={notifChannels.email}
              onChange={(v) => updateChannel('email', v)}
            />
          </SettingRow>

          <SettingRow
            label={t('settings.notifications.inApp')}
            description={t('settings.notifications.inAppDescription')}
            htmlFor="toggle-inapp"
          >
            <ToggleSwitch
              id="toggle-inapp"
              checked={notifChannels.inApp}
              onChange={(v) => updateChannel('inApp', v)}
            />
          </SettingRow>

          <div className="settings-divider" />
          <p className="settings-section__subtitle">
            {t('settings.notifications.categories')}
          </p>

          <SettingRow
            label={t('settings.notifications.regulatoryAlerts')}
            description={t(
              'settings.notifications.regulatoryAlertsDescription'
            )}
            htmlFor="toggle-regulatory"
          >
            <ToggleSwitch
              id="toggle-regulatory"
              checked={notifCategories.regulatoryAlerts}
              onChange={(v) => updateCategory('regulatoryAlerts', v)}
            />
          </SettingRow>

          <SettingRow
            label={t('settings.notifications.marketNews')}
            description={t('settings.notifications.marketNewsDescription')}
            htmlFor="toggle-market"
          >
            <ToggleSwitch
              id="toggle-market"
              checked={notifCategories.marketNews}
              onChange={(v) => updateCategory('marketNews', v)}
            />
          </SettingRow>

          <SettingRow
            label={t('settings.notifications.paymentUpdates')}
            description={t('settings.notifications.paymentUpdatesDescription')}
            htmlFor="toggle-payments"
          >
            <ToggleSwitch
              id="toggle-payments"
              checked={notifCategories.paymentUpdates}
              onChange={(v) => updateCategory('paymentUpdates', v)}
            />
          </SettingRow>

          <SettingRow
            label={t('settings.notifications.systemAnnouncements')}
            description={t(
              'settings.notifications.systemAnnouncementsDescription'
            )}
            htmlFor="toggle-system"
          >
            <ToggleSwitch
              id="toggle-system"
              checked={notifCategories.systemAnnouncements}
              onChange={(v) => updateCategory('systemAnnouncements', v)}
            />
          </SettingRow>
        </SectionCard>
      </div>
    </div>
  );
}
