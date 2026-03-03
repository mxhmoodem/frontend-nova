import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MetricTabs } from './MetricTabs';
import type { MetricKey } from '../../../services/api';

const defaultMetrics: MetricKey[] = [
  'total_consumer_credit',
  'credit_card_lending',
  'mortgage_approvals',
  'bank_rate',
];

const defaultColors: Record<MetricKey, string> = {
  total_consumer_credit: '#5B8DEF',
  credit_card_lending: '#9B59B6',
  mortgage_approvals: '#2ECC71',
  bank_rate: '#E67E22',
};

describe('MetricTabs', () => {
  const setup = (overrides: Partial<Parameters<typeof MetricTabs>[0]> = {}) =>
    render(
      <MetricTabs
        activeMetric="total_consumer_credit"
        onChange={vi.fn()}
        metrics={defaultMetrics}
        colors={defaultColors}
        {...overrides}
      />
    );

  describe('rendering', () => {
    it('renders all metric tabs', () => {
      setup();

      expect(screen.getByText('Consumer Credit')).toBeInTheDocument();
      expect(screen.getByText('Credit Cards')).toBeInTheDocument();
      expect(screen.getByText('Mortgages')).toBeInTheDocument();
      expect(screen.getByText('Bank Rate')).toBeInTheDocument();
    });

    it('renders with role="tablist"', () => {
      setup();

      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders each tab with role="tab"', () => {
      setup();

      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(4);
    });

    it('renders color indicator for each tab', () => {
      const { container } = setup();

      const indicators = container.querySelectorAll('.metric-tabs__indicator');
      expect(indicators).toHaveLength(4);
    });

    it('applies correct color to indicator', () => {
      const { container } = setup();

      const indicators = container.querySelectorAll('.metric-tabs__indicator');
      expect(indicators[0]).toHaveStyle({
        backgroundColor: '#5B8DEF',
      });
      expect(indicators[3]).toHaveStyle({
        backgroundColor: '#E67E22',
      });
    });

    it('renders with testId', () => {
      setup({ testId: 'my-tabs' });

      expect(screen.getByTestId('my-tabs')).toBeInTheDocument();
    });
  });

  describe('active state', () => {
    it('marks active tab with aria-selected=true', () => {
      setup({ activeMetric: 'credit_card_lending' });

      const activeTab = screen
        .getByText('Credit Cards')
        .closest('[role="tab"]');
      expect(activeTab).toHaveAttribute('aria-selected', 'true');
    });

    it('marks inactive tabs with aria-selected=false', () => {
      setup({ activeMetric: 'credit_card_lending' });

      const inactiveTab = screen
        .getByText('Consumer Credit')
        .closest('[role="tab"]');
      expect(inactiveTab).toHaveAttribute('aria-selected', 'false');
    });

    it('applies active class to selected tab', () => {
      setup({ activeMetric: 'mortgage_approvals' });

      const activeTab = screen.getByText('Mortgages').closest('[role="tab"]');
      expect(activeTab).toHaveClass('metric-tabs__tab--active');
    });

    it('active tab has tabIndex=0, others have tabIndex=-1', () => {
      setup({ activeMetric: 'bank_rate' });

      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab) => {
        if (tab.textContent?.includes('Bank Rate')) {
          expect(tab).toHaveAttribute('tabindex', '0');
        } else {
          expect(tab).toHaveAttribute('tabindex', '-1');
        }
      });
    });
  });

  describe('interaction', () => {
    it('calls onChange when a tab is clicked', () => {
      const onChange = vi.fn();
      setup({ onChange });

      fireEvent.click(screen.getByText('Credit Cards'));

      expect(onChange).toHaveBeenCalledWith('credit_card_lending');
    });

    it('calls onChange only once per click', () => {
      const onChange = vi.fn();
      setup({ onChange });

      fireEvent.click(screen.getByText('Mortgages'));

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('keyboard navigation', () => {
    it('ArrowRight moves to next tab', () => {
      const onChange = vi.fn();
      setup({ activeMetric: 'total_consumer_credit', onChange });

      fireEvent.keyDown(screen.getByRole('tablist'), {
        key: 'ArrowRight',
      });

      expect(onChange).toHaveBeenCalledWith('credit_card_lending');
    });

    it('ArrowDown moves to next tab', () => {
      const onChange = vi.fn();
      setup({ activeMetric: 'total_consumer_credit', onChange });

      fireEvent.keyDown(screen.getByRole('tablist'), {
        key: 'ArrowDown',
      });

      expect(onChange).toHaveBeenCalledWith('credit_card_lending');
    });

    it('ArrowLeft moves to previous tab', () => {
      const onChange = vi.fn();
      setup({ activeMetric: 'credit_card_lending', onChange });

      fireEvent.keyDown(screen.getByRole('tablist'), {
        key: 'ArrowLeft',
      });

      expect(onChange).toHaveBeenCalledWith('total_consumer_credit');
    });

    it('ArrowUp moves to previous tab', () => {
      const onChange = vi.fn();
      setup({ activeMetric: 'credit_card_lending', onChange });

      fireEvent.keyDown(screen.getByRole('tablist'), {
        key: 'ArrowUp',
      });

      expect(onChange).toHaveBeenCalledWith('total_consumer_credit');
    });

    it('ArrowRight wraps from last to first', () => {
      const onChange = vi.fn();
      setup({ activeMetric: 'bank_rate', onChange });

      fireEvent.keyDown(screen.getByRole('tablist'), {
        key: 'ArrowRight',
      });

      expect(onChange).toHaveBeenCalledWith('total_consumer_credit');
    });

    it('ArrowLeft wraps from first to last', () => {
      const onChange = vi.fn();
      setup({ activeMetric: 'total_consumer_credit', onChange });

      fireEvent.keyDown(screen.getByRole('tablist'), {
        key: 'ArrowLeft',
      });

      expect(onChange).toHaveBeenCalledWith('bank_rate');
    });
  });

  describe('accessibility', () => {
    it('tablist has aria-label', () => {
      setup();

      expect(screen.getByRole('tablist')).toHaveAttribute(
        'aria-label',
        'Metric selection'
      );
    });

    it('all tabs are buttons', () => {
      setup();

      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab) => {
        expect(tab.tagName).toBe('BUTTON');
        expect(tab).toHaveAttribute('type', 'button');
      });
    });
  });
});
