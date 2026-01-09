import { useState } from 'react';
import {
  FileText,
  Plus,
  Download,
  Info,
  Filter,
  Calendar,
  BarChart2,
} from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'Reports provides access to generated insights and analysis reports.',
  whatItDoes: [
    'View generated reports.',
    'Export reports in various formats.',
    'Schedule automated report generation.',
    'Share reports with team members.',
  ],
  whenToUse:
    'Use this screen when you need to access or generate reports for stakeholders.',
  howToUse: [
    'Browse available reports.',
    'Click on a report to view details.',
    'Use filters to narrow down results.',
    'Export or share as needed.',
  ],
  example:
    'I generate a monthly UK market summary report and share it with the leadership team.',
  projectRelation:
    'Reports turn analyzed data into shareable insights for decision-making.',
};

const reports = [
  {
    title: 'UK Market Summary Q3 2025',
    type: 'Market Analysis',
    date: 'Today',
    status: 'Ready',
  },
  {
    title: 'Regulatory Compliance Report',
    type: 'Compliance',
    date: 'Yesterday',
    status: 'Ready',
  },
  {
    title: 'Payment Trends Analysis',
    type: 'Trends',
    date: '3 days ago',
    status: 'Processing',
  },
];

export default function Reports() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Reports"
        content={infoContent}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Reports
            </h1>
            <button
              onClick={() => setShowInfo(true)}
              className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground">
            Access and generate analysis reports.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-card/50 border border-border rounded-lg text-sm font-medium hover:bg-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 shadow-md flex items-center gap-2">
            <Plus className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {reports.map((report, i) => (
          <div
            key={i}
            className="card-base p-6 flex items-center gap-4 hover:border-primary/50 transition-all group bg-card/80 backdrop-blur-sm"
          >
            <div className="p-3 rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors">
              {report.type === 'Market Analysis' ? (
                <BarChart2 className="w-5 h-5 text-primary" />
              ) : (
                <FileText className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                {report.title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span>{report.type}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {report.date}
                </span>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${report.status === 'Ready' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20'}`}
            >
              {report.status}
            </span>
            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
