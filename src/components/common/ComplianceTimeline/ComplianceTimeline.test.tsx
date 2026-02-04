import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComplianceTimeline } from './ComplianceTimeline';
import { TimelineCard } from './TimelineCard';
import { TimelineEvent } from './ComplianceTimeline.types';

// Mock current date for consistent testing
const MOCK_NOW = new Date('2026-02-03T12:00:00Z');

// Events spanning different time ranges for testing date filters
const mockEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'Immediate Deadline',
    description: 'Event happening within next 7 days.',
    date: new Date('2026-02-07'), // 4 days from mock now
    regions: ['UK'],
    priority: 'high',
    documentationUrl: 'https://example.com/immediate',
    addedToCalendar: false,
  },
  {
    id: '2',
    title: 'UK APP Fraud Reimbursement',
    description:
      'Mandatory reimbursement rules for Authorized Push Payment fraud come into effect.',
    date: new Date('2026-02-20'), // within 30 days
    regions: ['UK'],
    priority: 'critical',
    documentationUrl: 'https://example.com/uk-fraud',
    addedToCalendar: true,
  },
  {
    id: '3',
    title: 'Q1 Compliance Review',
    description: 'Quarterly compliance review deadline.',
    date: new Date('2026-03-15'), // within 90 days and this quarter
    regions: ['UK'],
    priority: 'medium',
    addedToCalendar: false,
  },
  {
    id: '4',
    title: 'Future Event',
    description: 'Event far in the future.',
    date: new Date('2026-08-15'), // beyond 90 days
    regions: ['UK'],
    priority: 'low',
    addedToCalendar: false,
  },
];

