import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  Shield,
  AlertTriangle,
  ArrowRight,
  Wand2,
} from 'lucide-react';
import type {
  Legislation,
  MarketTrendListResponse,
  TrendAlertsResponse,
} from '../../../../services/api';
import './AIDailyBriefing.css';

interface BriefingPoint {
  text: string;
}

interface BriefingSection {
  category: 'regulatory' | 'market' | 'risk';
  label: string;
  icon: React.ReactNode;
  points: BriefingPoint[];
}

interface AIDailyBriefingProps {
  userName: string;
  generatedAt?: string;
  /** Optional manual override — takes priority over derived sections */
  sections?: BriefingSection[];
  /** Real data sources — used to derive sections when no override is given */
  legislationData?: Legislation[];
  marketData?: MarketTrendListResponse;
  alertsData?: TrendAlertsResponse;
  isLoading?: boolean;
}

const DEFAULT_SECTIONS: BriefingSection[] = [
  {
    category: 'regulatory',
    label: 'Regulatory',
    icon: <Shield size={13} strokeWidth={2.5} />,
    points: [
      {
        text: 'FCA publishes PS23/14 on credit promotions with immediate effect',
      },
      {
        text: 'PSD3 consultation period closes in 2 days — response deadline approaching',
      },
    ],
  },
  {
    category: 'market',
    label: 'Market',
    icon: <TrendingUp size={13} strokeWidth={2.5} />,
    points: [
      {
        text: 'Consumer borrowing hits 4-year high despite sustained rate environment',
      },
      {
        text: 'BNPL adoption stabilises in Q3; sector growth moderating across UK lenders',
      },
    ],
  },
  {
    category: 'risk',
    label: 'Risk',
    icon: <AlertTriangle size={13} strokeWidth={2.5} />,
    points: [
      {
        text: 'Rising default rates in sub-prime credit card segment — monitor closely',
      },
      {
        text: 'APP fraud reimbursement rules take effect; operational readiness required',
      },
    ],
  },
];

