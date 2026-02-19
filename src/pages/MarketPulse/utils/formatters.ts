/**
 * Format a metric value based on its unit type
 */
export function formatMetricValue(value: number, unit: string): string {
  switch (unit) {
    case 'millions_gbp':
      if (value >= 1000) {
        return `£${(value / 1000).toFixed(1)}B`;
      }
      return `£${value.toFixed(0)}M`;

    case 'percent':
      return `${value.toFixed(2)}%`;

    case 'thousands':
      return value.toLocaleString('en-GB');

    default:
      return value.toString();
  }
}

/**
 * Format a date for display
 */
export function formatChartDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    month: 'short',
    year: '2-digit',
  });
}