describe('TimelineCard', () => {
  const defaultEvent = mockEvents[0];

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders event title', () => {
      render(<TimelineCard event={defaultEvent} />);
      expect(screen.getByText('Immediate Deadline')).toBeInTheDocument();
    });

    it('renders event description', () => {
      render(<TimelineCard event={defaultEvent} />);
      expect(
        screen.getByText(/Event happening within next 7 days/)
      ).toBeInTheDocument();
    });

    it('renders date badge with month and day', () => {
      render(<TimelineCard event={defaultEvent} />);
      expect(screen.getByText('FEB')).toBeInTheDocument();
      expect(screen.getByText('07')).toBeInTheDocument();
    });

    it('renders priority badge', () => {
      render(<TimelineCard event={defaultEvent} />);
      expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('renders critical priority badge', () => {
      render(<TimelineCard event={mockEvents[1]} />);
      expect(screen.getByText('Critical')).toBeInTheDocument();
    });

    it('applies priority class to card', () => {
      const { container } = render(<TimelineCard event={defaultEvent} />);
      expect(container.firstChild).toHaveClass('timeline-card--high');
    });

    it('applies testId when provided', () => {
      render(<TimelineCard event={defaultEvent} testId="test-card" />);
      expect(screen.getByTestId('test-card')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <TimelineCard event={defaultEvent} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('actions', () => {
    it('renders View Documentation button when handler provided', () => {
      const onView = vi.fn();
      render(
        <TimelineCard event={defaultEvent} onViewDocumentation={onView} />
      );
      expect(
        screen.getByRole('button', { name: /view documentation/i })
      ).toBeInTheDocument();
    });

    it('does not render View Documentation button when no handler', () => {
      render(<TimelineCard event={defaultEvent} />);
      expect(
        screen.queryByRole('button', { name: /view documentation/i })
      ).not.toBeInTheDocument();
    });

    it('calls onViewDocumentation when clicked', () => {
      const onView = vi.fn();
      render(
        <TimelineCard event={defaultEvent} onViewDocumentation={onView} />
      );

      fireEvent.click(
        screen.getByRole('button', { name: /view documentation/i })
      );
      expect(onView).toHaveBeenCalledWith(defaultEvent);
    });

    it('renders Add to Calendar button when handler provided', () => {
      const onAdd = vi.fn();
      render(<TimelineCard event={defaultEvent} onAddToCalendar={onAdd} />);
      expect(
        screen.getByRole('button', { name: /add.*to calendar/i })
      ).toBeInTheDocument();
    });

    it('calls onAddToCalendar when clicked', () => {
      const onAdd = vi.fn();
      render(<TimelineCard event={defaultEvent} onAddToCalendar={onAdd} />);

      fireEvent.click(
        screen.getByRole('button', { name: /add.*to calendar/i })
      );
      expect(onAdd).toHaveBeenCalledWith(defaultEvent);
    });

    it('shows Added to Calendar when already added', () => {
      const onAdd = vi.fn();
      render(<TimelineCard event={mockEvents[1]} onAddToCalendar={onAdd} />);
      expect(screen.getByText('Added to Calendar')).toBeInTheDocument();
    });
  });

  describe('click interaction', () => {
    it('is not clickable when onClick not provided', () => {
      const { container } = render(<TimelineCard event={defaultEvent} />);
      expect(container.firstChild).not.toHaveClass('timeline-card--clickable');
      expect(container.firstChild).not.toHaveAttribute('role', 'button');
    });

    it('is clickable when onClick provided', () => {
      const onClick = vi.fn();
      const { container } = render(
        <TimelineCard event={defaultEvent} onClick={onClick} />
      );
      expect(container.firstChild).toHaveClass('timeline-card--clickable');
      expect(container.firstChild).toHaveAttribute('role', 'button');
    });

    it('calls onClick when card is clicked', () => {
      const onClick = vi.fn();
      render(<TimelineCard event={defaultEvent} onClick={onClick} />);

      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledWith(defaultEvent);
    });

    it('calls onClick on Enter key', () => {
      const onClick = vi.fn();
      const { container } = render(
        <TimelineCard event={defaultEvent} onClick={onClick} />
      );

      fireEvent.keyDown(container.firstChild!, { key: 'Enter' });
      expect(onClick).toHaveBeenCalledWith(defaultEvent);
    });

    it('action buttons stop propagation', () => {
      const onClick = vi.fn();
      const onView = vi.fn();
      render(
        <TimelineCard
          event={defaultEvent}
          onClick={onClick}
          onViewDocumentation={onView}
        />
      );

      // Find the action button specifically (not the card's role=button)
      const viewBtn = screen.getByLabelText(/view documentation for/i);
      fireEvent.click(viewBtn);
      expect(onView).toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});

describe('ComplianceTimeline', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders title', () => {
      render(<ComplianceTimeline events={mockEvents} />);
      expect(screen.getByText('Compliance Timeline')).toBeInTheDocument();
    });

    it('renders date filter tabs', () => {
      render(<ComplianceTimeline events={mockEvents} />);
      expect(screen.getByRole('option', { name: 'All Events' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Upcoming' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Past' })).toBeInTheDocument();
    });

    it('renders priority filter pills', () => {
      render(<ComplianceTimeline events={mockEvents} />);
      expect(
        screen.getByRole('button', { name: /Critical/i })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /High/i })).toBeInTheDocument();
    });

    it('renders timeline cards for filtered events', () => {
      render(<ComplianceTimeline events={mockEvents} testId="timeline" />);
      expect(screen.getByTestId('timeline-card-1')).toBeInTheDocument();
    });

    it('renders results count', () => {
      render(<ComplianceTimeline events={mockEvents} />);
      expect(screen.getByText(/event/)).toBeInTheDocument();
    });

    it('renders sort button', () => {
      render(<ComplianceTimeline events={mockEvents} />);
      expect(
        screen.getByRole('button', { name: /sort by date/i })
      ).toBeInTheDocument();
    });

    it('applies testId when provided', () => {
      render(<ComplianceTimeline events={mockEvents} testId="test-timeline" />);
      expect(screen.getByTestId('test-timeline')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ComplianceTimeline events={mockEvents} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('date filtering', () => {
    it('defaults to Upcoming tab', () => {
      render(<ComplianceTimeline events={mockEvents} />);
      
      const upcomingTab = screen.getByRole('option', { name: 'Upcoming' });
      expect(upcomingTab).toHaveClass('compliance-timeline__date-tab--active');
    });

    it('filters to show only upcoming events by default', () => {
      render(<ComplianceTimeline events={mockEvents} />);

      // All mock events are in the future, so all should show with Upcoming
      expect(screen.getByText('Immediate Deadline')).toBeInTheDocument();
      expect(screen.getByText('UK APP Fraud Reimbursement')).toBeInTheDocument();
    });

    it('shows all events when All Events tab clicked', () => {
      render(<ComplianceTimeline events={mockEvents} />);

      fireEvent.click(screen.getByRole('option', { name: 'All Events' }));

      expect(screen.getByText('Future Event')).toBeInTheDocument();
    });
  });

  describe('priority filtering', () => {
    it('filters events by selected priority', () => {
      render(<ComplianceTimeline events={mockEvents} />);

      fireEvent.click(screen.getByRole('button', { name: /Critical/i }));

      expect(
        screen.getByText('UK APP Fraud Reimbursement')
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Immediate Deadline')
      ).not.toBeInTheDocument();
    });

    it('toggles priority filter off when clicked again', () => {
      render(<ComplianceTimeline events={mockEvents} />);

      const criticalBtn = screen.getByRole('button', { name: /Critical/i });
      fireEvent.click(criticalBtn);
      expect(criticalBtn).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(criticalBtn);
      expect(criticalBtn).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('clear filters', () => {
    it('shows clear filters button when filters active', () => {
      render(<ComplianceTimeline events={mockEvents} />);

      expect(
        screen.queryByRole('button', { name: /clear/i })
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /Critical/i }));

      expect(
        screen.getByRole('button', { name: /clear/i })
      ).toBeInTheDocument();
    });

    it('clears all filters when clicked', () => {
      render(<ComplianceTimeline events={mockEvents} />);

      const criticalBtn = screen.getByRole('button', { name: /Critical/i });
      const highBtn = screen.getByRole('button', { name: /High/i });
      
      fireEvent.click(criticalBtn);
      fireEvent.click(highBtn);
      fireEvent.click(screen.getByRole('button', { name: /clear/i }));

      expect(criticalBtn).toHaveAttribute('aria-pressed', 'false');
      expect(highBtn).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('sorting', () => {
    it('toggles sort order when sort button clicked', () => {
      render(<ComplianceTimeline events={mockEvents} />);

      const sortBtn = screen.getByRole('button', { name: /sort by date/i });
      expect(sortBtn).toHaveTextContent('Soonest');

      fireEvent.click(sortBtn);
      expect(sortBtn).toHaveTextContent('Latest');

      fireEvent.click(sortBtn);
      expect(sortBtn).toHaveTextContent('Soonest');
    });
  });

  describe('empty state', () => {
    it('shows empty state when no events match filters', () => {
      render(<ComplianceTimeline events={mockEvents} />);

      // Switch to Past tab - no events in mock data are in the past
      fireEvent.click(screen.getByRole('option', { name: 'Past' }));

      expect(screen.getByText('No events found')).toBeInTheDocument();
    });

    it('shows custom empty state when provided', () => {
      render(
        <ComplianceTimeline
          events={mockEvents}
          emptyState={<div>Custom empty state</div>}
        />
      );

      // Switch to Past tab - no events in mock data are in the past
      fireEvent.click(screen.getByRole('option', { name: 'Past' }));

      expect(screen.getByText('Custom empty state')).toBeInTheDocument();
    });

    it('shows empty state when no events', () => {
      render(<ComplianceTimeline events={[]} />);
      expect(screen.getByText('No events found')).toBeInTheDocument();
    });
  });

  describe('event handlers', () => {
    it('passes onViewDocumentation to cards', () => {
      const onView = vi.fn();
      render(
        <ComplianceTimeline events={mockEvents} onViewDocumentation={onView} />
      );

      const viewButtons = screen.getAllByRole('button', {
        name: /view documentation/i,
      });
      fireEvent.click(viewButtons[0]);

      expect(onView).toHaveBeenCalled();
    });

    it('passes onAddToCalendar to cards', () => {
      const onAdd = vi.fn();
      render(
        <ComplianceTimeline events={mockEvents} onAddToCalendar={onAdd} />
      );

      const addButtons = screen.getAllByRole('button', {
        name: /calendar/i,
      });
      fireEvent.click(addButtons[0]);

      expect(onAdd).toHaveBeenCalled();
    });

    it('passes onEventClick to cards', () => {
      const onClick = vi.fn();
      render(<ComplianceTimeline events={mockEvents} onEventClick={onClick} />);

      // Cards should be clickable when onEventClick provided
      const card = screen.getByTestId('timeline-card-1');
      fireEvent.click(card);

      expect(onClick).toHaveBeenCalled();
    });
  });
});
