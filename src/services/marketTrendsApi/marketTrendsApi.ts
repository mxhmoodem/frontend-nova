import { api } from '../api/api';
import {
  MarketListResponse,
  MarketObjectResponse,
} from './marketTrendsApi.types';

/**
 * Retrieves all market trend items.
 */
export const listMarketTrends = () => api.get<MarketListResponse>('/market');

/**
 * Retrieves a market object by ID and bucket.
 */
export const getMarketTrendObject = (itemId: string, bucket: string) =>
  api.get<MarketObjectResponse>(`/market/${itemId}`, {
    query: { bucket },
  });
