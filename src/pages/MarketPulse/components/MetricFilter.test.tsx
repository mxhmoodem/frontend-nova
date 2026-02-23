import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MetricFilter } from './MetricFilter';
import type { MetricKey } from '../../../services/api';

describe('MetricFilter', () => {
  const allMetrics: MetricKey[] = [
    'total_consumer_credit',
    'credit_card_lending',
    'mortgage_approvals',
    'bank_rate',
  ];

  const defaultProps = {
    selected: allMetrics,
    onChange: vi.fn(),
  };

  describe('rendering', () => {
    it('renders trigger button with count', () => {
      render(<MetricFilter {...defaultProps} />);

      expect(screen.getByText('Metrics (4)')).toBeInTheDocument();
    });

    it('shows correct count when fewer metrics selected', () => {
      render(
        <MetricFilter
          {...defaultProps}
          selected={['bank_rate', 'mortgage_approvals']}
        />
      );

      expect(screen.getByText('Metrics (2)')).toBeInTheDocument();
    });

    it('does not show dropdown by default', () => {
      render(<MetricFilter {...defaultProps} />);

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('has correct aria attributes on trigger', () => {
      render(<MetricFilter {...defaultProps} />);

      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    });
  });

  describe('dropdown', () => {
    it('opens dropdown when trigger is clicked', () => {
      render(<MetricFilter {...defaultProps} />);

      fireEvent.click(screen.getByText('Metrics (4)'));

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('shows all metric options', () => {
      render(<MetricFilter {...defaultProps} />);
      fireEvent.click(screen.getByText('Metrics (4)'));

      expect(screen.getByText('Consumer Credit')).toBeInTheDocument();
      expect(screen.getByText('Credit Card Lending')).toBeInTheDocument();
      expect(screen.getByText('Mortgage Approvals')).toBeInTheDocument();
      expect(screen.getByText('Bank Rate')).toBeInTheDocument();
    });

    it('closes dropdown when trigger is clicked again', () => {
      render(<MetricFilter {...defaultProps} />);

      fireEvent.click(screen.getByText('Metrics (4)'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Metrics (4)'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('shows Select All and Clear actions', () => {
      render(<MetricFilter {...defaultProps} />);
      fireEvent.click(screen.getByText('Metrics (4)'));

      expect(screen.getByText('Select All')).toBeInTheDocument();
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onChange when unchecking a metric', () => {
      const onChange = vi.fn();
      render(<MetricFilter selected={allMetrics} onChange={onChange} />);
      fireEvent.click(screen.getByText('Metrics (4)'));

      // Click on the Bank Rate label to uncheck it
      fireEvent.click(screen.getByText('Bank Rate'));

      expect(onChange).toHaveBeenCalledWith([
        'total_consumer_credit',
        'credit_card_lending',
        'mortgage_approvals',
      ]);
    });

    it('calls onChange when checking a metric', () => {
      const onChange = vi.fn();
      render(
        <MetricFilter
          selected={['total_consumer_credit']}
          onChange={onChange}
        />
      );
      fireEvent.click(screen.getByText('Metrics (1)'));

      fireEvent.click(screen.getByText('Bank Rate'));

      expect(onChange).toHaveBeenCalledWith([
        'total_consumer_credit',
        'bank_rate',
      ]);
    });

    it('calls onChange with all metrics when Select All is clicked', () => {
      const onChange = vi.fn();
      render(<MetricFilter selected={[]} onChange={onChange} />);
      fireEvent.click(screen.getByText('Metrics (0)'));

      fireEvent.click(screen.getByText('Select All'));

      expect(onChange).toHaveBeenCalledWith(allMetrics);
    });

    it('calls onChange with empty array when Clear is clicked', () => {
      const onChange = vi.fn();
      render(<MetricFilter selected={allMetrics} onChange={onChange} />);
      fireEvent.click(screen.getByText('Metrics (4)'));

      fireEvent.click(screen.getByText('Clear'));

      expect(onChange).toHaveBeenCalledWith([]);
    });
  });

  describe('checkbox state', () => {
    it('shows checked state for selected metrics', () => {
      render(
        <MetricFilter
          {...defaultProps}
          selected={['bank_rate', 'mortgage_approvals']}
        />
      );
      fireEvent.click(screen.getByRole('button'));

      const checkboxes = screen.getAllByRole('checkbox');
      const bankRateCheckbox = checkboxes.find(
        (cb) => cb.nextElementSibling?.textContent === 'Bank Rate'
      );
      const mortgageCheckbox = checkboxes.find(
        (cb) => cb.nextElementSibling?.textContent === 'Mortgage Approvals'
      );
      const creditCheckbox = checkboxes.find(
        (cb) => cb.nextElementSibling?.textContent === 'Consumer Credit'
      );

      expect(bankRateCheckbox).toBeChecked();
      expect(mortgageCheckbox).toBeChecked();
      expect(creditCheckbox).not.toBeChecked();
    });
  });
});
