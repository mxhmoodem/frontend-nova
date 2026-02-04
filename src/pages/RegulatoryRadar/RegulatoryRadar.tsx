import { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import { StatCard, ComplianceTimeline } from '../../components/common';
import type { TimelineEvent } from '../../components/common';
import { infoModalContent } from '../../constants/infoModalContent';
import './RegulatoryRadar.css';

// Mock data - in a real app this would come from an API
const REGULATORY_STATS = {
  compliantMarkets: {
    title: 'COMPLIANT MARKETS',
    value: 12,
    subtitle: 'Across EU, UK, and NAM',
  },
  upcomingDeadlines: {
    title: 'UPCOMING DEADLINES',
    value: 5,
    subtitle: 'Action required in next 90 days',
  },
  criticalAlerts: {
    title: 'CRITICAL ALERTS',
    value: 2,
    subtitle: 'New mandates in APAC region',
  },
};

// Mock timeline events - in a real app this would come from an API
const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    title: 'PSD3 Proposal Finalization',
    description:
      'Final text expected from European Commission regarding new authentication standards.',
    date: new Date('2025-06-15'),
    regions: ['EU'],
    priority: 'high',
    documentationUrl: 'https://example.com/psd3',
    addedToCalendar: false,
  },
  {
    id: '2',
    title: 'UK APP Fraud Reimbursement',
    description:
      'Mandatory reimbursement rules for Authorized Push Payment fraud come into effect.',
    date: new Date('2025-10-07'),
    regions: ['UK'],
    priority: 'critical',
    documentationUrl: 'https://example.com/uk-fraud',
    addedToCalendar: false,
  },
  {
    id: '3',
    title: 'APAC Data Localization Requirements',
    description:
      'New data residency requirements for financial institutions operating in the Asia-Pacific region.',
    date: new Date('2025-03-20'),
    regions: ['APAC'],
    priority: 'medium',
    documentationUrl: 'https://example.com/apac-data',
    addedToCalendar: false,
  },
  {
    id: '4',
    title: 'DORA Compliance Deadline',
    description:
      'Digital Operational Resilience Act comes into full effect for EU financial entities.',
    date: new Date('2025-01-17'),
    regions: ['EU'],
    priority: 'critical',
    documentationUrl: 'https://example.com/dora',
    addedToCalendar: true,
  },
  {
    id: '5',
    title: 'NAM Open Banking Phase 2',
    description:
      'Second phase of North American open banking framework implementation begins.',
    date: new Date('2025-07-01'),
    regions: ['NAM'],
    priority: 'high',
    documentationUrl: 'https://example.com/nam-ob',
    addedToCalendar: false,
  },
  {
    id: '6',
    title: 'Global AML Standards Update',
    description:
      'Updated anti-money laundering guidelines from FATF affecting all major regions.',
    date: new Date('2026-01-15'),
    regions: ['EU', 'UK', 'APAC', 'NAM'],
    priority: 'high',
    documentationUrl: 'https://example.com/aml',
    addedToCalendar: false,
  },
  {
    id: '7',
    title: 'EU AI Act Financial Services Provisions',
    description:
      'AI Act provisions specific to financial services and algorithmic trading come into force.',
    date: new Date('2026-06-01'),
    regions: ['EU'],
    priority: 'medium',
    documentationUrl: 'https://example.com/ai-act',
    addedToCalendar: false,
  },
  {
    id: '8',
    title: 'UK Consumer Duty Review',
    description: 'First annual review of Consumer Duty compliance by the FCA.',
    date: new Date('2025-08-31'),
    regions: ['UK'],
    priority: 'high',
    documentationUrl: 'https://example.com/consumer-duty',
    addedToCalendar: false,
  },
];

export default function RegulatoryRadar() {
  const [showInfo, setShowInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [timelineEvents, setTimelineEvents] =
    useState<TimelineEvent[]>(TIMELINE_EVENTS);

  // In a real app, this data would come from props or an API
  const stats = REGULATORY_STATS;

  const handleStatCardClick = (statType: string) => {
    console.log(`Clicked on ${statType} stat card`);
    // TODO: Navigate to detailed view or open modal
  };

  const handleViewDocumentation = (event: TimelineEvent) => {
    console.log('View documentation:', event.title);
    if (event.documentationUrl) {
      window.open(event.documentationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAddToCalendar = (event: TimelineEvent) => {
    console.log('Add to calendar:', event.title);
    // Toggle calendar status
    setTimelineEvents((prev) =>
      prev.map((e) =>
        e.id === event.id ? { ...e, addedToCalendar: !e.addedToCalendar } : e
      )
    );
  };

  const handleEventClick = (event: TimelineEvent) => {
    console.log('Event clicked:', event.title);
    // TODO: Open event details modal or navigate to details page
  };

  return (
    <div className="regulatory-radar">
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Regulatory Radar"
        content={infoModalContent.regulatoryRadar}
      />

      {/* Header section */}
      <header className="regulatory-radar__header">
        <div className="regulatory-radar__header-left">
          <h2 className="regulatory-radar__heading">
            Regulatory Radar
            <InformationButton
              tooltip="Learn about this page"
              ariaLabel="Information about Regulatory Radar"
              onClick={() => setShowInfo(true)}
            />
          </h2>
          <p className="regulatory-radar__subheading">
            Track, monitor, and prepare for global compliance changes.
          </p>
        </div>

        {/* Search bar */}
        <div className="regulatory-radar__search-wrapper">
          <div className="regulatory-radar__search-bar">
            <Search size={18} className="regulatory-radar__search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search regulations..."
              className="regulatory-radar__search-input"
            />
          </div>
          <button className="regulatory-radar__filter-btn" aria-label="Filter">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </header>

      {/* Stats cards grid */}
      <div className="regulatory-radar__stats-grid">
        <StatCard
          title={stats.compliantMarkets.title}
          value={stats.compliantMarkets.value}
          subtitle={stats.compliantMarkets.subtitle}
          variant="success"
          icon={<CheckCircle size={18} />}
          onClick={() => handleStatCardClick('compliantMarkets')}
          testId="stat-compliant-markets"
        />
        <StatCard
          title={stats.upcomingDeadlines.title}
          value={stats.upcomingDeadlines.value}
          subtitle={stats.upcomingDeadlines.subtitle}
          variant="warning"
          icon={<Clock size={18} />}
          onClick={() => handleStatCardClick('upcomingDeadlines')}
          testId="stat-upcoming-deadlines"
        />
        <StatCard
          title={stats.criticalAlerts.title}
          value={stats.criticalAlerts.value}
          subtitle={stats.criticalAlerts.subtitle}
          variant="danger"
          icon={<AlertTriangle size={18} />}
          onClick={() => handleStatCardClick('criticalAlerts')}
          testId="stat-critical-alerts"
        />
      </div>

      {/* Compliance Timeline */}
      <section className="regulatory-radar__timeline-section">
        <ComplianceTimeline
          events={timelineEvents}
          onViewDocumentation={handleViewDocumentation}
          onAddToCalendar={handleAddToCalendar}
          onEventClick={handleEventClick}
          testId="compliance-timeline"
        />
      </section>
    </div>
  );
}
