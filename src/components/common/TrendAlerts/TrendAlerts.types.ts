export interface TrendAlert {
  /** Unique identifier for the alert */
  id: string;
  /** Name of the metric that changed */
  metric: string;
  /** Percentage change value */
  change: number;
  /** Direction of the change */
  direction: 'up' | 'down';
  /** Time period for the comparison (e.g., 'MoM', 'YoY', 'QoQ') */
  period: string;
  /** Optional additional context about the change */
  context?: string;
}

export interface DataSource {
  /** Name of the data source */
  name: string;
  /** Optional URL to the source */
  url?: string;
}

export interface TrendAlertsProps {
  /** Title for the alerts section */
  title: string;
  /** Array of trend alerts to display */
  alerts: TrendAlert[];
  /** Data source attribution */
  source?: DataSource;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}
