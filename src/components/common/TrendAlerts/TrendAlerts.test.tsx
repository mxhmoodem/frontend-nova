import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrendAlerts } from './TrendAlerts';
import type { TrendAlert } from './TrendAlerts.types';

const mockAlerts: TrendAlert[] = [
  {
    id: '1',
    metric: 'Open Banking',
    change: 34,
    direction: 'up',
    period: 'MoM',
    context: 'Strong adoption in retail sector',
  },
  {
    id: '2',
    metric: 'Cash Usage',
    change: 12,
    direction: 'down',
    period: 'YoY',
  },
  {
    id: '3',
    metric: 'Card Transactions',
    change: 8,
    direction: 'up',
    period: 'QoQ',
  },
];

describe('TrendAlerts', () => {
  describe('Rendering', () => {
    it('should render with title', () => {
      render(<TrendAlerts title="Notable Changes" alerts={mockAlerts} />);

      expect(screen.getByText('Notable Changes')).toBeInTheDocument();
    });

    it('should render all alerts', () => {
      render(<TrendAlerts title="Trends" alerts={mockAlerts} />);

      expect(screen.getByText('Open Banking')).toBeInTheDocument();
      expect(screen.getByText('Cash Usage')).toBeInTheDocument();
      expect(screen.getByText('Card Transactions')).toBeInTheDocument();
    });

    it('should display change percentages with correct formatting', () => {
      render(<TrendAlerts title="Trends" alerts={mockAlerts} />);

      expect(screen.getByText('+34%')).toBeInTheDocument();
      expect(screen.getByText('-12%')).toBeInTheDocument();
      expect(screen.getByText('+8%')).toBeInTheDocument();
    });

    it('should display period labels', () => {
      render(<TrendAlerts title="Trends" alerts={mockAlerts} />);

      expect(screen.getByText('MoM')).toBeInTheDocument();
      expect(screen.getByText('YoY')).toBeInTheDocument();
      expect(screen.getByText('QoQ')).toBeInTheDocument();
    });

    it('should render context when provided', () => {
      render(<TrendAlerts title="Trends" alerts={mockAlerts} />);

      expect(
        screen.getByText('Strong adoption in retail sector')
      ).toBeInTheDocument();
    });

    it('should not render context when not provided', () => {
      const alertsWithoutContext: TrendAlert[] = [
        { id: '1', metric: 'Test', change: 10, direction: 'up', period: 'MoM' },
      ];

      const { container } = render(
        <TrendAlerts title="Trends" alerts={alertsWithoutContext} />
      );

      expect(
        container.querySelector('.trend-alerts__alert-context')
      ).not.toBeInTheDocument();
    });
  });

  describe('Direction Styling', () => {
    it('should apply up direction class for positive trends', () => {
      const { container } = render(
        <TrendAlerts
          title="Trends"
          alerts={[
            {
              id: '1',
              metric: 'Test',
              change: 10,
              direction: 'up',
              period: 'MoM',
            },
          ]}
        />
      );

      expect(
        container.querySelector('.trend-alerts__alert--up')
      ).toBeInTheDocument();
    });

    it('should apply down direction class for negative trends', () => {
      const { container } = render(
        <TrendAlerts
          title="Trends"
          alerts={[
            {
              id: '1',
              metric: 'Test',
              change: 5,
              direction: 'down',
              period: 'YoY',
            },
          ]}
        />
      );

      expect(
        container.querySelector('.trend-alerts__alert--down')
      ).toBeInTheDocument();
    });

    it('should format up changes with plus sign', () => {
      render(
        <TrendAlerts
          title="Trends"
          alerts={[
            {
              id: '1',
              metric: 'Test',
              change: 15,
              direction: 'up',
              period: 'MoM',
            },
          ]}
        />
      );

      expect(screen.getByText('+15%')).toBeInTheDocument();
    });

    it('should format down changes with minus sign', () => {
      render(
        <TrendAlerts
          title="Trends"
          alerts={[
            {
              id: '1',
              metric: 'Test',
              change: 7,
              direction: 'down',
              period: 'MoM',
            },
          ]}
        />
      );

      expect(screen.getByText('-7%')).toBeInTheDocument();
    });
  });

  describe('Source Attribution', () => {
    it('should display source name', () => {
      render(
        <TrendAlerts
          title="Trends"
          alerts={mockAlerts}
          source={{ name: 'UK Finance' }}
        />
      );

      expect(screen.getByText('UK Finance')).toBeInTheDocument();
      expect(screen.getByText('Source:')).toBeInTheDocument();
    });

    it('should render source as link when URL provided', () => {
      render(
        <TrendAlerts
          title="Trends"
          alerts={mockAlerts}
          source={{
            name: 'Pay.UK',
            url: 'https://www.wearepay.uk',
          }}
        />
      );

      const link = screen.getByRole('link', { name: 'Pay.UK' });
      expect(link).toHaveAttribute('href', 'https://www.wearepay.uk');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should not render footer when no source provided', () => {
      const { container } = render(
        <TrendAlerts title="Trends" alerts={mockAlerts} />
      );

      expect(
        container.querySelector('.trend-alerts__footer')
      ).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have correct test id', () => {
      render(
        <TrendAlerts title="Trends" alerts={mockAlerts} testId="trend-alerts" />
      );

      expect(screen.getByTestId('trend-alerts')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <TrendAlerts
          title="Trends"
          alerts={mockAlerts}
          className="custom-class"
        />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should have heading element for title', () => {
      render(<TrendAlerts title="Market Trends" alerts={mockAlerts} />);

      expect(
        screen.getByRole('heading', { name: 'Market Trends' })
      ).toBeInTheDocument();
    });

    it('should render as unordered list', () => {
      render(<TrendAlerts title="Trends" alerts={mockAlerts} />);

      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty alerts array', () => {
      const { container } = render(
        <TrendAlerts title="No Trends" alerts={[]} />
      );

      expect(screen.getByText('No Trends')).toBeInTheDocument();
      expect(container.querySelectorAll('.trend-alerts__alert')).toHaveLength(
        0
      );
    });

    it('should handle 0% change', () => {
      render(
        <TrendAlerts
          title="Trends"
          alerts={[
            {
              id: '1',
              metric: 'Stable',
              change: 0,
              direction: 'up',
              period: 'MoM',
            },
          ]}
        />
      );

      expect(screen.getByText('+0%')).toBeInTheDocument();
    });

    it('should handle large percentage changes', () => {
      render(
        <TrendAlerts
          title="Trends"
          alerts={[
            {
              id: '1',
              metric: 'Big Move',
              change: 250,
              direction: 'up',
              period: 'YoY',
            },
          ]}
        />
      );

      expect(screen.getByText('+250%')).toBeInTheDocument();
    });
  });
});
