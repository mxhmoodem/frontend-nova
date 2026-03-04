import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  Shield,
  AlertTriangle,
  ArrowRight,
  Wand2,
} from 'lucide-react';
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
  sections?: BriefingSection[];
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

export function AIDailyBriefing({
  userName,
  generatedAt = '08:00 AM',
  sections = DEFAULT_SECTIONS,
}: AIDailyBriefingProps) {
  const navigate = useNavigate();

  return (
    <div className="ai-briefing">
      {/* Header badge */}
      <div className="ai-briefing__badge">
        <Wand2 size={11} strokeWidth={2.5} />
        <span>AI GENERATED BRIEF</span>
        <span className="ai-briefing__badge-time">
          Generated at {generatedAt}
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
                  <span className="ai-briefing__point-dot" aria-hidden="true" />
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
    </div>
  );
}
