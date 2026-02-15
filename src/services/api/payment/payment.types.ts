/**
 * Payment Module Types
 * ====================
 * Type definitions for payment-related API data.
 * Used by: MarketPulse page, Overview page
 */

/**
 * Main payment statistics
 */
export interface PaymentStats {
  consumerCredit: {
    value: number;
    change: number;
    changeDirection: 'up' | 'down' | 'stable';
  };
  creditCards: {
    value: number;
    change: number;
    changeDirection: 'up' | 'down' | 'stable';
  };
  mortgages: {
    value: number;
    change: number;
    changeDirection: 'up' | 'down' | 'stable';
  };
  bankRate: {
    value: number;
    change: number;
    changeDirection: 'up' | 'down' | 'stable';
  };
  lastUpdated: string;
}

/**
 * Payment method market share
 */
export interface PaymentMethod {
  id: string;
  name: string;
  percentage: number;
  color?: string;
}

/**
 * Payment methods breakdown response
 */
export type PaymentMethodsResponse = PaymentMethod[];

/**
 * Trend alert for significant changes
 */
export interface TrendAlert {
  id: string;
  metric: string;
  change: number;
  direction: 'up' | 'down';
  period: string;
  context?: string;
  severity?: 'info' | 'warning' | 'critical';
}

/**
 * Trend alerts response
 */
export type TrendAlertsResponse = TrendAlert[];
