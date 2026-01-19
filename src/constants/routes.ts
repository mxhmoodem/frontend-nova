export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  APP_ROOT: '/app',
  OVERVIEW: '/app/overview',
  AI_CONSOLE: '/app/ai-console',
  MARKET_PULSE: '/app/market-pulse',
  REGULATORY_RADAR: '/app/regulatory-radar',
  CONTENT_HUB: '/app/content-hub',
  SETTINGS: '/app/settings',
  HELP_SUPPORT: '/app/help-support',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
