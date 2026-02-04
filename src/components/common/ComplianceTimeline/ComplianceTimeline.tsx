import React, { useState, useMemo } from 'react';
import {
  Calendar,
  ArrowUpDown,
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  Info,
  X,
} from 'lucide-react';
import { TimelineCard } from './TimelineCard';
import {
  ComplianceTimelineProps,
  TimelinePriority,
} from './ComplianceTimeline.types';
import './ComplianceTimeline.css';

const PRIORITIES: TimelinePriority[] = ['critical', 'high', 'medium', 'low'];

const PRIORITY_CONFIG: Record<
  TimelinePriority,
  { label: string; icon: React.ElementType }
> = {
  critical: { label: 'Critical', icon: AlertOctagon },
  high: { label: 'High', icon: AlertTriangle },
  medium: { label: 'Medium', icon: AlertCircle },
  low: { label: 'Low', icon: Info },
};

type DateFilterType = 'all' | 'upcoming' | 'past';

interface DateFilter {
  id: DateFilterType;
  label: string;
  getDateRange: () => { start: Date; end: Date };
}

const DATE_FILTERS: DateFilter[] = [
  {
    id: 'all',
    label: 'All Events',
    getDateRange: () => ({
      start: new Date(2000, 0, 1),
      end: new Date(2100, 11, 31),
    }),
  },
  {
    id: 'upcoming',
    label: 'Upcoming',
    getDateRange: () => {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      return { start, end: new Date(2100, 11, 31) };
    },
  },
  {
    id: 'past',
    label: 'Past',
    getDateRange: () => {
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      return { start: new Date(2000, 0, 1), end };
    },
  },
];

export const ComplianceTimeline: React.FC<ComplianceTimelineProps> = ({
  events,
  onViewDocumentation,
  onAddToCalendar,
  onEventClick,
  className = '',
  testId,
  emptyState,
}) => {
  // State
  const [selectedDateFilter, setSelectedDateFilter] =
    useState<DateFilterType>('upcoming');
  const [selectedPriorities, setSelectedPriorities] = useState<
    TimelinePriority[]
  >([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get current date filter config
  const currentDateFilter = DATE_FILTERS.find(
    (f) => f.id === selectedDateFilter
  )!;

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const { start, end } = currentDateFilter.getDateRange();

    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date);

      // Filter by date range
      if (eventDate < start || eventDate > end) return false;

      // Filter by priorities (if any selected)
      if (selectedPriorities.length > 0) {
        if (!selectedPriorities.includes(event.priority)) return false;
      }

      return true;
    });

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [events, currentDateFilter, selectedPriorities, sortOrder]);

  // Toggle handlers
  const togglePriority = (priority: TimelinePriority) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  const clearFilters = () => {
    setSelectedPriorities([]);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const hasActiveFilters = selectedPriorities.length > 0;

  return (
    <div className={`compliance-timeline ${className}`} data-testid={testId}>
      {/* Header */}
      <div className="compliance-timeline__header">
        <h2 className="compliance-timeline__title">Compliance Timeline</h2>
      </div>

      {/* Filter Bar */}
      <div className="compliance-timeline__control-bar">
        {/* Date Filter Tabs */}
        <div className="compliance-timeline__date-tabs">
          {DATE_FILTERS.map((filter) => {
            const isSelected = selectedDateFilter === filter.id;
            return (
              <button
                key={filter.id}
                role="option"
                aria-selected={isSelected}
                className={`compliance-timeline__date-tab ${isSelected ? 'compliance-timeline__date-tab--active' : ''}`}
                onClick={() => setSelectedDateFilter(filter.id)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Sort Button */}
        <button
          className="compliance-timeline__sort-btn"
          onClick={toggleSortOrder}
          aria-label={`Sort by date ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        >
          <ArrowUpDown size={14} />
          <span className="compliance-timeline__sort-label">
            {sortOrder === 'asc' ? 'Soonest' : 'Latest'}
          </span>
        </button>
      </div>

      {/* Priority Filter Pills */}
      <div className="compliance-timeline__priority-bar">
        <div className="compliance-timeline__priority-filters">
          {PRIORITIES.map((priority) => {
            const config = PRIORITY_CONFIG[priority];
            const Icon = config.icon;
            const isActive = selectedPriorities.includes(priority);
            return (
              <button
                key={priority}
                className={`compliance-timeline__filter-pill compliance-timeline__filter-pill--${priority} ${
                  isActive ? 'compliance-timeline__filter-pill--active' : ''
                }`}
                onClick={() => togglePriority(priority)}
                aria-pressed={isActive}
              >
                <Icon
                  size={14}
                  className="compliance-timeline__filter-pill-icon"
                />
                <span className="compliance-timeline__filter-pill-label">
                  {config.label}
                </span>
              </button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <button
            className="compliance-timeline__clear-btn"
            onClick={clearFilters}
            aria-label="Clear all filters"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Results Summary */}
      <div className="compliance-timeline__results-info">
        <span className="compliance-timeline__results-count">
          {filteredEvents.length} event
          {filteredEvents.length !== 1 ? 's' : ''}
          {hasActiveFilters && ' (filtered)'}
        </span>
      </div>

      {/* Timeline list */}
      {filteredEvents.length > 0 ? (
        <div className="compliance-timeline__list">
          {filteredEvents.map((event) => (
            <TimelineCard
              key={event.id}
              event={event}
              onViewDocumentation={onViewDocumentation}
              onAddToCalendar={onAddToCalendar}
              onClick={onEventClick}
              testId={`timeline-card-${event.id}`}
            />
          ))}
        </div>
      ) : (
        emptyState || (
          <div className="compliance-timeline__empty">
            <Calendar size={48} className="compliance-timeline__empty-icon" />
            <h3 className="compliance-timeline__empty-title">
              No events found
            </h3>
            <p className="compliance-timeline__empty-text">
              {hasActiveFilters
                ? 'Try adjusting your filters to see more results.'
                : `No compliance events in the ${currentDateFilter.label.toLowerCase()} timeframe.`}
            </p>
          </div>
        )
      )}
    </div>
  );
};