/** Skeleton that mirrors the real layout exactly so the container never shifts */
function BriefingSkeleton({ userName }: { userName: string }) {
  return (
    <>
      {/* Badge row */}
      <div className="ai-briefing__badge">
        <Wand2 size={11} strokeWidth={2.5} />
        <span>AI GENERATED BRIEF</span>
        <span className="ai-briefing__badge-time ai-briefing__sk-inline ai-briefing__sk-inline--sm" />
      </div>

      {/* Greeting */}
      <div className="ai-briefing__header">
        <h2 className="ai-briefing__greeting">Good morning, {userName}.</h2>
        <p className="ai-briefing__subtext ai-briefing__sk-line ai-briefing__sk-line--md" />
      </div>

      {/* Section columns */}
      <div className="ai-briefing__sections">
        {(['regulatory', 'market', 'risk'] as const).map((cat) => (
          <div
            key={cat}
            className={`ai-briefing__section ai-briefing__section--${cat}`}
          >
            <div className="ai-briefing__section-header">
              <span className="ai-briefing__sk-icon" />
              <span className="ai-briefing__sk-line ai-briefing__sk-line--label" />
            </div>
            <ul className="ai-briefing__points">
              <li className="ai-briefing__point">
                <span className="ai-briefing__point-dot" aria-hidden="true" />
                <span className="ai-briefing__sk-line ai-briefing__sk-line--full" />
              </li>
              <li className="ai-briefing__point">
                <span className="ai-briefing__point-dot" aria-hidden="true" />
                <span className="ai-briefing__sk-line ai-briefing__sk-line--three-quarter" />
              </li>
            </ul>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="ai-briefing__actions">
        <span className="ai-briefing__sk-btn" />
        <span className="ai-briefing__sk-btn ai-briefing__sk-btn--sm" />
      </div>
    </>
  );
}
function truncate(str: string | null | undefined, max: number): string {
  if (!str) return '';
  return str.length <= max ? str : str.slice(0, max - 1) + '\u2026';
}

export function AIDailyBriefing({
  userName,
  generatedAt,
  sections: sectionsProp,
  legislationData,
  marketData,
  alertsData,
  isLoading,
}: AIDailyBriefingProps) {
  const navigate = useNavigate();

  /** Derive sections from real data, falling back per-category to defaults */
  const sections = useMemo<BriefingSection[]>(() => {
    if (sectionsProp) return sectionsProp;

    const regPoints: BriefingPoint[] =
      legislationData && legislationData.length > 0
        ? [...legislationData]
            .sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            )
            .slice(0, 2)
            .map((l) => ({
              text: l.description
                ? `${l.title} — ${truncate(l.description, 80)}`
                : l.title,
            }))
        : DEFAULT_SECTIONS[0].points;

    const mktPoints: BriefingPoint[] =
      marketData?.data?.items && marketData.data.items.length > 0
        ? marketData.data.items.slice(0, 2).map((m) => ({
            text: m.description
              ? `${m.title} — ${truncate(m.description, 80)}`
              : m.title,
          }))
        : DEFAULT_SECTIONS[1].points;

    const riskPoints: BriefingPoint[] =
      alertsData?.alerts && alertsData.alerts.length > 0
        ? alertsData.alerts.slice(0, 2).map((a) => ({ text: a.message }))
        : DEFAULT_SECTIONS[2].points;

    return [
      {
        category: 'regulatory' as const,
        label: 'Regulatory',
        icon: <Shield size={13} strokeWidth={2.5} />,
        points: regPoints,
      },
      {
        category: 'market' as const,
        label: 'Market',
        icon: <TrendingUp size={13} strokeWidth={2.5} />,
        points: mktPoints,
      },
      {
        category: 'risk' as const,
        label: 'Risk',
        icon: <AlertTriangle size={13} strokeWidth={2.5} />,
        points: riskPoints,
      },
    ];
  }, [sectionsProp, legislationData, marketData, alertsData]);

  /** Derive generatedAt from the most recent data timestamp */
  const resolvedGeneratedAt = useMemo(() => {
    if (generatedAt) return generatedAt;
    const ts =
      alertsData?.last_updated ?? legislationData?.[0]?.updated_at ?? null;
    if (!ts) return 'today';
    return new Date(ts).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [generatedAt, alertsData, legislationData]);

  return (
    <div className="ai-briefing">
      {isLoading ? (
        <BriefingSkeleton userName={userName} />
      ) : (
        <>
          {/* Header badge */}
          <div className="ai-briefing__badge">
            <Wand2 size={11} strokeWidth={2.5} />
            <span>AI GENERATED BRIEF</span>
            <span className="ai-briefing__badge-time">
              {`Updated ${resolvedGeneratedAt}`}
            </span>
          </div>

          {/* Greeting & subtext */}
          <div className="ai-briefing__header">
            <h2 className="ai-briefing__greeting">Good morning, {userName}.</h2>
            <p className="ai-briefing__subtext">
              Your personalised intelligence overview for today.
            </p>
          </div>

          {/* Briefing columns */}
          <div className="ai-briefing__sections">
            {sections.map((section) => (
              <div
                key={section.category}
                className={`ai-briefing__section ai-briefing__section--${section.category}`}
              >
                <div className="ai-briefing__section-header">
                  {section.icon}
                  <span className="ai-briefing__section-label">
                    {section.label}
                  </span>
                </div>
                <ul className="ai-briefing__points">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="ai-briefing__point">
                      <span
                        className="ai-briefing__point-dot"
                        aria-hidden="true"
                      />
                      {point.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="ai-briefing__actions">
            <button
              className="ai-briefing__btn ai-briefing__btn--primary"
              onClick={() => navigate('/app/content-hub')}
              aria-label="Read full briefing in Content Hub"
            >
              Read full briefing
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>
            <button
              className="ai-briefing__btn ai-briefing__btn--secondary"
              onClick={() => navigate('/app/ai-console')}
              aria-label="Open AI Console"
            >
              <Sparkles size={14} strokeWidth={2.5} />
              Ask AI Console
            </button>
          </div>
        </>
      )}
    </div>
  );
}
