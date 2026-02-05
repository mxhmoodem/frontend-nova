import { ReactNode } from 'react';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface DataSource {
  /**
   * Name of the data source
   */
  name: string;

  /**
   * URL to the data source
   */
  url?: string;
}

export interface MarketStatCardProps {
  /**
   * The label/title for the stat
   */
  label: string;

  /**
   * The main value to display
   */
  value: string;

  /**
   * Percentage change (e.g., 12.5 for +12.5%)
   */
  change?: number;

  /**
   * Direction of the trend
   */
  trend?: TrendDirection;

  /**
   * Icon to display in the card header
   */
  icon?: ReactNode;

  /**
   * Data source attribution with optional URL
   */
  source?: DataSource;

  /**
   * Time period for the data (e.g., "Q4 2025", "YTD")
   */
  period?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Click handler for making the card interactive
   */
  onClick?: () => void;

  /**
   * Test id for testing purposes
   */
  testId?: string;
}
