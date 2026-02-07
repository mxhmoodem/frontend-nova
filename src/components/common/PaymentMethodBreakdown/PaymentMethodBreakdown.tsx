import React from 'react';
import { PieChart } from 'lucide-react';
import { PaymentMethodBreakdownProps } from './PaymentMethodBreakdown.types';
import './PaymentMethodBreakdown.css';

export const PaymentMethodBreakdown: React.FC<PaymentMethodBreakdownProps> = ({
  title,
  methods,
  source,
  period,
  className = '',
  testId,
}) => {
  const classNames = ['payment-method-breakdown', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} data-testid={testId}>
      <div className="payment-method-breakdown__header">
        <div className="payment-method-breakdown__title-row">
          <PieChart size={18} className="payment-method-breakdown__icon" />
          <h3 className="payment-method-breakdown__title">{title}</h3>
        </div>
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

      {(source || period) && (
        <div className="payment-method-breakdown__footer">
          {source &&
            (source.url ? (
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
            ))}
          {source && period && (
            <span className="payment-method-breakdown__separator">•</span>
          )}
          {period && (
            <span className="payment-method-breakdown__period">{period}</span>
          )}
        </div>
      )}
    </div>
  );
};
