import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, ChevronRight } from 'lucide-react';
import type {
  Legislation,
  MarketTrendListResponse,
  TrendAlertsResponse,
} from '../../../../services/api';
import './IntelligenceFeed.css';

type FeedCategory =
  | 'MARKET'
  | 'REGULATORY'
  | 'FRAUD'
  | 'PAYMENTS'
  | 'CRYPTO'
  | 'INTERNAL';

interface FeedItem {
  id: string;
  category: FeedCategory;
  timeAgo: string;
  title: string;
  summary?: string;
}

interface IntelligenceFeedProps {
  legislationData?: Legislation[];
  marketData?: MarketTrendListResponse;
  alertsData?: TrendAlertsResponse;
  maxItems?: number;
  isLoading?: boolean;
}

/** Stable fallback timestamp set at module load — avoids React Compiler impure call error */
const FALLBACK_TS = new Date(0).getTime();

/** Convert an ISO timestamp to a relative "Xh ago" / "Xd ago" string */
function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

/** Derive a FeedCategory from a trend alert metric name */
function alertCategory(metric: string): FeedCategory {
  const m = metric.toLowerCase();
  if (m.includes('fraud') || m.includes('default')) return 'FRAUD';
  if (m.includes('credit') || m.includes('mortgage') || m.includes('rate'))
    return 'PAYMENTS';
  return 'MARKET';
}

const CATEGORY_STYLES: Record<FeedCategory, string> = {
  MARKET: 'feed-item__tag--market',
  REGULATORY: 'feed-item__tag--regulatory',
  FRAUD: 'feed-item__tag--fraud',
  PAYMENTS: 'feed-item__tag--payments',
  CRYPTO: 'feed-item__tag--crypto',
  INTERNAL: 'feed-item__tag--internal',
};

const DEFAULT_FEED: FeedItem[] = [
  {
    id: '1',
    category: 'MARKET',
    timeAgo: '2h ago',
    title: 'London Fintech sector sees 12% rise in Series B funding',
    summary:
      'Record inflows driven by embedded finance and open banking infrastructure deals.',
  },
  {
    id: '2',
    category: 'FRAUD',
    timeAgo: '4h ago',
    title:
      'Advanced Phishing Alert: Emerging patterns in card-not-present transactions',
    summary:
      'New credential-stuffing campaign targeting payment portals across EU.',
  },
  {
    id: '3',
    category: 'REGULATORY',
    timeAgo: '6h ago',
    title: 'FCA proposes stricter crypto asset custody requirements',
    summary:
      'New consultation paper extends insurance mandates for digital asset firms.',
  },
  {
    id: '4',
    category: 'PAYMENTS',
    timeAgo: '7h ago',
    title: 'SWIFT updates cross-border settlement protocols',
    summary: '',
  },
];

