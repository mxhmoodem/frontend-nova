import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimeRangeSelector } from './TimeRangeSelector';

describe('TimeRangeSelector', () => {
  const defaultProps = {
    value: 12 as const,
    onChange: vi.fn(),
  };

  describe('rendering', () => {
    it('renders all time range options', () => {
      render(<TimeRangeSelector {...defaultProps} />);

      expect(screen.getByText('3M')).toBeInTheDocument();
      expect(screen.getByText('6M')).toBeInTheDocument();
      expect(screen.getByText('12M')).toBeInTheDocument();
      expect(screen.getByText('24M')).toBeInTheDocument();
    });

    it('marks the selected option as active', () => {
      render(<TimeRangeSelector {...defaultProps} value={6} />);

      const button6M = screen.getByText('6M');
      expect(button6M).toHaveClass('time-range-selector__btn--active');
    });

    it('sets aria-pressed on selected option', () => {
      render(<TimeRangeSelector {...defaultProps} value={12} />);

      const button12M = screen.getByText('12M');
      expect(button12M).toHaveAttribute('aria-pressed', 'true');

      const button3M = screen.getByText('3M');
      expect(button3M).toHaveAttribute('aria-pressed', 'false');
    });

    it('has group role with label', () => {
      render(<TimeRangeSelector {...defaultProps} />);

      const group = screen.getByRole('group', { name: 'Time range' });
      expect(group).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onChange when a different option is clicked', () => {
      const onChange = vi.fn();
      render(<TimeRangeSelector value={12} onChange={onChange} />);

      fireEvent.click(screen.getByText('3M'));

      expect(onChange).toHaveBeenCalledWith(3);
    });

    it('calls onChange when clicking the same option', () => {
      const onChange = vi.fn();
      render(<TimeRangeSelector value={12} onChange={onChange} />);

      fireEvent.click(screen.getByText('12M'));

      expect(onChange).toHaveBeenCalledWith(12);
    });

    it('calls onChange with correct value for each option', () => {
      const onChange = vi.fn();
      render(<TimeRangeSelector value={12} onChange={onChange} />);

      fireEvent.click(screen.getByText('6M'));
      expect(onChange).toHaveBeenLastCalledWith(6);

      fireEvent.click(screen.getByText('24M'));
      expect(onChange).toHaveBeenLastCalledWith(24);
    });
  });
});
