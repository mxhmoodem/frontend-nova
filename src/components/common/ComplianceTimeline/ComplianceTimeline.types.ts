import { ReactNode } from 'react';

export type TimelinePriority = 'low' | 'medium' | 'high' | 'critical';

export type TimelineRegion = 'EU' | 'UK' | 'APAC' | 'NAM' | 'Global';

export interface TimelineEvent {
  /**
   * Unique identifier for the event
   */
  id: string;

  /**
   * Event title
   */
  title: string;

  /**
   * Event description
   */
  description: string;

  /**
   * Date of the event
   */
  date: Date;

  /**
   * Region(s) affected by this event
   */
  regions: TimelineRegion[];

  /**
   * Priority level of the event
   */
  priority: TimelinePriority;

  /**
   * Category/type of the event
   */
  category?: string;

  /**
   * URL to documentation
   */
  documentationUrl?: string;

  /**
   * Whether user has added to calendar
   */
  addedToCalendar?: boolean;
}

export interface TimelineCardProps {
  /**
   * The timeline event data
   */
  event: TimelineEvent;

  /**
   * Handler when View Documentation is clicked
   */
  onViewDocumentation?: (event: TimelineEvent) => void;

  /**
   * Handler when Add to Calendar is clicked
   */
  onAddToCalendar?: (event: TimelineEvent) => void;

  /**
   * Handler when the card is clicked
   */
  onClick?: (event: TimelineEvent) => void;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Test id for testing purposes
   */
  testId?: string;
}

export interface ComplianceTimelineProps {
  /**
   * Array of timeline events
   */
  events: TimelineEvent[];

  /**
   * Handler when View Documentation is clicked
   */
  onViewDocumentation?: (event: TimelineEvent) => void;

  /**
   * Handler when Add to Calendar is clicked
   */
  onAddToCalendar?: (event: TimelineEvent) => void;

  /**
   * Handler when an event card is clicked
   */
  onEventClick?: (event: TimelineEvent) => void;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Test id for testing purposes
   */
  testId?: string;

  /**
   * Custom empty state content
   */
  emptyState?: ReactNode;
}
