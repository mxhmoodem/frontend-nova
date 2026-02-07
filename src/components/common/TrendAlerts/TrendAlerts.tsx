import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import type { TrendAlertsProps, TrendAlert } from './TrendAlerts.types';
import './TrendAlerts.css';

export const TrendAlerts = ({
  title,
  alerts,
  source,
  className = '',
  testId,
}: TrendAlertsProps) => {
  const renderAlertIcon = (direction: TrendAlert['direction']) => {
    const Icon = direction === 'up' ? TrendingUp : TrendingDown;
    return (
      <Icon
        size={16}
        className={`trend-alerts__alert-icon trend-alerts__alert-icon--${direction}`}
      />
    );
  };

  const formatChange = (change: number, direction: TrendAlert['direction']) => {
    const prefix = direction === 'up' ? '+' : '-';
    return `${prefix}${change}%`;
  };

  return (
    <div className={`trend-alerts ${className}`.trim()} data-testid={testId}>
      <div className="trend-alerts__header">
        <div className="trend-alerts__title-row">
          <AlertCircle size={18} className="trend-alerts__icon" />
          <h3 className="trend-alerts__title">{title}</h3>
        </div>
      </div>

      <ul className="trend-alerts__list">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className={`trend-alerts__alert trend-alerts__alert--${alert.direction}`}
          >
            <div className="trend-alerts__alert-indicator">
              {renderAlertIcon(alert.direction)}
            </div>
            <div className="trend-alerts__alert-content">
              <span className="trend-alerts__alert-metric">{alert.metric}</span>
              <span
                className={`trend-alerts__alert-change trend-alerts__alert-change--${alert.direction}`}
              >
                {formatChange(alert.change, alert.direction)}
              </span>
              <span className="trend-alerts__alert-period">{alert.period}</span>
            </div>
            {alert.context && (
              <p className="trend-alerts__alert-context">{alert.context}</p>
            )}
          </li>
        ))}
      </ul>

      {source && (
        <div className="trend-alerts__footer">
          <span>Source:</span>
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="trend-alerts__source trend-alerts__source--link"
            >
              {source.name}
            </a>
          ) : (
            <span className="trend-alerts__source">{source.name}</span>
          )}
        </div>
      )}
    </div>
  );
};
