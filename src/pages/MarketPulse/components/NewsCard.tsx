import { useState, useEffect, useMemo, KeyboardEvent } from 'react';
import { ExternalLink, FileText, Clock } from 'lucide-react';
import type { MarketTrend } from '../../../services/api';
import { formatRelativeTime, extractDomain } from '../utils/formatters';
import './NewsCard.css';

/**
 * Tick counter that increments every `intervalMs` to keep
 * relative-time labels fresh without extra state per card.
 */
function useTickEvery(intervalMs: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return tick;
}

interface NewsCardProps {
  item: MarketTrend;
  compact?: boolean;
  testId?: string;
}

export function NewsCard({ item, compact = false, testId }: NewsCardProps) {
  // Re-evaluate relative time every 60 s
  const tick = useTickEvery(60_000);
  const relativeTime = useMemo(
    () => formatRelativeTime(item.created_at),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tick forces refresh
    [item.created_at, tick]
  );

  const handleClick = () => {
    window.open(item.source, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const classNames = ['news-card', compact && 'news-card--compact']
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`${item.title} — Opens in new tab`}
      data-testid={testId}
    >
      {/* Header: Source & Time */}
      <div className="news-card__meta">
        <span className="news-card__source">
          <FileText size={12} />
          {extractDomain(item.source)}
        </span>
        <time className="news-card__time" dateTime={item.created_at}>
          <Clock size={12} />
          {relativeTime}
        </time>
      </div>

      {/* Title */}
      <h4 className="news-card__title">{item.title}</h4>

      {/* Description (hidden in compact mode) */}
      {!compact && item.description && (
        <p className="news-card__description">{item.description}</p>
      )}

      {/* Read more indicator */}
      <span className="news-card__read-more" aria-hidden="true">
        Read article
        <ExternalLink size={12} />
      </span>
    </article>
  );
}
