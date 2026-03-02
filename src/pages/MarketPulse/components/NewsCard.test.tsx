import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewsCard } from './NewsCard';
import type { MarketTrend } from '../../../services/api';

// Mock formatters — keep the real logic but control dates via items
vi.mock('../utils/formatters', () => ({
  formatRelativeTime: (iso: string) => `mocked-time-${iso.slice(0, 10)}`,
  extractDomain: (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'Unknown source';
    }
  },
}));

const mockItem: MarketTrend = {
  id: 'd5187c0a-d93d-454c-a8f5-315fd5845573',
  title: 'Visa to be anchor investor in PayPay IPO',
  description:
    'Visa is reportedly joining Qatar Holding and the Abu Dhabi Investment Authority to invest more than $200 million.',
  source: 'https://www.finextra.com/newsarticle/47377/visa-paypay-ipo',
  file_type: 'pdf',
  created_at: '2026-03-02T12:44:48.696241',
  updated_at: '2026-03-02T12:44:48.696241',
};

describe('NewsCard', () => {
  describe('rendering', () => {
    it('renders the news title', () => {
      render(<NewsCard item={mockItem} />);
      expect(
        screen.getByText('Visa to be anchor investor in PayPay IPO')
      ).toBeInTheDocument();
    });

    it('renders the description in default mode', () => {
      render(<NewsCard item={mockItem} />);
      expect(screen.getByText(/Visa is reportedly joining/)).toBeInTheDocument();
    });

    it('hides description in compact mode', () => {
      render(<NewsCard item={mockItem} compact />);
      expect(
        screen.queryByText(/Visa is reportedly joining/)
      ).not.toBeInTheDocument();
    });

    it('renders source domain', () => {
      render(<NewsCard item={mockItem} />);
      expect(screen.getByText('finextra.com')).toBeInTheDocument();
    });

    it('renders relative time', () => {
      render(<NewsCard item={mockItem} />);
      expect(
        screen.getByText('mocked-time-2026-03-02')
      ).toBeInTheDocument();
    });

    it('renders "Read article" text', () => {
      render(<NewsCard item={mockItem} />);
      expect(screen.getByText('Read article')).toBeInTheDocument();
    });

    it('renders with testId', () => {
      render(<NewsCard item={mockItem} testId="test-card" />);
      expect(screen.getByTestId('test-card')).toBeInTheDocument();
    });
  });

  describe('classes', () => {
    it('has news-card class', () => {
      const { container } = render(<NewsCard item={mockItem} />);
      expect(container.querySelector('.news-card')).toBeInTheDocument();
    });

    it('adds compact class when compact prop is true', () => {
      const { container } = render(<NewsCard item={mockItem} compact />);
      expect(
        container.querySelector('.news-card--compact')
      ).toBeInTheDocument();
    });

    it('does not have compact class by default', () => {
      const { container } = render(<NewsCard item={mockItem} />);
      expect(
        container.querySelector('.news-card--compact')
      ).not.toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    it('opens source URL in new tab on click', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      render(<NewsCard item={mockItem} />);

      fireEvent.click(screen.getByRole('link'));

      expect(openSpy).toHaveBeenCalledWith(
        mockItem.source,
        '_blank',
        'noopener,noreferrer'
      );
      openSpy.mockRestore();
    });

    it('opens source URL on Enter key', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      render(<NewsCard item={mockItem} />);

      fireEvent.keyDown(screen.getByRole('link'), { key: 'Enter' });

      expect(openSpy).toHaveBeenCalledWith(
        mockItem.source,
        '_blank',
        'noopener,noreferrer'
      );
      openSpy.mockRestore();
    });

    it('opens source URL on Space key', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      render(<NewsCard item={mockItem} />);

      fireEvent.keyDown(screen.getByRole('link'), { key: ' ' });

      expect(openSpy).toHaveBeenCalledWith(
        mockItem.source,
        '_blank',
        'noopener,noreferrer'
      );
      openSpy.mockRestore();
    });
  });

  describe('accessibility', () => {
    it('has role="link"', () => {
      render(<NewsCard item={mockItem} />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('has tabIndex of 0', () => {
      render(<NewsCard item={mockItem} />);
      expect(screen.getByRole('link')).toHaveAttribute('tabindex', '0');
    });

    it('has aria-label mentioning new tab', () => {
      render(<NewsCard item={mockItem} />);
      expect(screen.getByRole('link')).toHaveAttribute(
        'aria-label',
        expect.stringContaining('Opens in new tab')
      );
    });

    it('renders time element with datetime attribute', () => {
      const { container } = render(<NewsCard item={mockItem} />);
      const timeEl = container.querySelector('time');
      expect(timeEl).toBeInTheDocument();
      expect(timeEl).toHaveAttribute('datetime', mockItem.created_at);
    });
  });
});
