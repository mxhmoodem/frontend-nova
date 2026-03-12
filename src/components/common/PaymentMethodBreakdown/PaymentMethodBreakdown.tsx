import React from 'react';
import { PieChart, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  PaymentMethodBreakdownProps,
  TrendDirection,
} from './PaymentMethodBreakdown.types';
import './PaymentMethodBreakdown.css';

const getTrendIcon = (trend: TrendDirection | null | undefined) => {
  switch (trend) {
    case 'up':
      return <TrendingUp size={12} />;
    case 'down':
      return <TrendingDown size={12} />;
    default:
      return <Minus size={12} />;
  }
};

const formatChange = (change: number | null | undefined): string => {
  if (change === null || change === undefined) return '';
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}pp`;
};

export const PaymentMethodBreakdown: React.FC<PaymentMethodBreakdownProps> = ({
  title,
  methods,
  source,
  currentPeriod,
  comparisonPeriod,
  className = '',
  testId,
}) => {
  const classNames = ['payment-method-breakdown', className]
    .filter(Boolean)
    .join(' ');

  const displayPeriod = currentPeriod;
  const hasComparison = methods.some(
    (m) => m.trend !== undefined && m.trend !== null
  );

  return (
    <div className={classNames} data-testid={testId}>
      <div className="payment-method-breakdown__header">
        <div className="payment-method-breakdown__title-row">
          <PieChart size={18} className="payment-method-breakdown__icon" />
          <h3 className="payment-method-breakdown__title">{title}</h3>
        </div>

        {/* Period context */}
        {(displayPeriod || comparisonPeriod) && (
          <div className="payment-method-breakdown__period-info">
            {displayPeriod && (
              <span className="payment-method-breakdown__current-period">
                Data as of: {displayPeriod}
              </span>
            )}
            {comparisonPeriod && (
              <span className="payment-method-breakdown__comparison-period">
                Showing change {comparisonPeriod}
              </span>
            )}
          </div>
        )}

        {/* Trend legend */}
        {hasComparison && (
          <div className="payment-method-breakdown__legend">
            <span className="payment-method-breakdown__legend-item payment-method-breakdown__legend-item--up">
              <TrendingUp size={10} /> Growth
            </span>
            <span className="payment-method-breakdown__legend-item payment-method-breakdown__legend-item--down">
              <TrendingDown size={10} /> Decline
            </span>
            <span className="payment-method-breakdown__legend-item payment-method-breakdown__legend-item--stable">
              <Minus size={10} /> Stable (&lt;0.5pp)
            </span>
          </div>
        )}
      </div>

      <div className="payment-method-breakdown__list">
        {methods.map((method) => (
          <div key={method.id} className="payment-method-breakdown__item">
            <div className="payment-method-breakdown__item-info">
              {method.icon && (
                <span className="payment-method-breakdown__item-icon">
                  {method.icon}
                </span>
              )}
              <span className="payment-method-breakdown__item-name">
                {method.name}
              </span>
              {method.trend !== undefined && method.trend !== null && (
                <span
                  className={`payment-method-breakdown__trend payment-method-breakdown__trend--${method.trend}`}
                >
                  {getTrendIcon(method.trend)}
                  <span className="payment-method-breakdown__change">
                    {formatChange(method.change)}
                  </span>
                </span>
              )}
            </div>
            <div className="payment-method-breakdown__item-value">
              <div className="payment-method-breakdown__bar-container">
                <div
                  className="payment-method-breakdown__bar"
                  style={{
                    width: `${method.percentage}%`,
                    backgroundColor: method.color,
                  }}
                />
              </div>
              <span className="payment-method-breakdown__percentage">
                {method.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {source && (
        <div className="payment-method-breakdown__footer">
          <span className="payment-method-breakdown__source-label">
            Source:
          </span>
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="payment-method-breakdown__source payment-method-breakdown__source--link"
              onClick={(e) => e.stopPropagation()}
            >
              {source.name}
            </a>
          ) : (
            <span className="payment-method-breakdown__source">
              {source.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
