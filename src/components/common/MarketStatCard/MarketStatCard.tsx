import React, { KeyboardEvent } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MarketStatCardProps } from './MarketStatCard.types';
import './MarketStatCard.css';

export const MarketStatCard: React.FC<MarketStatCardProps> = ({
  label,
  value,
  change,
  trend = 'neutral',
  icon,
  source,
  period,
  className = '',
  onClick,
  testId,
}) => {
  const isClickable = !!onClick;

  const classNames = [
    'market-stat-card',
    isClickable && 'market-stat-card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} />;
      case 'down':
        return <TrendingDown size={14} />;
      default:
        return <Minus size={14} />;
    }
  };

  const formatChange = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const cardProps = {
    className: classNames,
    'data-testid': testId,
    ...(isClickable && {
      role: 'button',
      tabIndex: 0,
      onClick,
      onKeyDown: handleKeyDown,
    }),
  };

  return (
    <div {...cardProps}>
      <div className="market-stat-card__header">
        {icon && <span className="market-stat-card__icon">{icon}</span>}
        {change !== undefined && (
          <span
            className={`market-stat-card__trend market-stat-card__trend--${trend}`}
          >
            {getTrendIcon()}
            <span className="market-stat-card__change">
              {formatChange(change)}
            </span>
          </span>
        )}
      </div>

      <p className="market-stat-card__value">{value}</p>
      <p className="market-stat-card__label">{label}</p>

      {(source || period) && (
        <div className="market-stat-card__footer">
          {source && <span className="market-stat-card__source">{source}</span>}
          {source && period && (
            <span className="market-stat-card__separator">•</span>
          )}
          {period && <span className="market-stat-card__period">{period}</span>}
        </div>
      )}
    </div>
  );
};
