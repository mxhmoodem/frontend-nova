import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DateRangePicker } from './DateRangePicker';
import type { DateRange, AvailableDateRange } from './DateRangePicker';

describe('DateRangePicker', () => {
  const defaultValue: DateRange = {
    fromMonth: 1,
    fromYear: 2025,
    toMonth: 12,
    toYear: 2025,
  };

  const defaultProps = {
    value: defaultValue,
    onChange: vi.fn(),
  };

  describe('rendering', () => {
    it('renders trigger button with formatted date range', () => {
      render(<DateRangePicker {...defaultProps} />);

      expect(screen.getByText('Jan 2025 – Dec 2025')).toBeInTheDocument();
    });

    it('renders calendar icon', () => {
      const { container } = render(<DateRangePicker {...defaultProps} />);

      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('does not show dropdown by default', () => {
      render(<DateRangePicker {...defaultProps} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('has correct aria attributes on trigger', () => {
      render(<DateRangePicker {...defaultProps} />);

      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    });
  });

  describe('dropdown', () => {
    it('opens dropdown when trigger is clicked', () => {
      render(<DateRangePicker {...defaultProps} />);

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('shows From and To sections', () => {
      render(<DateRangePicker {...defaultProps} />);
      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByText('From')).toBeInTheDocument();
      expect(screen.getByText('To')).toBeInTheDocument();
    });

    it('shows Apply and Cancel buttons', () => {
      render(<DateRangePicker {...defaultProps} />);
      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByText('Apply')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('has month and year selects', () => {
      render(<DateRangePicker {...defaultProps} />);
      fireEvent.click(screen.getByRole('button'));

      const selects = screen.getAllByRole('combobox');
      expect(selects).toHaveLength(4); // 2 for From (month, year), 2 for To (month, year)
    });
  });

  describe('interactions', () => {
    it('calls onChange with new range when Apply is clicked', () => {
      const onChange = vi.fn();
      render(<DateRangePicker value={defaultValue} onChange={onChange} />);

      fireEvent.click(screen.getByRole('button'));
      fireEvent.click(screen.getByText('Apply'));

      expect(onChange).toHaveBeenCalledWith(defaultValue);
    });

    it('closes dropdown when Cancel is clicked', () => {
      render(<DateRangePicker {...defaultProps} />);

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Cancel'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('does not call onChange when Cancel is clicked', () => {
      const onChange = vi.fn();
      render(<DateRangePicker value={defaultValue} onChange={onChange} />);

      fireEvent.click(screen.getByRole('button'));
      fireEvent.click(screen.getByText('Cancel'));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('closes dropdown after Apply', () => {
      render(<DateRangePicker {...defaultProps} />);

      fireEvent.click(screen.getByRole('button'));
      fireEvent.click(screen.getByText('Apply'));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('available range constraint', () => {
    const availableRange: AvailableDateRange = {
      minMonth: 3,
      minYear: 2024,
      maxMonth: 6,
      maxYear: 2025,
    };

    it('shows notice when availableRange is provided', () => {
      render(
        <DateRangePicker {...defaultProps} availableRange={availableRange} />
      );
      fireEvent.click(screen.getByRole('button'));

      expect(
        screen.getByText(/Data available: Mar 2024 – Jun 2025/)
      ).toBeInTheDocument();
    });

    it('disables months outside available range', () => {
      render(
        <DateRangePicker
          {...defaultProps}
          value={{ fromMonth: 3, fromYear: 2024, toMonth: 6, toYear: 2025 }}
          availableRange={availableRange}
        />
      );
      fireEvent.click(screen.getByRole('button'));

      // Find the "From" month select (first combobox)
      const selects = screen.getAllByRole('combobox');
      const fromMonthSelect = selects[0];

      // January and February 2024 should be disabled (no data)
      const options = fromMonthSelect.querySelectorAll('option');
      const januaryOption = Array.from(options).find((opt) =>
        opt.textContent?.includes('January')
      );
      const februaryOption = Array.from(options).find((opt) =>
        opt.textContent?.includes('February')
      );

      expect(januaryOption).toBeDisabled();
      expect(februaryOption).toBeDisabled();
    });
  });

  describe('date range validation', () => {
    it('swaps dates if from is after to', () => {
      const onChange = vi.fn();
      render(
        <DateRangePicker
          value={{ fromMonth: 12, fromYear: 2025, toMonth: 1, toYear: 2025 }}
          onChange={onChange}
        />
      );

      fireEvent.click(screen.getByRole('button'));
      fireEvent.click(screen.getByText('Apply'));

      // Should swap to make valid range
      expect(onChange).toHaveBeenCalledWith({
        fromMonth: 1,
        fromYear: 2025,
        toMonth: 12,
        toYear: 2025,
      });
    });
  });

  describe('display formatting', () => {
    it('formats different date ranges correctly', () => {
      const { rerender } = render(
        <DateRangePicker
          value={{ fromMonth: 6, fromYear: 2024, toMonth: 3, toYear: 2025 }}
          onChange={vi.fn()}
        />
      );

      expect(screen.getByText('Jun 2024 – Mar 2025')).toBeInTheDocument();

      rerender(
        <DateRangePicker
          value={{ fromMonth: 11, fromYear: 2023, toMonth: 2, toYear: 2024 }}
          onChange={vi.fn()}
        />
      );

      expect(screen.getByText('Nov 2023 – Feb 2024')).toBeInTheDocument();
    });
  });
});
