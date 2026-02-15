/**
 * Market Module
 * =============
 * API integration for market trends.
 * Used by: Overview page, MarketPulse page
 */

// Types
export type {
  MarketTrend,
  MarketTrendListResponse,
  MarketObject,
  MarketObjectResponse,
} from './market.types';

// API
export { marketApi } from './market.api';

// Keys
export { marketKeys } from './market.keys';

// Hooks
export { useMarketTrends, useMarketTrend } from './market.hooks';
