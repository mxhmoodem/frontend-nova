import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewsList } from './NewsList';
import type { MarketTrend } from '../../../services/api';

// Mock NewsCard to simplify testing
vi.mock('./NewsCard', () => ({
  NewsCard: ({
    item,
    compact,
    testId,
  }: {
    item: MarketTrend;
    compact?: boolean;
    testId?: string;
  }) => (
    <div data-testid={testId} data-title={item.title} data-compact={compact} />
  ),
}));

const createMockItems = (count: number): MarketTrend[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `id-${i}`,
    title: `News Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
    source: `https://example.com/article-${i}`,
    file_type: 'pdf' as const,
    created_at: new Date(2026, 2, 2, 12 - i).toISOString(),
    updated_at: new Date(2026, 2, 2, 12 - i).toISOString(),
  }));

describe('NewsList', () => {
  describe('rendering', () => {
    it('renders header with title and count', () => {
      const items = createMockItems(3);
      render(<NewsList items={items} />);

      expect(screen.getByText('Market News')).toBeInTheDocument();
      expect(screen.getByText('3 articles')).toBeInTheDocument();
    });

    it('uses singular "article" for single item', () => {
      const items = createMockItems(1);
      render(<NewsList items={items} />);

      expect(screen.getByText('1 article')).toBeInTheDocument();
    });

    it('hides header when showHeader is false', () => {
      const items = createMockItems(3);
      render(<NewsList items={items} showHeader={false} />);

      expect(screen.queryByText('Market News')).not.toBeInTheDocument();
    });

    it('renders correct number of items up to maxItems', () => {
      const items = createMockItems(8);
      render(<NewsList items={items} maxItems={5} />);

      const cards = screen.getAllByTestId(/^news-card-/);
      expect(cards).toHaveLength(5);
    });

    it('renders all items when fewer than maxItems', () => {
      const items = createMockItems(3);
      render(<NewsList items={items} maxItems={5} />);

      const cards = screen.getAllByTestId(/^news-card-/);
      expect(cards).toHaveLength(3);
    });

    it('passes compact prop to NewsCard', () => {
      const items = createMockItems(2);
      render(<NewsList items={items} compact />);

      const cards = screen.getAllByTestId(/^news-card-/);
      expect(cards[0]).toHaveAttribute('data-compact', 'true');
    });

    it('applies testId', () => {
      const items = createMockItems(2);
      render(<NewsList items={items} testId="test-list" />);

      expect(screen.getByTestId('test-list')).toBeInTheDocument();
    });
  });

  describe('sorting', () => {
    it('sorts items by most recent first', () => {
      const items: MarketTrend[] = [
        {
          id: 'old',
          title: 'Old News',
          description: null,
          source: 'https://example.com/old',
          file_type: 'pdf',
          created_at: '2026-01-01T12:00:00Z',
          updated_at: '2026-01-01T12:00:00Z',
        },
        {
          id: 'new',
          title: 'New News',
          description: null,
          source: 'https://example.com/new',
          file_type: 'pdf',
          created_at: '2026-03-02T12:00:00Z',
          updated_at: '2026-03-02T12:00:00Z',
        },
      ];

      render(<NewsList items={items} />);

      const cards = screen.getAllByTestId(/^news-card-/);
      expect(cards[0]).toHaveAttribute('data-title', 'New News');
      expect(cards[1]).toHaveAttribute('data-title', 'Old News');
    });
  });

  describe('expand / collapse', () => {
    it('shows "View all" button when items exceed maxItems', () => {
      const items = createMockItems(8);
      render(<NewsList items={items} maxItems={5} />);

      expect(screen.getByText(/View all 8 articles/)).toBeInTheDocument();
    });

    it('does not show "View all" when items fit within maxItems', () => {
      const items = createMockItems(3);
      render(<NewsList items={items} maxItems={5} />);

      expect(screen.queryByText(/View all/)).not.toBeInTheDocument();
    });

    it('expands to show all items on click', () => {
      const items = createMockItems(8);
      render(<NewsList items={items} maxItems={5} />);

      fireEvent.click(screen.getByText(/View all 8 articles/));

      const cards = screen.getAllByTestId(/^news-card-/);
      expect(cards).toHaveLength(8);
    });

    it('collapses back to maxItems on second click', () => {
      const items = createMockItems(8);
      render(<NewsList items={items} maxItems={5} />);

      fireEvent.click(screen.getByText(/View all 8 articles/));
      fireEvent.click(screen.getByText(/Show less/));

      const cards = screen.getAllByTestId(/^news-card-/);
      expect(cards).toHaveLength(5);
    });

    it('toggle button has aria-expanded attribute', () => {
      const items = createMockItems(8);
      render(<NewsList items={items} maxItems={5} />);

      const toggleBtn = screen.getByText(/View all/);
      expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(toggleBtn);
      expect(screen.getByText(/Show less/)).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });

  describe('loading state', () => {
    it('renders skeleton cards when loading', () => {
      const { container } = render(
        <NewsList items={[]} isLoading maxItems={3} />
      );

      expect(
        container.querySelector('.news-list__skeleton')
      ).toBeInTheDocument();
      expect(
        container.querySelectorAll('.news-list__skeleton-card')
      ).toHaveLength(3);
    });

    it('sets aria-busy when loading', () => {
      const { container } = render(
        <NewsList items={[]} isLoading testId="loading-list" />
      );

      expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('renders error message when isError is true', () => {
      render(<NewsList items={[]} isError />);

      expect(
        screen.getByText(/Failed to load market news/)
      ).toBeInTheDocument();
    });

    it('renders retry button when onRetry is provided', () => {
      const onRetry = vi.fn();
      render(<NewsList items={[]} isError onRetry={onRetry} />);

      const retryBtn = screen.getByText('Retry');
      expect(retryBtn).toBeInTheDocument();

      fireEvent.click(retryBtn);
      expect(onRetry).toHaveBeenCalledOnce();
    });

    it('does not render retry button without onRetry', () => {
      render(<NewsList items={[]} isError />);

      expect(screen.queryByText('Retry')).not.toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('renders empty message when no items', () => {
      render(<NewsList items={[]} />);

      expect(screen.getByText('No market news available')).toBeInTheDocument();
    });
  });

  describe('onViewAll', () => {
    it('calls onViewAll instead of inline expand when provided', () => {
      const onViewAll = vi.fn();
      const items = createMockItems(8);
      render(<NewsList items={items} maxItems={5} onViewAll={onViewAll} />);

      fireEvent.click(screen.getByText(/View all 8 articles/));

      expect(onViewAll).toHaveBeenCalledOnce();
    });

    it('does not expand inline when onViewAll is provided', () => {
      const onViewAll = vi.fn();
      const items = createMockItems(8);
      render(<NewsList items={items} maxItems={5} onViewAll={onViewAll} />);

      fireEvent.click(screen.getByText(/View all 8 articles/));

      const cards = screen.getAllByTestId(/^news-card-/);
      expect(cards).toHaveLength(5);
    });
  });
});
