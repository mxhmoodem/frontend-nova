import { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import type { MarketTrend } from '../../../services/api';
import { NewsCard } from './NewsCard';
import './NewsList.css';

interface NewsListProps {
  items: MarketTrend[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onViewAll?: () => void;
  maxItems?: number;
  showHeader?: boolean;
  compact?: boolean;
  testId?: string;
}

export function NewsList({
  items,
  isLoading = false,
  isError = false,
  onRetry,
  onViewAll,
  maxItems = 5,
  showHeader = true,
  compact = false,
  testId,
}: NewsListProps) {
  const [expanded, setExpanded] = useState(false);

  // Sort by most recent first
  const sortedItems = useMemo(() => {
    const safeItems = Array.isArray(items) ? items : [];
    return [...safeItems].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [items]);

  const displayItems = expanded ? sortedItems : sortedItems.slice(0, maxItems);
  const hasMore = sortedItems.length > maxItems;

  // Loading state
  if (isLoading) {
    return (
      <div
        className="news-list__skeleton"
        aria-busy="true"
        data-testid={testId}
      >
        {Array.from({ length: Math.min(maxItems, 3) }).map((_, i) => (
          <div key={i} className="news-list__skeleton-card" />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="news-list__error" data-testid={testId}>
        <AlertCircle size={24} />
        <p className="news-list__error-text">
          Failed to load market news. Please try again.
        </p>
        {onRetry && (
          <button
            type="button"
            className="news-list__error-btn"
            onClick={onRetry}
          >
            <RefreshCw size={14} />
            Retry
          </button>
        )}
      </div>
    );
  }

  // Empty state
  if (sortedItems.length === 0) {
    return (
      <div className="news-list__empty" data-testid={testId}>
        No market news available
      </div>
    );
  }

  return (
    <section data-testid={testId}>
      {showHeader && (
        <div className="news-list__header">
          <h3 className="news-list__title">Market News</h3>
          <span className="news-list__count">
            {sortedItems.length} article{sortedItems.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div
        className={['news-list__items', compact && 'news-list__items--compact']
          .filter(Boolean)
          .join(' ')}
      >
        {displayItems.map((item) => (
          <NewsCard
            key={item.id}
            item={item}
            compact={compact}
            testId={`news-card-${item.id}`}
          />
        ))}
      </div>

      {hasMore && (
        onViewAll ? (
          <button
            type="button"
            className="news-list__toggle"
            onClick={onViewAll}
          >
            View all {sortedItems.length} articles <ExternalLink size={14} />
          </button>
        ) : (
          <button
            type="button"
            className="news-list__toggle"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                Show less <ChevronUp size={14} />
              </>
            ) : (
              <>
                View all {sortedItems.length} articles{' '}
                <ChevronDown size={14} />
              </>
            )}
          </button>
        )
      )}
    </section>
  );
}
