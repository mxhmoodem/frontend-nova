import { useState } from 'react';
import {
  Bell,
  Info,
  Filter,
  Check,
  AlertTriangle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'Alerts keeps you informed about important changes and updates requiring attention.',
  whatItDoes: [
    'Displays regulatory deadline alerts.',
    'Shows market change notifications.',
    'Highlights system updates.',
    'Provides quick action buttons.',
  ],
  whenToUse: 'Check this screen regularly to stay on top of important updates.',
  howToUse: [
    'Review alerts by priority.',
    'Click on an alert for details.',
    'Mark alerts as read once addressed.',
    'Set up custom alert preferences.',
  ],
  example:
    'I see a critical alert about an upcoming compliance deadline and take immediate action.',
  projectRelation:
    'Alerts ensure you never miss important regulatory or market changes.',
};

const alerts = [
  {
    title: 'APP Fraud Deadline Approaching',
    type: 'critical',
    time: '2 hours ago',
    description: 'New reimbursement rules take effect in 30 days.',
  },
  {
    title: 'Market Report Available',
    type: 'info',
    time: '5 hours ago',
    description: 'Q3 UK E-commerce Analysis is now ready.',
  },
  {
    title: 'System Maintenance',
    type: 'warning',
    time: 'Yesterday',
    description: 'Scheduled maintenance window on Sunday.',
  },
  {
    title: 'New Regulatory Document',
    type: 'info',
    time: '2 days ago',
    description: 'FCA published new Consumer Duty guidance.',
  },
];

export default function Alerts() {
  const [showInfo, setShowInfo] = useState(false);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20';
      case 'warning':
        return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20';
      default:
        return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Alerts"
        content={infoContent}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Alerts
            </h1>
            <button
              onClick={() => setShowInfo(true)}
              className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground">
            Stay informed about important updates.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-card/50 border border-border rounded-lg text-sm font-medium hover:bg-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center gap-2">
            <Check className="w-4 h-4" /> Mark All Read
          </button>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className="card-base p-5 flex items-start gap-4 hover:border-primary/50 transition-all group bg-card/80 backdrop-blur-sm"
          >
            <div className={`p-3 rounded-xl ${getAlertStyle(alert.type)}`}>
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                {alert.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {alert.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <Clock className="w-3 h-3" /> {alert.time}
              </div>
            </div>
            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors">
              <Check className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
