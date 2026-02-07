export interface InsightCardProps {
  /**
   * The insight text/quote
   */
  insight: string;

  /**
   * Source of the insight (e.g., "Insight Bot", "Analyst")
   */
  source: string;

  /**
   * Timestamp or time indicator (e.g., "Just now", "2 hours ago")
   */
  timestamp?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Test id for testing purposes
   */
  testId?: string;
}
