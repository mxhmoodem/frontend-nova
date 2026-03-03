import { useState, useEffect, useRef, useMemo } from 'react';
import { Calendar, ChevronDown, Info } from 'lucide-react';
import './DateRangePicker.css';

export interface DateRange {
  fromMonth: number; // 1-12
  fromYear: number;
  toMonth: number; // 1-12
  toYear: number;
}

export interface AvailableDateRange {
  minMonth: number;
  minYear: number;
  maxMonth: number;
  maxYear: number;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  minYear?: number;
  maxYear?: number;
  /** Constrain selection to available data range */
  availableRange?: AvailableDateRange;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function DateRangePicker({
  value,
  onChange,
  minYear = 2020,
  maxYear = new Date().getFullYear(),
  availableRange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localRange, setLocalRange] = useState<DateRange>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate effective min/max based on available data
  const effectiveMinYear = availableRange?.minYear ?? minYear;
  const effectiveMaxYear = availableRange?.maxYear ?? maxYear;

  // Sync local state when prop changes
  useEffect(() => {
    setLocalRange(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const years = Array.from(
    { length: effectiveMaxYear - effectiveMinYear + 1 },
    (_, i) => effectiveMaxYear - i
  );

  // Check if a month is available for selection based on year
  const isMonthAvailable = (month: number, year: number) => {
    if (!availableRange) return true;
    const dateVal = year * 12 + month;
    const minVal = availableRange.minYear * 12 + availableRange.minMonth;
    const maxVal = availableRange.maxYear * 12 + availableRange.maxMonth;
    return dateVal >= minVal && dateVal <= maxVal;
  };

  // Get available months for a given year
  const getAvailableMonths = useMemo(
    () => (year: number) => {
      if (!availableRange) return MONTHS.map((_, idx) => idx + 1);

      const available: number[] = [];
      for (let m = 1; m <= 12; m++) {
        const dateVal = year * 12 + m;
        const minVal = availableRange.minYear * 12 + availableRange.minMonth;
        const maxVal = availableRange.maxYear * 12 + availableRange.maxMonth;
        if (dateVal >= minVal && dateVal <= maxVal) {
          available.push(m);
        }
      }
      return available;
    },
    [availableRange]
  );

  // Format available range for display
  const availableRangeText = availableRange
    ? `${MONTHS[availableRange.minMonth - 1]?.slice(0, 3)} ${availableRange.minYear} – ${MONTHS[availableRange.maxMonth - 1]?.slice(0, 3)} ${availableRange.maxYear}`
    : null;

  const formatDisplay = () => {
    const fromStr = `${MONTHS[value.fromMonth - 1]?.slice(0, 3)} ${value.fromYear}`;
    const toStr = `${MONTHS[value.toMonth - 1]?.slice(0, 3)} ${value.toYear}`;
    return `${fromStr} – ${toStr}`;
  };

  const handleApply = () => {
    // Validate: from date should be before or equal to to date
    const fromDate = new Date(localRange.fromYear, localRange.fromMonth - 1);
    const toDate = new Date(localRange.toYear, localRange.toMonth - 1);

    if (fromDate > toDate) {
      // Swap if invalid
      onChange({
        fromMonth: localRange.toMonth,
        fromYear: localRange.toYear,
        toMonth: localRange.fromMonth,
        toYear: localRange.fromYear,
      });
    } else {
      onChange(localRange);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setLocalRange(value);
    setIsOpen(false);
  };

  return (
    <div className="date-range-picker" ref={dropdownRef}>
      <button
        type="button"
        className="date-range-picker__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Calendar size={16} />
        <span className="date-range-picker__display">{formatDisplay()}</span>
        <ChevronDown
          size={16}
          className={`date-range-picker__chevron ${isOpen ? 'date-range-picker__chevron--open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="date-range-picker__dropdown" role="dialog">
          {availableRange && (
            <div className="date-range-picker__notice">
              <Info size={14} />
              <span>
                Data available: {availableRangeText}. Bank of England publishes
                metrics at different intervals.
              </span>
            </div>
          )}

          <div className="date-range-picker__section">
            <label className="date-range-picker__label">From</label>
            <div className="date-range-picker__selects">
              <select
                className="date-range-picker__select"
                value={localRange.fromMonth}
                onChange={(e) =>
                  setLocalRange((prev) => ({
                    ...prev,
                    fromMonth: parseInt(e.target.value, 10),
                  }))
                }
              >
                {MONTHS.map((month, idx) => {
                  const monthNum = idx + 1;
                  const available = isMonthAvailable(
                    monthNum,
                    localRange.fromYear
                  );
                  return (
                    <option key={month} value={monthNum} disabled={!available}>
                      {month}
                      {!available ? ' (no data)' : ''}
                    </option>
                  );
                })}
              </select>
              <select
                className="date-range-picker__select"
                value={localRange.fromYear}
                onChange={(e) => {
                  const newYear = parseInt(e.target.value, 10);
                  const availableMonths = getAvailableMonths(newYear);
                  setLocalRange((prev) => ({
                    ...prev,
                    fromYear: newYear,
                    // Adjust month if current selection is not available in new year
                    fromMonth: availableMonths.includes(prev.fromMonth)
                      ? prev.fromMonth
                      : availableMonths[0] || 1,
                  }));
                }}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="date-range-picker__section">
            <label className="date-range-picker__label">To</label>
            <div className="date-range-picker__selects">
              <select
                className="date-range-picker__select"
                value={localRange.toMonth}
                onChange={(e) =>
                  setLocalRange((prev) => ({
                    ...prev,
                    toMonth: parseInt(e.target.value, 10),
                  }))
                }
              >
                {MONTHS.map((month, idx) => {
                  const monthNum = idx + 1;
                  const available = isMonthAvailable(
                    monthNum,
                    localRange.toYear
                  );
                  return (
                    <option key={month} value={monthNum} disabled={!available}>
                      {month}
                      {!available ? ' (no data)' : ''}
                    </option>
                  );
                })}
              </select>
              <select
                className="date-range-picker__select"
                value={localRange.toYear}
                onChange={(e) => {
                  const newYear = parseInt(e.target.value, 10);
                  const availableMonths = getAvailableMonths(newYear);
                  setLocalRange((prev) => ({
                    ...prev,
                    toYear: newYear,
                    // Adjust month if current selection is not available in new year
                    toMonth: availableMonths.includes(prev.toMonth)
                      ? prev.toMonth
                      : availableMonths[availableMonths.length - 1] || 12,
                  }));
                }}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="date-range-picker__actions">
            <button
              type="button"
              className="date-range-picker__btn date-range-picker__btn--secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="date-range-picker__btn date-range-picker__btn--primary"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
