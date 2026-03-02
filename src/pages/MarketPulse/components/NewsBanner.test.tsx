import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { NewsBanner } from './NewsBanner';
import type { MarketTrend } from '../../../services/api';

// Mock formatters
vi.mock('../utils/formatters', () => ({
  formatRelativeTime: () => '2 hours ago',
  extractDomain: (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'Unknown source';
    }
  },
}));

const createMockItems = (count: number): MarketTrend[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `id-${i}`,
    title: `Headline ${i + 1}`,
    description: `Description for headline ${i + 1}`,
    source: `https://example.com/article-${i}`,
    file_type: 'pdf' as const,
    created_at: new Date(2026, 2, 2, 12 - i).toISOString(),
    updated_at: new Date(2026, 2, 2, 12 - i).toISOString(),
  }));

describe('NewsBanner', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders the first (most recent) headline', () => {
      const items = createMockItems(3);
      render(<NewsBanner items={items} />);

      expect(screen.getByText('Headline 1')).toBeInTheDocument();
    });

    it('renders description', () => {
      const items = createMockItems(2);
      render(<NewsBanner items={items} />);

      expect(
        screen.getByText('Description for headline 1')
      ).toBeInTheDocument();
    });

    it('renders source domain', () => {
      const items = createMockItems(1);
      render(<NewsBanner items={items} />);

      expect(screen.getByText('example.com')).toBeInTheDocument();
    });

    it('renders "Latest News" label', () => {
      const items = createMockItems(1);
      render(<NewsBanner items={items} />);

      expect(screen.getByText('Latest News')).toBeInTheDocument();
    });

    it('renders "Read More" link', () => {
      const items = createMockItems(1);
      render(<NewsBanner items={items} />);

      expect(screen.getByText('Read More')).toBeInTheDocument();
    });

    it('renders with testId', () => {
      const items = createMockItems(1);
      render(<NewsBanner items={items} testId="test-banner" />);

      expect(screen.getByTestId('test-banner')).toBeInTheDocument();
    });

    it('returns null when no items', () => {
      const { container } = render(<NewsBanner items={[]} />);

      expect(container.querySelector('.news-banner')).not.toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('shows navigation buttons when multiple items', () => {
      const items = createMockItems(3);
      render(<NewsBanner items={items} />);

      expect(
        screen.getByLabelText('Previous headline')
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Next headline')).toBeInTheDocument();
    });

    it('does not show navigation with single item', () => {
      const items = createMockItems(1);
      render(<NewsBanner items={items} />);

      expect(
        screen.queryByLabelText('Previous headline')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByLabelText('Next headline')
      ).not.toBeInTheDocument();
    });

    it('advances to next headline on "Next" click', () => {
      const items = createMockItems(3);
      render(<NewsBanner items={items} />);

      expect(screen.getByText('Headline 1')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Next headline'));

      expect(screen.getByText('Headline 2')).toBeInTheDocument();
    });

    it('goes to previous headline on "Previous" click', () => {
      const items = createMockItems(3);
      render(<NewsBanner items={items} />);

      // Go forward then back
      fireEvent.click(screen.getByLabelText('Next headline'));
      expect(screen.getByText('Headline 2')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Previous headline'));
      expect(screen.getByText('Headline 1')).toBeInTheDocument();
    });

    it('wraps around from last to first', () => {
      const items = createMockItems(2);
      render(<NewsBanner items={items} />);

      fireEvent.click(screen.getByLabelText('Next headline'));
      expect(screen.getByText('Headline 2')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Next headline'));
      expect(screen.getByText('Headline 1')).toBeInTheDocument();
    });

    it('renders indicator dots (max 5)', () => {
      const items = createMockItems(3);
      const { container } = render(<NewsBanner items={items} />);

      const dots = container.querySelectorAll('.news-banner__dot');
      expect(dots).toHaveLength(3);
    });

    it('highlights active indicator dot', () => {
      const items = createMockItems(3);
      const { container } = render(<NewsBanner items={items} />);

      const activeDots = container.querySelectorAll(
        '.news-banner__dot--active'
      );
      expect(activeDots).toHaveLength(1);
    });
  });

  describe('auto-rotate', () => {
    it('auto-rotates to next item after interval', () => {
      const items = createMockItems(3);
      render(<NewsBanner items={items} autoRotateMs={5000} />);

      expect(screen.getByText('Headline 1')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(screen.getByText('Headline 2')).toBeInTheDocument();
    });

    it('pauses auto-rotate on mouse enter', () => {
      const items = createMockItems(3);
      const { container } = render(
        <NewsBanner items={items} autoRotateMs={5000} />
      );

      fireEvent.mouseEnter(container.querySelector('.news-banner')!);

      act(() => {
        vi.advanceTimersByTime(10000);
      });

      // Should still be on the first item
      expect(screen.getByText('Headline 1')).toBeInTheDocument();
    });

    it('resumes auto-rotate on mouse leave', () => {
      const items = createMockItems(3);
      const { container } = render(
        <NewsBanner items={items} autoRotateMs={5000} />
      );

      fireEvent.mouseEnter(container.querySelector('.news-banner')!);
      fireEvent.mouseLeave(container.querySelector('.news-banner')!);

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(screen.getByText('Headline 2')).toBeInTheDocument();
    });
  });

  describe('click behavior', () => {
    it('opens source URL on content click', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      const items = createMockItems(1);
      render(<NewsBanner items={items} />);

      fireEvent.click(screen.getByRole('link'));

      expect(openSpy).toHaveBeenCalledWith(
        items[0].source,
        '_blank',
        'noopener,noreferrer'
      );
      openSpy.mockRestore();
    });
  });

  describe('loading state', () => {
    it('renders skeleton when loading', () => {
      const { container } = render(
        <NewsBanner items={[]} isLoading testId="loading-banner" />
      );

      expect(
        container.querySelector('.news-banner--loading')
      ).toBeInTheDocument();
      expect(
        container.querySelector('.news-banner__skeleton-title')
      ).toBeInTheDocument();
    });

    it('sets aria-busy when loading', () => {
      const { container } = render(
        <NewsBanner items={[]} isLoading />
      );

      expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has aria-live="polite" for auto-rotation', () => {
      const items = createMockItems(2);
      const { container } = render(<NewsBanner items={items} />);

      expect(
        container.querySelector('[aria-live="polite"]')
      ).toBeInTheDocument();
    });

    it('content area has role="link"', () => {
      const items = createMockItems(1);
      render(<NewsBanner items={items} />);

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('content area has aria-label mentioning new tab', () => {
      const items = createMockItems(1);
      render(<NewsBanner items={items} />);

      expect(screen.getByRole('link')).toHaveAttribute(
        'aria-label',
        expect.stringContaining('Opens in new tab')
      );
    });

    it('navigation has aria-label', () => {
      const items = createMockItems(3);
      render(<NewsBanner items={items} />);

      expect(
        screen.getByLabelText('News navigation')
      ).toBeInTheDocument();
    });
  });
});
