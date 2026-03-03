import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, ChevronRight } from 'lucide-react';
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
  items?: FeedItem[];
  maxItems?: number;
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
  items = DEFAULT_FEED,
  maxItems = 6,
}: IntelligenceFeedProps) {
  const navigate = useNavigate();
  const visibleItems = items.slice(0, maxItems);

  // Count by category
  const categoryCounts = items.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    },
    {} as Record<FeedCategory, number>
  );

  const totalAlerts = items.length;
  const criticalAlerts = items.filter((i) => i.category === 'FRAUD').length;

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
          <span className="intelligence-feed__stat-value">{totalAlerts}</span>
          <span className="intelligence-feed__stat-label">Total Alerts</span>
        </div>
        <div className="intelligence-feed__stat">
          <span className="intelligence-feed__stat-value intelligence-feed__stat-value--critical">
            {criticalAlerts}
          </span>
          <span className="intelligence-feed__stat-label">Critical</span>
        </div>
        <div className="intelligence-feed__stat">
          <span className="intelligence-feed__stat-value">
            {categoryCounts.REGULATORY || 0}
          </span>
          <span className="intelligence-feed__stat-label">Regulatory</span>
        </div>
      </div>

      <div className="intelligence-feed__list">
        {visibleItems.map((item) => (
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
