/**
 * Payment Module Types
 * ====================
 * Type definitions matching the Bank of England payment data API.
 * Used by: MarketPulse page, Overview page
 *
 * Backend endpoints:
 * - GET /payment/stats
 * - GET /payment/trend-alerts
 * - POST /payment/refresh
 */

// =============================================================================
// STATS ENDPOINT TYPES
// =============================================================================

/**
 * Trend direction for stat changes
 */
export type TrendDirection = 'up' | 'down' | 'stable';

/**
 * Individual stat item from /payment/stats
 * Each metric (consumer credit, credit cards, etc.) follows this structure
 */
export interface StatItem {
  /** Formatted display value, e.g. "£476.2B" */
  value: string;
  /** Raw numeric value for calculations */
  raw_value: number;
  /** Percentage change, e.g. 2.5 or -3.2 */
  change: number;
  /** Direction of change */
  trend: TrendDirection;
  /** Comparison period, always "vs last month" */
  period: string;
}

/**
 * Response from GET /payment/stats
 * Contains Bank of England statistics with month-over-month changes
 */
export interface PaymentStatsResponse {
  total_consumer_credit: StatItem | null;
  credit_card_lending: StatItem | null;
  mortgage_approvals: StatItem | null;
  bank_rate: StatItem | null;
  last_updated: string | null;
}

// =============================================================================
// TREND ALERTS ENDPOINT TYPES
// =============================================================================

/**
 * Individual trend alert from /payment/trend-alerts
 * Generated for metrics with >5% change
 */
export interface TrendAlertApi {
  /** Name of the metric */
  metric: string;
  /** Absolute change percentage */
  change: number;
  /** Direction of change */
  direction: 'up' | 'down';
  /** Human-readable message */
  message: string;
}

/**
 * Response from GET /payment/trend-alerts
 */
export interface TrendAlertsResponse {
  alerts: TrendAlertApi[];
  last_updated: string | null;
}

// =============================================================================
// REFRESH ENDPOINT TYPES
// =============================================================================

/**
 * Response from POST /payment/refresh
 * Manually triggers data refresh from Bank of England API
 */
export interface RefreshResponse {
  success: boolean;
  records_saved?: number;
  message?: string;
  error?: string;
}

// =============================================================================
// HISTORY ENDPOINT TYPES
// =============================================================================

/**
 * Time range options for history queries
 */
export type TimeRange = 3 | 6 | 12 | 24;

/**
 * Custom date range for history queries
 */
export interface HistoryDateRange {
  /** Start month (1-12) */
  fromMonth: number;
  /** Start year (e.g., 2024) */
  fromYear: number;
  /** End month (1-12) */
  toMonth: number;
  /** End year (e.g., 2026) */
  toYear: number;
}

/**
 * Metric keys for filtering
 */
export type MetricKey =
  | 'total_consumer_credit'
  | 'credit_card_lending'
  | 'mortgage_approvals'
  | 'bank_rate';

/**
 * Individual data point in history
 */
export interface HistoryDataPoint {
  /** Date in ISO format, e.g. "2024-02-29" */
  date: string;
  /** Raw numeric value */
  value: number;
}

/**
 * History data for a single metric
 */
export interface MetricHistory {
  /** Display name of the metric */
  metric_name: string;
  /** Unit type for formatting: "millions_gbp" | "percent" | "thousands" */
  unit: string;
  /** Array of historical data points */
  data: HistoryDataPoint[];
}

/**
 * Response from GET /payment/history
 * Contains historical Bank of England data for up to 24 months
 */
export interface HistoryResponse {
  total_consumer_credit: MetricHistory | null;
  credit_card_lending: MetricHistory | null;
  mortgage_approvals: MetricHistory | null;
  bank_rate: MetricHistory | null;
  /** Number of months of data included */
  months_included: number;
}
