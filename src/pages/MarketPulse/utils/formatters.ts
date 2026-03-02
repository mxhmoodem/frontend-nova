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

/**
 * Format ISO date string to relative time ("2 hours ago", "Yesterday")
 */
export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Extract domain from URL for source display
 */
export function extractDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace('www.', '');
  } catch {
    return 'Unknown source';
  }
}
