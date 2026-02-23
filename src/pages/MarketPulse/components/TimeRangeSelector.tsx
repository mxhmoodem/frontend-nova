import type { TimeRange } from '../../../services/api';
import './TimeRangeSelector.css';

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

const TIME_OPTIONS: TimeRange[] = [3, 6, 12, 24];

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="time-range-selector" role="group" aria-label="Time range">
      {TIME_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`time-range-selector__btn ${
            value === option ? 'time-range-selector__btn--active' : ''
          }`}
          aria-pressed={value === option}
        >
          {option}M
        </button>
      ))}
    </div>
  );
}
