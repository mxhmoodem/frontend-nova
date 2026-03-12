import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { MetricKey } from '../../../services/api';
import './MetricFilter.css';

interface MetricFilterProps {
  selected: MetricKey[];
  onChange: (keys: MetricKey[]) => void;
}

const METRICS: { key: MetricKey; label: string }[] = [
  { key: 'total_consumer_credit', label: 'Consumer Credit' },
  { key: 'credit_card_lending', label: 'Credit Card Lending' },
  { key: 'mortgage_approvals', label: 'Mortgage Approvals' },
  { key: 'bank_rate', label: 'Bank Rate' },
];

export function MetricFilter({ selected, onChange }: MetricFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleMetric = (key: MetricKey) => {
    if (selected.includes(key)) {
      onChange(selected.filter((k) => k !== key));
    } else {
      onChange([...selected, key]);
    }
  };

  const selectAll = () => {
    onChange(METRICS.map((m) => m.key));
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="metric-filter" ref={dropdownRef}>
      <button
        type="button"
        className="metric-filter__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>Metrics ({selected.length})</span>
        <ChevronDown
          size={16}
          className={`metric-filter__chevron ${isOpen ? 'metric-filter__chevron--open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="metric-filter__dropdown" role="listbox">
          <div className="metric-filter__options">
            {METRICS.map(({ key, label }) => (
              <label key={key} className="metric-filter__option">
                <span
                  className={`metric-filter__checkbox ${
                    selected.includes(key)
                      ? 'metric-filter__checkbox--checked'
                      : ''
                  }`}
                >
                  {selected.includes(key) && <Check size={12} />}
                </span>
                <input
                  type="checkbox"
                  checked={selected.includes(key)}
                  onChange={() => toggleMetric(key)}
                  className="metric-filter__input"
                />
                <span className="metric-filter__label">{label}</span>
              </label>
            ))}
          </div>

          <div className="metric-filter__actions">
            <button
              type="button"
              className="metric-filter__action metric-filter__action--select"
              onClick={selectAll}
            >
              Select All
            </button>
            <button
              type="button"
              className="metric-filter__action metric-filter__action--clear"
              onClick={clearAll}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
