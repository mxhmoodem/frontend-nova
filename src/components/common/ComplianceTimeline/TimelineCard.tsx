import React, { KeyboardEvent } from 'react';
import { FileText, CalendarPlus, Check } from 'lucide-react';
import { TimelineCardProps } from './ComplianceTimeline.types';

const MONTH_NAMES = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const TimelineCard: React.FC<TimelineCardProps> = ({
  event,
  onViewDocumentation,
  onAddToCalendar,
  onClick,
  className = '',
  testId,
}) => {
  const isClickable = !!onClick;
  const date = new Date(event.date);
  const month = MONTH_NAMES[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  const priorityLabels: Record<string, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  };

  const classNames = [
    'timeline-card',
    `timeline-card--${event.priority}`,
    isClickable && 'timeline-card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(event);
    }
  };

  const handleViewDocumentation = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDocumentation?.(event);
  };

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCalendar?.(event);
  };

  return (
    <div
      className={classNames}
      data-testid={testId}
      onClick={isClickable ? () => onClick?.(event) : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Date Badge */}
      <div className="timeline-card__date-badge">
        <span className="timeline-card__date-month">{month}</span>
        <span className="timeline-card__date-day">{day}</span>
        <span className="timeline-card__date-year">{year}</span>
      </div>

      {/* Content */}
      <div className="timeline-card__content">
        <div className="timeline-card__header">
          <div className="timeline-card__title-row">
            <h3 className="timeline-card__title">{event.title}</h3>
          </div>
          <span
            className={`timeline-card__priority-badge timeline-card__priority-badge--${event.priority}`}
          >
            {priorityLabels[event.priority]}
          </span>
        </div>

        <p className="timeline-card__description">{event.description}</p>

        <div className="timeline-card__actions">
          {onViewDocumentation && (
            <button
              type="button"
              className="timeline-card__action"
              onClick={handleViewDocumentation}
              aria-label={`View documentation for ${event.title}`}
            >
              <FileText size={16} className="timeline-card__action-icon" />
              View Documentation
            </button>
          )}
          {onAddToCalendar && (
            <button
              type="button"
              className={`timeline-card__action ${event.addedToCalendar ? 'timeline-card__action--added' : ''}`}
              onClick={handleAddToCalendar}
              aria-label={
                event.addedToCalendar
                  ? `${event.title} added to calendar`
                  : `Add ${event.title} to calendar`
              }
            >
              {event.addedToCalendar ? (
                <Check size={16} className="timeline-card__action-icon" />
              ) : (
                <CalendarPlus
                  size={16}
                  className="timeline-card__action-icon"
                />
              )}
              {event.addedToCalendar ? 'Added to Calendar' : 'Add to Calendar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
