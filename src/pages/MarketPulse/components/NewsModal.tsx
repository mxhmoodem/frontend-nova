import { useMemo } from 'react';
import { Newspaper } from 'lucide-react';
import { Modal } from '../../../components/common';
import type { MarketTrend } from '../../../services/api';
import { NewsCard } from './NewsCard';
import './NewsModal.css';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MarketTrend[];
  testId?: string;
}

export function NewsModal({ isOpen, onClose, items, testId }: NewsModalProps) {
  const sortedItems = useMemo(() => {
    const safeItems = Array.isArray(items) ? items : [];
    return [...safeItems].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [items]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Market News"
      subtitle={`${sortedItems.length} article${sortedItems.length !== 1 ? 's' : ''}`}
      size="xlarge"
      className="news-modal"
    >
      {sortedItems.length === 0 ? (
        <div className="news-modal__empty" data-testid={testId}>
          <Newspaper size={32} />
          <p>No market news available</p>
        </div>
      ) : (
        <div className="news-modal__grid" data-testid={testId}>
          {sortedItems.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              testId={`news-modal-card-${item.id}`}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}
