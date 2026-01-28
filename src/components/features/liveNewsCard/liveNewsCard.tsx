// CSS is imported via the index.ts barrel export to avoid TypeScript issues
import { FC, useState, useEffect, useCallback } from 'react';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdChevronRight } from 'react-icons/md';
import type { NewsItem, LiveNewsCardProps } from './liveNewsCard.types';

const LiveNewsCard: FC<LiveNewsCardProps> = ({
  title = 'Live Global Payment News',
}) => {
  // Sample news data - replace with API call
  const newsData: NewsItem[] = [
    {
      id: '1',
      title: 'Global Payments Expands Cross-Border Services',
      description:
        'Major expansion in instant cross-border payment infrastructure announced today.',
      category: 'payment',
      timestamp: '2 hours ago',
      source: 'FinanceToday',
    },
    {
      id: '2',
      title: 'Central Banks Launch Digital Currency Initiative',
      description:
        'Multiple central banks coordinate on CBDC standards and implementation.',
      category: 'fintech',
      timestamp: '4 hours ago',
      source: 'CryptoNews',
    },
    {
      id: '3',
      title: 'Cryptocurrency Regulations Update',
      description:
        'New regulatory framework established for stablecoin issuance worldwide.',
      category: 'regulation',
      timestamp: '6 hours ago',
      source: 'RegulatoryDaily',
    },
    {
      id: '4',
      title: 'Bitcoin Reaches New Market Milestone',
      description:
        'Institutional adoption drives crypto market to historic highs.',
      category: 'crypto',
      timestamp: '8 hours ago',
      source: 'BlockchainWeekly',
    },
    {
      id: '5',
      title: 'FinTech Startups Raise Record Funding',
      description:
        'Payment and financial technology companies secure $5B in Q1 funding.',
      category: 'fintech',
      timestamp: '10 hours ago',
      source: 'TechVentures',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const newsDataLength = newsData.length;

  const currentNews = newsData[currentIndex];

  const handleRotate = useCallback(() => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % newsDataLength);
      setIsRotating(false);
    }, 300);
  }, [newsDataLength]);

  // Auto-rotate every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRotate();
    }, 15000);

    return () => clearInterval(interval);
  }, [handleRotate]);

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      payment: '#3b82f6',
      crypto: '#f59e0b',
      fintech: '#10b981',
      regulation: '#ef4444',
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div className="live-news-card">
      <div className="live-news-card__header">
        <div className="live-news-card__title-section">
          <IoNewspaperOutline className="live-news-card__icon" />
          <h3 className="live-news-card__title">{title}</h3>
          <span className="live-news-card__live-indicator">
            <span className="live-news-card__live-dot"></span>
            LIVE
          </span>
        </div>
      </div>

      <div
        className={`live-news-card__content ${isRotating ? 'rotating' : ''}`}
      >
        <div className="live-news-card__news-item">
          <div
            className="live-news-card__category-badge"
            style={{ backgroundColor: getCategoryColor(currentNews.category) }}
          >
            {currentNews.category.toUpperCase()}
          </div>

          <h4 className="live-news-card__news-title">{currentNews.title}</h4>

          <p className="live-news-card__news-description">
            {currentNews.description}
          </p>

          <div className="live-news-card__footer-info">
            <span className="live-news-card__source">{currentNews.source}</span>
            <span className="live-news-card__timestamp">
              {currentNews.timestamp}
            </span>
          </div>
        </div>
      </div>

      <div className="live-news-card__actions">
        <button
          className="live-news-card__next-button"
          onClick={handleRotate}
          aria-label="Next news"
          disabled={isRotating}
        >
          <MdChevronRight size={20} />
          <span>
            Next ({currentIndex + 1}/{newsData.length})
          </span>
        </button>
      </div>
    </div>
  );
};

export default LiveNewsCard;
