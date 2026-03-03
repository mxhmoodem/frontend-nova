import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Newspaper,
} from 'lucide-react';
import type { MarketTrend } from '../../../services/api';
import { extractDomain } from '../utils/formatters';
import './NewsBanner.css';

interface NewsBannerProps {
  items: MarketTrend[];
  isLoading?: boolean;
  autoRotateMs?: number;
  testId?: string;
}

export function NewsBanner({
  items,
  isLoading = false,
  autoRotateMs = 8000,
  testId,
}: NewsBannerProps) {
  const [rawIndex, setRawIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Sort items by most recent
  const sortedItems = useMemo(() => {
    const safeItems = Array.isArray(items) ? items : [];
    return [...safeItems].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [items]);

  // Clamp index to valid range — handles items.length shrinking
  const currentIndex =
    sortedItems.length > 0 ? rawIndex % sortedItems.length : 0;

  const goNext = useCallback(() => {
    setRawIndex((prev) => prev + 1);
  }, []);

  const goPrev = useCallback(() => {
    setRawIndex((prev) => (prev <= 0 ? sortedItems.length - 1 : prev - 1));
  }, [sortedItems.length]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused || sortedItems.length <= 1 || autoRotateMs <= 0) return;

    const interval = setInterval(goNext, autoRotateMs);
    return () => clearInterval(interval);
  }, [isPaused, sortedItems.length, autoRotateMs, goNext]);

  const handleReadMore = () => {
    if (!currentItem) return;
    window.open(currentItem.source, '_blank', 'noopener,noreferrer');
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className="news-banner news-banner--loading"
        aria-busy="true"
        data-testid={testId}
      >
        <div className="news-banner__content">
          <div className="news-banner__skeleton-label" />
          <div className="news-banner__skeleton-title" />
          <div className="news-banner__skeleton-desc" />
        </div>
      </div>
    );
  }

  // No items
  if (sortedItems.length === 0) return null;

  const currentItem = sortedItems[currentIndex];
  if (!currentItem) return null;

  return (
    <div
      className="news-banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-live="polite"
      data-testid={testId}
    >
      {/* Content */}
      <div
        className="news-banner__content"
        onClick={handleReadMore}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleReadMore();
          }
        }}
        aria-label={`${currentItem.title} — Opens in new tab`}
      >
        <div className="news-banner__label">
          <Newspaper size={14} />
          Latest News
        </div>
        <h3 className="news-banner__title">{currentItem.title}</h3>
        {currentItem.description && (
          <p className="news-banner__description">{currentItem.description}</p>
        )}
        <div className="news-banner__footer">
          <span className="news-banner__read-more">
            Read More <ExternalLink size={12} />
          </span>
          <span className="news-banner__source">
            {extractDomain(currentItem.source)}
          </span>
        </div>
      </div>

      {/* Navigation */}
      {sortedItems.length > 1 && (
        <nav className="news-banner__nav" aria-label="News navigation">
          <button
            type="button"
            className="news-banner__nav-btn"
            onClick={goPrev}
            aria-label="Previous headline"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="news-banner__nav-btn"
            onClick={goNext}
            aria-label="Next headline"
          >
            <ChevronRight size={16} />
          </button>
          <div className="news-banner__indicators">
            {sortedItems.slice(0, 5).map((_, i) => (
              <span
                key={i}
                className={[
                  'news-banner__dot',
                  i === currentIndex && 'news-banner__dot--active',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
