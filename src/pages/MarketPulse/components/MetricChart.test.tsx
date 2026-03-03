import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricChart } from './MetricChart';
import type { MetricHistory, MetricKey } from '../../../services/api';

// Mock ag-charts-react
vi.mock('ag-charts-react', () => ({
  AgCharts: ({ options }: { options: unknown }) => (
    <div data-testid="ag-chart" data-options={JSON.stringify(options)} />
  ),
}));

describe('MetricChart', () => {
  const mockHistory: MetricHistory = {
    metric_name: 'Consumer Credit',
    unit: 'millions_gbp',
    data: [
      { date: '2025-01-01', value: 1000 },
      { date: '2025-02-01', value: 1050 },
      { date: '2025-03-01', value: 1100 },
    ],
  };

  const defaultProps = {
    metricKey: 'total_consumer_credit' as MetricKey,
    history: mockHistory,
    color: '#3B82F6',
  };

  describe('rendering', () => {
    it('renders chart title', () => {
      render(<MetricChart {...defaultProps} />);

      expect(screen.getByText('Consumer Credit')).toBeInTheDocument();
    });

    it('renders formatted value', () => {
      render(<MetricChart {...defaultProps} />);

      // Latest value is 1100 millions_gbp = £1.1B
      expect(screen.getByText('£1.1B')).toBeInTheDocument();
    });

    it('renders AG Charts component', () => {
      render(<MetricChart {...defaultProps} />);

      expect(screen.getByTestId('ag-chart')).toBeInTheDocument();
    });

    it('applies data-metric attribute', () => {
      const { container } = render(<MetricChart {...defaultProps} />);

      expect(
        container.querySelector('[data-metric="total_consumer_credit"]')
      ).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('shows empty state when no data', () => {
      render(
        <MetricChart {...defaultProps} history={{ ...mockHistory, data: [] }} />
      );

      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('applies empty class when no data', () => {
      const { container } = render(
        <MetricChart {...defaultProps} history={{ ...mockHistory, data: [] }} />
      );

      expect(
        container.querySelector('.metric-chart--empty')
      ).toBeInTheDocument();
    });

    it('still shows title in empty state', () => {
      render(
        <MetricChart {...defaultProps} history={{ ...mockHistory, data: [] }} />
      );

      expect(screen.getByText('Consumer Credit')).toBeInTheDocument();
    });
  });

  describe('change calculation', () => {
    it('shows positive change indicator', () => {
      render(<MetricChart {...defaultProps} />);

      // Change from 1050 to 1100 is ~4.8%
      const changeText = screen.getByText(/4\.8%/);
      expect(changeText).toBeInTheDocument();
    });

    it('shows negative change indicator', () => {
      const decreasingHistory: MetricHistory = {
        ...mockHistory,
        data: [
          { date: '2025-01-01', value: 1000 },
          { date: '2025-02-01', value: 1100 },
          { date: '2025-03-01', value: 1000 },
        ],
      };

      render(<MetricChart {...defaultProps} history={decreasingHistory} />);

      // Change from 1100 to 1000 is ~-9.1%
      const changeText = screen.getByText(/9\.1%/);
      expect(changeText).toBeInTheDocument();
    });
  });

  describe('unit formatting', () => {
    it('formats percent values correctly', () => {
      const percentHistory: MetricHistory = {
        metric_name: 'Bank Rate',
        unit: 'percent',
        data: [
          { date: '2025-01-01', value: 4.5 },
          { date: '2025-02-01', value: 4.75 },
        ],
      };

      render(
        <MetricChart
          metricKey="bank_rate"
          history={percentHistory}
          color="#F59E0B"
        />
      );

      expect(screen.getByText('4.75%')).toBeInTheDocument();
    });

    it('formats thousands values correctly', () => {
      const thousandsHistory: MetricHistory = {
        metric_name: 'Mortgage Approvals',
        unit: 'thousands',
        data: [
          { date: '2025-01-01', value: 65000 },
          { date: '2025-02-01', value: 67000 },
        ],
      };

      render(
        <MetricChart
          metricKey="mortgage_approvals"
          history={thousandsHistory}
          color="#10B981"
        />
      );

      expect(screen.getByText('67,000')).toBeInTheDocument();
    });
  });
});
