import { useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  PoundSterling,
  Home,
  Percent,
  CreditCard,
} from 'lucide-react';
import type {
  PaymentStatsResponse,
  TrendDirection,
} from '../../../../services/api';
import './MarketSnapshot.css';

interface MarketSnapshotProps {
  statsData?: PaymentStatsResponse | null;
  isLoading?: boolean;
}

interface MetricRow {
  key: keyof Omit<PaymentStatsResponse, 'last_updated'>;
  label: string;
  icon: React.ReactNode;
}

const METRIC_ROWS: MetricRow[] = [
  {
    key: 'total_consumer_credit',
    label: 'Consumer Credit',
    icon: <PoundSterling size={14} />,
  },
  {
    key: 'mortgage_approvals',
    label: 'Mortgage Approvals',
    icon: <Home size={14} />,
  },
  {
    key: 'bank_rate',
    label: 'BoE Base Rate',
    icon: <Percent size={14} />,
  },
  {
    key: 'credit_card_lending',
    label: 'Credit Card Lending',
    icon: <CreditCard size={14} />,
  },
];

function TrendBadge({
  change,
  trend,
}: {
  change: number;
  trend: TrendDirection;
}) {
  const icon =
    trend === 'up' ? (
      <TrendingUp size={11} strokeWidth={2.5} />
    ) : trend === 'down' ? (
      <TrendingDown size={11} strokeWidth={2.5} />
    ) : (
      <Minus size={11} strokeWidth={2.5} />
    );

  const sign = change >= 0 ? '+' : '';

  return (
    <span className={`market-snapshot__badge market-snapshot__badge--${trend}`}>
      {icon}
      {sign}
      {change.toFixed(1)}%
    </span>
  );
}

/**
 * Derives a plain-English market signal from the 4 trend directions.
 * Prioritises the bank rate, then looks at credit trends.
 */
function deriveSignal(statsData?: PaymentStatsResponse | null): {
  label: string;
  mood: 'positive' | 'negative' | 'neutral';
} {
  if (!statsData) return { label: 'Awaiting data', mood: 'neutral' };

  const rate = statsData.bank_rate?.trend;
  const credit = statsData.total_consumer_credit?.trend;
  const mortgage = statsData.mortgage_approvals?.trend;
  const cards = statsData.credit_card_lending?.trend;

  const upCount = [credit, mortgage, cards].filter((t) => t === 'up').length;
  const downCount = [credit, mortgage, cards].filter(
    (t) => t === 'down'
  ).length;

  if (rate === 'up') return { label: 'Rate pressure rising', mood: 'negative' };
  if (rate === 'down' && upCount >= 2)
    return { label: 'Easing supports credit growth', mood: 'positive' };
  if (rate === 'down')
    return { label: 'Rate easing in progress', mood: 'positive' };
  if (upCount === 3)
    return { label: 'Broad credit expansion', mood: 'negative' };
  if (upCount >= 2)
    return { label: 'Mild expansion pressure', mood: 'neutral' };
  if (downCount >= 2)
    return { label: 'Credit markets cooling', mood: 'positive' };
  return { label: 'Conditions broadly stable', mood: 'neutral' };
}

function Skeleton() {
  return (
    <div className="market-snapshot market-snapshot--loading">
      <div className="market-snapshot__skeleton-title" />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="market-snapshot__skeleton-row" />
      ))}
      <div className="market-snapshot__skeleton-signal" />
    </div>
  );
}

export function MarketSnapshot({ statsData, isLoading }: MarketSnapshotProps) {
  const signal = useMemo(() => deriveSignal(statsData), [statsData]);

  const updatedAt = useMemo(() => {
    if (!statsData?.last_updated) return null;
    return new Date(statsData.last_updated).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }, [statsData]);

  if (isLoading) return <Skeleton />;

  return (
    <div className="market-snapshot">
      {/* Header */}
      <div className="market-snapshot__header">
        <div>
          <h3 className="market-snapshot__title">Market Overview</h3>
          <p className="market-snapshot__subtitle">
            {updatedAt ? `BoE data · ${updatedAt}` : 'Bank of England · Live'}
          </p>
        </div>
        <span
          className={`market-snapshot__signal-badge market-snapshot__signal-badge--${signal.mood}`}
        >
          {signal.label}
        </span>
      </div>

      {/* Metric rows */}
      <div className="market-snapshot__rows">
        {METRIC_ROWS.map(({ key, label, icon }) => {
          const stat = statsData?.[key];
          const trend: TrendDirection = stat?.trend ?? 'stable';

          return (
            <div key={key} className="market-snapshot__row">
              <span className="market-snapshot__row-icon">{icon}</span>
              <span className="market-snapshot__row-label">{label}</span>
              <span className="market-snapshot__row-value">
                {stat?.value ?? '—'}
              </span>
              {stat && typeof stat.change === 'number' ? (
                <TrendBadge change={stat.change} trend={trend} />
              ) : (
                <span className="market-snapshot__badge market-snapshot__badge--stable">
                  —
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="market-snapshot__footer">
        <span className="market-snapshot__footer-text">
          Changes shown month-on-month · Source: Bank of England
        </span>
      </div>
    </div>
  );
}
