/**
 * Market Module Types
 * ===================
 * Type definitions for market trends data.
 * Used by: Overview page, MarketPulse page
 */

import type { FileType } from '../shared';

/**
 * Market trend data item
 */
export interface MarketTrend {
  id: string;
  title: string;
  description: string | null;
  source: string;
  file_type: FileType;
  created_at: string;
  updated_at: string;
}

/**
 * List of market trends
 */
export interface MarketTrendListResponse {
  data: MarketTrend[];
  count: number;
}

/**
 * Market object payload returned by GET /market/{id}
 */
export interface MarketObject {
  id: string;
  bucket: string;
  key: string;
  metadata: Record<string, string>;
  content_type?: string | null;
  content_base64: string;
}

export interface MarketObjectResponse {
  data: MarketObject;
}
