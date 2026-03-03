import {
  CheckCircle2,
  AlertTriangle,
  Activity,
  FileText,
  BarChart2,
} from 'lucide-react';
import './LiveStatusBar.css';

interface LiveStatusBarProps {
  documentsIndexed?: number;
  marketsTracked?: number;
  criticalDeadlines?: number;
  apiStatus?: 'live' | 'offline' | 'degraded';
}

export function LiveStatusBar({
  documentsIndexed = 1247,
  marketsTracked = 42,
  criticalDeadlines = 2,
  apiStatus = 'offline',
}: LiveStatusBarProps) {
  return (
    <div className="live-status-bar">
      <div className="live-status-bar__inner">
        <div className="live-status-bar__group">
          <span
            className={`live-status-bar__dot live-status-bar__dot--${apiStatus}`}
          />
          <Activity size={12} strokeWidth={2.5} />
          <span>
            Bank of England API: <strong>{apiStatus.toUpperCase()}</strong>
          </span>
        </div>

        <span className="live-status-bar__sep" aria-hidden="true" />

        <div className="live-status-bar__group">
          <FileText size={12} strokeWidth={2.5} />
          <span>
            <strong>{documentsIndexed.toLocaleString()}</strong> Documents
            Indexed
          </span>
        </div>

        <span className="live-status-bar__sep" aria-hidden="true" />

        <div className="live-status-bar__group">
          <BarChart2 size={12} strokeWidth={2.5} />
          <span>
            <strong>{marketsTracked}</strong> Markets Tracked
          </span>
        </div>

        <span className="live-status-bar__sep" aria-hidden="true" />

        <div
          className={`live-status-bar__group live-status-bar__group--urgent ${criticalDeadlines > 0 ? 'live-status-bar__group--has-alerts' : ''}`}
        >
          {criticalDeadlines > 0 ? (
            <AlertTriangle size={12} strokeWidth={2.5} />
          ) : (
            <CheckCircle2 size={12} strokeWidth={2.5} />
          )}
          <span>
            {criticalDeadlines > 0 ? (
              <>
                <strong>{criticalDeadlines} Critical Deadlines</strong>{' '}
                Approaching
              </>
            ) : (
              'No Critical Deadlines'
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
