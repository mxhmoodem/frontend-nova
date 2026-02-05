import { FC, useState, useEffect, useCallback } from 'react';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdChevronRight } from 'react-icons/md';
import type { NewsItem, LiveNewsCardProps } from './liveNewsCard.types';

export default function LiveNewsCardWrapper(props: LiveNewsCardProps) {
  return <LiveNewsCard {...props} />;
}

const LiveNewsCard: <LiveNewsCardProps>= ({
  title = 'Live Global Payment News',
}) => {
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
