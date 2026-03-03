import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Clock, Info, Settings } from 'lucide-react';
import './ComplianceSidebar.css';

type UrgencyLevel = 'critical' | 'amber' | 'info';

interface ComplianceDeadline {
  id: string;
  name: string;
  description: string;
  daysLeft: number;
  urgency: UrgencyLevel;
}

interface ComplianceSidebarProps {
  deadlines?: ComplianceDeadline[];
  complianceScore?: number;
  jurisdiction?: string;
}

const URGENCY_CONFIG: Record<
  UrgencyLevel,
  { label: string; icon: React.ReactNode; className: string }
> = {
  critical: {
    label: 'Critical',
    icon: <AlertCircle size={14} strokeWidth={2.5} />,
    className: 'compliance-sidebar__deadline--critical',
  },
  amber: {
    label: 'Upcoming',
    icon: <Clock size={14} strokeWidth={2.5} />,
    className: 'compliance-sidebar__deadline--amber',
  },
  info: {
    label: 'Scheduled',
    icon: <Info size={14} strokeWidth={2.5} />,
    className: 'compliance-sidebar__deadline--info',
  },
};

const DEFAULT_DEADLINES: ComplianceDeadline[] = [
  {
    id: '1',
    name: 'Basel III Capital Adequacy',
    description: 'Capital ratio reporting submission due',
    daysLeft: 2,
    urgency: 'critical',
  },
  {
    id: '2',
    name: 'PSD3 Impact Assessment',
    description: 'Consultation paper response required',
    daysLeft: 14,
    urgency: 'amber',
  },
  {
    id: '3',
    name: 'AML Directive Review',
    description: 'Annual compliance review cycle',
    daysLeft: 30,
    urgency: 'info',
  },
];

/** SVG arc gauge for compliance readiness score */
function ComplianceGauge({
  score,
  jurisdiction,
}: {
  score: number;
  jurisdiction: string;
}) {
  const r = 38;
  const cx = 50;
  const cy = 50;
  const circ = 2 * Math.PI * r;

  // Show 270° arc (¾ of the circle) for a gauge look
  // Start at 135° (bottom-left), sweep 270° to bottom-right
  const arcFraction = 0.75; // 270° of the full circle
  const totalArcLength = circ * arcFraction;
  const filledLength = (score / 100) * totalArcLength;
  const gapLength = circ - totalArcLength;

  // dasharray: [filled segment, gap to complete circle]
  const trackDash = `${totalArcLength} ${gapLength}`;
  const progressDash = `${filledLength} ${circ - filledLength}`;

  // Rotation: start arc at 135° (bottom-left clockwise)
  const startAngle = 135;

  return (
    <div className="compliance-gauge">
      <svg
        viewBox="0 0 100 100"
        className="compliance-gauge__svg"
        aria-label={`Compliance readiness: ${score}%`}
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="7"
          strokeDasharray={trackDash}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform={`rotate(${startAngle} ${cx} ${cy})`}
        />
        {/* Progress */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={score >= 80 ? '#3B82F6' : score >= 60 ? '#F59E0B' : '#EF4444'}
          strokeWidth="7"
          strokeDasharray={progressDash}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform={`rotate(${startAngle} ${cx} ${cy})`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        {/* Score text */}
        <text
          x={cx}
          y={cy - 3}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="18"
          fontWeight="700"
          fill="var(--color-foreground)"
          fontFamily="inherit"
        >
          {score}%
        </text>
        <text
          x={cx}
          y={cy + 13}
          textAnchor="middle"
          fontSize="6.5"
          fill="var(--color-muted-foreground)"
          letterSpacing="0.08em"
          fontFamily="inherit"
        >
          READINESS
        </text>
      </svg>
      <p className="compliance-gauge__label">
        Compliance Readiness Gauge ({jurisdiction})
      </p>
    </div>
  );
}

export function ComplianceSidebar({
  deadlines = DEFAULT_DEADLINES,
  complianceScore = 82,
  jurisdiction = 'UK',
}: ComplianceSidebarProps) {
  const navigate = useNavigate();

  return (
    <div className="compliance-sidebar">
      <div className="compliance-sidebar__header">
        <h3 className="compliance-sidebar__title">Compliance Deadlines</h3>
        <button
          className="compliance-sidebar__settings-btn"
          aria-label="Configure compliance settings"
          onClick={() => navigate('/app/regulatory-radar')}
        >
          <Settings size={14} strokeWidth={2} />
        </button>
      </div>

      <div className="compliance-sidebar__deadlines">
        {deadlines.map((deadline) => {
          const config = URGENCY_CONFIG[deadline.urgency];
          return (
            <div
              key={deadline.id}
              className={`compliance-sidebar__deadline ${config.className}`}
            >
              <div className="compliance-sidebar__deadline-main">
                <div className="compliance-sidebar__deadline-info">
                  <span className="compliance-sidebar__deadline-name">
                    {deadline.name}
                  </span>
                  <span className="compliance-sidebar__deadline-desc">
                    {deadline.description}
                  </span>
                </div>
                <div className="compliance-sidebar__deadline-badge">
                  {config.icon}
                  <span className="compliance-sidebar__deadline-days">
                    {deadline.daysLeft === 1
                      ? '1 Day'
                      : `${deadline.daysLeft} Days`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ComplianceGauge score={complianceScore} jurisdiction={jurisdiction} />

      <button
        className="compliance-sidebar__calendar-link"
        onClick={() => navigate('/app/regulatory-radar')}
      >
        View Full Compliance Calendar
      </button>
    </div>
  );
}
