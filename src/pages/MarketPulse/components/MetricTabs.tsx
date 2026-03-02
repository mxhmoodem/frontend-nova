import { KeyboardEvent } from 'react';
import type { MetricKey } from '../../../services/api';
import './MetricTabs.css';

interface MetricTabsProps {
  activeMetric: MetricKey;
  onChange: (key: MetricKey) => void;
  metrics: MetricKey[];
  colors: Record<MetricKey, string>;
  testId?: string;
}

const METRIC_LABELS: Record<MetricKey, string> = {
  total_consumer_credit: 'Consumer Credit',
  credit_card_lending: 'Credit Cards',
  mortgage_approvals: 'Mortgages',
  bank_rate: 'Bank Rate',
};

export function MetricTabs({
  activeMetric,
  onChange,
  metrics,
  colors,
  testId,
}: MetricTabsProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIdx = metrics.indexOf(activeMetric);
    let nextIdx = -1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = currentIdx < metrics.length - 1 ? currentIdx + 1 : 0;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = currentIdx > 0 ? currentIdx - 1 : metrics.length - 1;
    }

    if (nextIdx >= 0) {
      onChange(metrics[nextIdx]);
    }
  };

  return (
    <div
      className="metric-tabs"
      role="tablist"
      aria-label="Metric selection"
      onKeyDown={handleKeyDown}
      data-testid={testId}
    >
      {metrics.map((key) => {
        const isActive = key === activeMetric;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={[
              'metric-tabs__tab',
              isActive && 'metric-tabs__tab--active',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onChange(key)}
          >
            <span
              className="metric-tabs__indicator"
              style={{ backgroundColor: colors[key] }}
            />
            {METRIC_LABELS[key]}
          </button>
        );
      })}
    </div>
  );
}
