import React from 'react';

const NAV_LABELS: Record<string, string> = {
  overview: 'Overview',
  'market-pulse': 'Market Pulse',
  'regulatory-radar': 'Regulatory Radar',
  'content-hub': 'Content Hub',
  'ai-console': 'AI Console',
  settings: 'Settings',
};

const COMMON_LABELS: Record<string, string> = {
  'common.collapseSidebar': 'Collapse Sidebar',
  'common.expandSidebar': 'Expand Sidebar',
  'common.help': 'Help',
  'common.logout': 'Logout',
  'common.storybook': 'Storybook',
};

const translate = (key: string) => {
  if (key in COMMON_LABELS) return COMMON_LABELS[key];

  if (key.startsWith('navigation.')) {
    const id = key.slice('navigation.'.length);
    return NAV_LABELS[id] ?? key;
  }

  return key;
};

export const useTranslation = () => {
  return {
    t: (key: string) => translate(key),
    i18n: {
      language: 'en',
      changeLanguage: async () => Promise.resolve(),
    },
  };
};

export const Trans = ({ children }: { children?: React.ReactNode }) => {
  return React.createElement(React.Fragment, null, children);
};

export const I18nextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return React.createElement(React.Fragment, null, children);
};

export const withTranslation =
  () => (Component: React.ComponentType<Record<string, unknown>>) => {
    return (props: Record<string, unknown>) =>
      React.createElement(Component, {
        t: (key: string) => translate(key),
        ...props,
      });
  };

export const initReactI18next = {
  type: '3rdParty',
  init: () => undefined,
};