export function IntelligenceFeed({
  legislationData,
  marketData,
  alertsData,
  maxItems = 6,
  isLoading,
}: IntelligenceFeedProps) {
  const navigate = useNavigate();

  const items = useMemo<FeedItem[]>(() => {
    const derived: { item: FeedItem; ts: number }[] = [];

    // Legislation → REGULATORY
    if (legislationData && legislationData.length > 0) {
      legislationData.forEach((l) => {
        derived.push({
          item: {
            id: `leg-${l.id}`,
            category: 'REGULATORY',
            timeAgo: relativeTime(l.updated_at),
            title: l.title,
            summary: l.description ?? undefined,
          },
          ts: new Date(l.updated_at).getTime(),
        });
      });
    }

    // Market trends → MARKET
    if (marketData?.data?.items && marketData.data.items.length > 0) {
      marketData.data.items.forEach((m) => {
        derived.push({
          item: {
            id: `mkt-${m.id}`,
            category: 'MARKET',
            timeAgo: relativeTime(m.updated_at),
            title: m.title,
            summary: m.description ?? undefined,
          },
          ts: new Date(m.updated_at).getTime(),
        });
      });
    }

    // Trend alerts → FRAUD / PAYMENTS / MARKET
    if (alertsData?.alerts && alertsData.alerts.length > 0) {
      const alertTs = alertsData.last_updated
        ? new Date(alertsData.last_updated).getTime()
        : FALLBACK_TS;
      alertsData.alerts.forEach((a, idx) => {
        const ts = alertTs - idx * 60_000;
        derived.push({
          item: {
            id: `alert-${idx}`,
            category: alertCategory(a.metric),
            timeAgo: relativeTime(new Date(ts).toISOString()),
            title: a.message,
            summary: `${a.metric.replace(/_/g, ' ')} ${
              a.direction === 'up' ? '▲' : '▼'
            } ${a.change.toFixed(1)}%`,
          },
          ts,
        });
      });
    }

    if (derived.length === 0) return DEFAULT_FEED;

    return derived.sort((a, b) => b.ts - a.ts).map((d) => d.item);
  }, [legislationData, marketData, alertsData]);

  const visibleItems = items.slice(0, maxItems);
  const totalAlerts = items.length;
  const criticalAlerts = items.filter((i) => i.category === 'FRAUD').length;
  const regulatoryCount = items.filter(
    (i) => i.category === 'REGULATORY'
  ).length;

  return (
    <div className="intelligence-feed">
      <div className="intelligence-feed__header">
        <h3 className="intelligence-feed__title">Market Intelligence Feed</h3>
        <button
          className="intelligence-feed__view-all"
          onClick={() => navigate('/app/content-hub')}
          aria-label="View all insights in Content Hub"
        >
          View all insights
          <ChevronRight size={13} strokeWidth={2.5} />
        </button>
      </div>

      <div className="intelligence-feed__stats">
        <div className="intelligence-feed__stat">
          <span className="intelligence-feed__stat-value">
            {isLoading ? (
              <span className="feed-sk feed-sk--num" />
            ) : (
              totalAlerts
            )}
          </span>
          <span className="intelligence-feed__stat-label">Total Alerts</span>
        </div>
        <div className="intelligence-feed__stat">
          <span className="intelligence-feed__stat-value intelligence-feed__stat-value--critical">
            {isLoading ? (
              <span className="feed-sk feed-sk--num" />
            ) : (
              criticalAlerts
            )}
          </span>
          <span className="intelligence-feed__stat-label">Critical</span>
        </div>
        <div className="intelligence-feed__stat">
          <span className="intelligence-feed__stat-value">
            {isLoading ? (
              <span className="feed-sk feed-sk--num" />
            ) : (
              regulatoryCount
            )}
          </span>
          <span className="intelligence-feed__stat-label">Regulatory</span>
        </div>
      </div>

      <div className="intelligence-feed__list">
        {isLoading
          ? [0, 1, 2, 3].map((i) => <FeedItemSkeleton key={i} />)
          : visibleItems.map((item) => (
              <FeedItemCard key={item.id} item={item} />
            ))}
      </div>
    </div>
  );
}

function FeedItemCard({ item }: { item: FeedItem }) {
  const [bookmarked, setBookmarked] = React.useState(false);

  return (
    <div className="feed-item">
      <div className="feed-item__meta">
        <span className={`feed-item__tag ${CATEGORY_STYLES[item.category]}`}>
          {item.category}
        </span>
        <span className="feed-item__time">{item.timeAgo}</span>
      </div>

      <div className="feed-item__body">
        <p className="feed-item__title">{item.title}</p>
        {item.summary && <p className="feed-item__summary">{item.summary}</p>}
      </div>

      <button
        className={`feed-item__bookmark ${bookmarked ? 'feed-item__bookmark--active' : ''}`}
        onClick={() => setBookmarked((prev) => !prev)}
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this item'}
      >
        <Bookmark size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

function FeedItemSkeleton() {
  return (
    <div className="feed-item feed-item--skeleton">
      <div className="feed-item__meta">
        <span className="feed-sk feed-sk--tag" />
        <span className="feed-sk feed-sk--time" />
      </div>
      <div className="feed-item__body">
        <span className="feed-sk feed-sk--title" />
        <span className="feed-sk feed-sk--summary" />
      </div>
    </div>
  );
}
