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
export type MarketTrendList = MarketTrend[];
