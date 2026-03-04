import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './OverviewMetricCard.css';

export type MetricTrend = 'up' | 'down' | 'neutral';

interface OverviewMetricCardProps {
  label: string;
  value: string;
  change?: number;
  trend?: MetricTrend;
  sparklineData: number[];
  period?: string;
  isLoading?: boolean;
}

/** Inline SVG sparkline — no extra libraries needed */
function Sparkline({ data, trend }: { data: number[]; trend: MetricTrend }) {
  if (data.length < 2) return null;

  const W = 72;
  const H = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - ((v - min) / range) * (H - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  // Filled area
  const firstX = '0';
  const lastX = W.toFixed(1);
  const areaPoints = `${firstX},${H} ${pts} ${lastX},${H}`;

  const stroke =
    trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : '#94A3B8';
  const fill =
    trend === 'up'
      ? 'rgba(16,185,129,0.12)'
      : trend === 'down'
        ? 'rgba(239,68,68,0.12)'
        : 'rgba(148,163,184,0.1)';

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
      className="overview-metric-card__sparkline-svg"
    >
      <polygon points={areaPoints} fill={fill} />
      <polyline
        points={pts}
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ChangeIndicator({
  change,
  trend,
}: {
  change: number;
  trend: MetricTrend;
}) {
  const Icon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const sign = change >= 0 ? '+' : '';
  return (
    <span
      className={`overview-metric-card__change overview-metric-card__change--${trend}`}
    >
      <Icon size={12} strokeWidth={2.5} />
      {sign}
      {change.toFixed(1)}% MoM
    </span>
  );
}

function Skeleton() {
  return (
    <div className="overview-metric-card overview-metric-card--loading">
      <div className="overview-metric-card__skeleton-label" />
      <div className="overview-metric-card__skeleton-value" />
      <div className="overview-metric-card__skeleton-bar" />
    </div>
  );
}

export const OverviewMetricCard: React.FC<OverviewMetricCardProps> = ({
  label,
  value,
  change,
  trend = 'neutral',
  sparklineData,
  period = 'Updated today',
  isLoading = false,
}) => {
  if (isLoading) return <Skeleton />;

  return (
    <div className="overview-metric-card">
      <p className="overview-metric-card__label">{label}</p>
      <p className="overview-metric-card__value">{value}</p>

      <div className="overview-metric-card__footer">
        <div className="overview-metric-card__meta">
          {change !== undefined && (
            <ChangeIndicator change={change} trend={trend} />
          )}
          <span className="overview-metric-card__period">{period}</span>
        </div>
        <Sparkline data={sparklineData} trend={trend} />
      </div>
    </div>
  );
};
