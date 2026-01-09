import { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Globe,
  Search,
  Filter,
  Calendar,
  FileText,
  ArrowRight,
  Info,
} from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'Regulatory Radar helps you track, understand, and act on changes in UK payment and financial regulation.',
  whatItDoes: [
    'Collects regulatory and scheme documents from bodies such as the FCA, PSR, and Bank of England.',
    'Organises changes by topic and effective date.',
    'Summarises the key points and likely impact using the AI assistant.',
    'Highlights upcoming deadlines and high-impact changes.',
  ],
  whenToUse:
    'Use this screen whenever you need to check what rules are changing, whether you are compliant, and what actions are needed.',
  howToUse: [
    'Filter by type of regulation or status (upcoming, active, past).',
    'Review the timeline of changes to see what is coming next.',
    'Open a regulation to read a short summary and key obligations.',
    'Use the assistant to ask, "What does this mean for our UK products?" or "What changes do we need in our onboarding process?"',
  ],
  example:
    "A new rule about APP fraud reimbursement appears in the timeline. I open it, read the summary, and ask the assistant: 'What system changes do we need to make before this takes effect next year?'",
  projectRelation:
    "Regulatory Radar turns long, complex regulatory documents into clear, actionable information, supporting the project's goal of faster regulatory insight and better compliance.",
};

const timelineItems = [
  {
    title: 'APP Fraud Reimbursement',
    deadline: 'Oct 07, 2025',
    region: 'UK',
    impact: 'Critical' as const,
    desc: 'Mandatory reimbursement rules for Authorized Push Payment fraud come into effect.',
  },
  {
    title: 'Consumer Duty: Closed Products',
    deadline: 'July 31, 2025',
    region: 'UK',
    impact: 'High' as const,
    desc: 'Deadline for implementing Consumer Duty rules for closed products and services.',
  },
  {
    title: 'UK Digital Pound Consultation',
    deadline: 'Q4 2025',
    region: 'UK',
    impact: 'Medium' as const,
    desc: 'Response to consultation paper on the digital pound design phase.',
  },
  {
    title: 'Open Banking: VRP Expansion',
    deadline: 'TBD 2025',
    region: 'UK',
    impact: 'High' as const,
    desc: 'Expansion of Variable Recurring Payments beyond sweeping.',
  },
];

export default function RegulatoryRadar() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Regulatory Radar"
        content={infoContent}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Regulatory Radar
            </h1>
            <button
              onClick={() => setShowInfo(true)}
              className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Learn about this page"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground">
            Track, monitor, and prepare for UK compliance changes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search regulations..."
              className="pl-10 pr-4 py-2.5 bg-card/50 backdrop-blur border border-border rounded-lg text-sm w-64 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <button className="p-2.5 border border-border rounded-lg hover:bg-secondary bg-card/50 backdrop-blur transition-colors shadow-sm text-muted-foreground hover:text-foreground">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Compliance Status Overview */}
      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        <div className="card-base p-6 bg-gradient-to-br from-green-500/10 to-card border-green-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3 text-green-600">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm uppercase tracking-wider">
              Compliant Areas
            </span>
          </div>
          <div className="text-4xl font-bold mb-1 tracking-tight">8</div>
          <div className="text-sm text-muted-foreground font-medium">
            Including PSD2, GDPR
          </div>
        </div>

        <div className="card-base p-6 bg-gradient-to-br from-amber-500/10 to-card border-amber-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3 text-amber-600">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm uppercase tracking-wider">
              Upcoming Deadlines
            </span>
          </div>
          <div className="text-4xl font-bold mb-1 tracking-tight">3</div>
          <div className="text-sm text-muted-foreground font-medium">
            Action required in next 90 days
          </div>
        </div>

        <div className="card-base p-6 bg-gradient-to-br from-red-500/10 to-card border-red-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3 text-red-600">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm uppercase tracking-wider">
              Critical Alerts
            </span>
          </div>
          <div className="text-4xl font-bold mb-1 tracking-tight">1</div>
          <div className="text-sm text-muted-foreground font-medium">
            New APP Fraud Mandate
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        {/* Left: Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl">UK Compliance Timeline</h3>
            <div className="flex gap-2 p-1 bg-secondary rounded-lg">
              <span className="px-3 py-1 bg-background shadow-sm text-foreground rounded-md text-xs font-bold">
                2025
              </span>
              <span className="px-3 py-1 text-muted-foreground hover:text-foreground rounded-md text-xs font-bold transition-colors cursor-pointer">
                2026
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {timelineItems.map((item, i) => (
              <div
                key={i}
                className="card-base p-6 hover:border-primary/50 transition-all group flex gap-5 bg-card/80 backdrop-blur-sm"
              >
                <div className="flex-shrink-0 flex flex-col items-center pt-1">
                  <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex flex-col items-center justify-center text-center shadow-sm group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      {item.deadline.split(' ')[0]}
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      {item.deadline.split(' ')[1]?.replace(',', '') || ''}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors truncate">
                        {item.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded border border-border bg-background text-xs font-bold text-muted-foreground">
                        {item.region}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                        item.impact === 'Critical'
                          ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:border-red-900/30'
                          : item.impact === 'High'
                            ? 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/20 dark:border-orange-900/30'
                            : 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30'
                      }`}
                    >
                      {item.impact}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex gap-4 text-xs font-bold text-muted-foreground">
                    <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <FileText className="w-4 h-4" /> View Documentation
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <Calendar className="w-4 h-4" /> Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-6">
          <div className="card-base p-6 bg-card/80 backdrop-blur-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <div className="p-1.5 bg-secondary rounded-lg">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              UK Focus
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              This panel gives a simple view of where key UK regulatory alerts
              are concentrated.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between text-sm items-center">
                <span className="flex items-center gap-3 font-medium">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  UK Card & E‑commerce
                </span>
                <span className="font-bold bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                  3 Alerts
                </span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="flex items-center gap-3 font-medium">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  UK Faster Payments & A2A
                </span>
                <span className="font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded text-xs">
                  1 Alert
                </span>
              </div>
            </div>
          </div>

          <div className="card-base p-6 bg-gradient-to-br from-primary to-red-700 text-white border-none shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield className="w-24 h-24" />
            </div>

            <h3 className="font-bold text-lg mb-2 relative z-10">
              Need an expert opinion?
            </h3>
            <p className="text-sm text-white/90 mb-6 relative z-10 leading-relaxed">
              Our AI can analyze specific regulatory texts against your internal
              policy documents.
            </p>
            <button className="w-full py-2.5 bg-white text-primary rounded-lg font-bold text-sm shadow hover:bg-gray-50 transition-colors relative z-10 flex items-center justify-center gap-2">
              Start Analysis <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
