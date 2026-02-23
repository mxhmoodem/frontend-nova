import { ReactNode } from 'react';

export type TrendDirection = 'up' | 'down' | 'stable';

export interface PaymentMethod {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Name of the payment method
   */
  name: string;

  /**
   * Percentage of total payment mix
   */
  percentage: number;

  /**
   * Color for the bar
   */
  color: string;

  /**
   * Optional icon
   */
  icon?: ReactNode;

  /**
   * Previous period percentage (for comparison)
   */
  previousPercentage?: number | null;

  /**
   * Percentage point change from previous period
   */
  change?: number | null;

  /**
   * Direction of change
   */
  trend?: TrendDirection | null;
}

export interface PaymentMethodBreakdownProps {
  /**
   * Title of the card
   */
  title: string;

  /**
   * Payment methods to display
   */
  methods: PaymentMethod[];

  /**
   * Data source
   */
  source?: {
    name: string;
    url?: string;
  };

  /**
   * Current data period (e.g., "June 2025")
   */
  currentPeriod?: string;

  /**
   * Comparison period description (e.g., "vs May 2025")
   */
  comparisonPeriod?: string | null;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Test id for testing purposes
   */
  testId?: string;
}
