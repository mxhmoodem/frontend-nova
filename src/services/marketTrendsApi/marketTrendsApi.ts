import { marketApi } from '../api/market/market.api';

/**
 * Retrieves all market trend items.
 */
export const listMarketTrends = () => marketApi.getAll();

/**
 * Retrieves a market object by ID and bucket.
 */
export const getMarketTrendObject = (itemId: string, bucket: string) =>
  marketApi.getById(itemId, bucket);
