import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NewsModal } from './NewsModal';
import type { MarketTrend } from '../../../services/api';

// Mock formatters used by NewsCard
vi.mock('../utils/formatters', () => ({
  formatRelativeTime: () => '2 hours ago',
  extractDomain: () => 'example.com',
}));

const createMockItems = (count: number): MarketTrend[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `id-${i}`,
    title: `Article ${i + 1}`,
    description: `Description for article ${i + 1}`,
    source: `https://example.com/article-${i}`,
    file_type: 'pdf' as const,
    created_at: new Date(2026, 2, 2, 12 - i).toISOString(),
    updated_at: new Date(2026, 2, 2, 12 - i).toISOString(),
  }));

describe('NewsModal', () => {
  describe('rendering', () => {
    it('renders nothing when closed', () => {
      render(
        <NewsModal
          isOpen={false}
          onClose={vi.fn()}
          items={createMockItems(3)}
        />
      );

      expect(screen.queryByText('Market News')).not.toBeInTheDocument();
    });

    it('renders modal with title when open', () => {
      render(
        <NewsModal isOpen={true} onClose={vi.fn()} items={createMockItems(3)} />
      );

      expect(screen.getByText('Market News')).toBeInTheDocument();
    });

    it('renders article count in subtitle', () => {
      render(
        <NewsModal isOpen={true} onClose={vi.fn()} items={createMockItems(5)} />
      );

      expect(screen.getByText('5 articles')).toBeInTheDocument();
    });

    it('renders singular article count', () => {
      render(
        <NewsModal isOpen={true} onClose={vi.fn()} items={createMockItems(1)} />
      );

      expect(screen.getByText('1 article')).toBeInTheDocument();
    });

    it('renders all article cards', () => {
      render(
        <NewsModal isOpen={true} onClose={vi.fn()} items={createMockItems(3)} />
      );

      expect(screen.getByText('Article 1')).toBeInTheDocument();
      expect(screen.getByText('Article 2')).toBeInTheDocument();
      expect(screen.getByText('Article 3')).toBeInTheDocument();
    });

    it('shows descriptions (non-compact mode)', () => {
      render(
        <NewsModal isOpen={true} onClose={vi.fn()} items={createMockItems(1)} />
      );

      expect(screen.getByText('Description for article 1')).toBeInTheDocument();
    });

    it('renders with testId', () => {
      render(
        <NewsModal
          isOpen={true}
          onClose={vi.fn()}
          items={createMockItems(2)}
          testId="test-news-modal"
        />
      );

      expect(screen.getByTestId('test-news-modal')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('shows empty message when no items', () => {
      render(<NewsModal isOpen={true} onClose={vi.fn()} items={[]} />);

      expect(screen.getByText('No market news available')).toBeInTheDocument();
    });

    it('handles non-array items gracefully', () => {
      render(
        <NewsModal
          isOpen={true}
          onClose={vi.fn()}
          items={null as unknown as MarketTrend[]}
        />
      );

      expect(screen.getByText('No market news available')).toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = vi.fn();
      render(
        <NewsModal isOpen={true} onClose={onClose} items={createMockItems(1)} />
      );

      screen.getByLabelText('Close modal').click();

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
