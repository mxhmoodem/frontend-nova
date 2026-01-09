import { useState } from 'react';
import {
  ArrowUpRight,
  FileText,
  TrendingUp,
  AlertCircle,
  Clock,
  Globe,
  PieChart,
  Info,
  PoundSterling,
  Sparkles,
} from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'The Overview Dashboard gives you a quick, high-level view of what is happening across the UK market, regulations, and your key payment metrics today.',
  whatItDoes: [
    'Brings together the latest UK market news, regulatory changes from the FCA/PSR, and key performance indicators.',
    'Shows a daily AI-generated summary so you can see the most important developments at a glance.',
    'Highlights anything that may need your attention, such as upcoming regulatory deadlines or unusual changes in payment activity.',
  ],
  whenToUse:
    'Use this screen at the start of your day or before important meetings to understand "what\'s changed" and where you should focus.',
  howToUse: [
    'Scan the Daily Briefing for a quick narrative summary.',
    'Check key metrics and alerts to see if there is anything urgent.',
    'Click into Market Pulse, Regulatory Radar, or Content Hub from the widgets if you need more detail.',
    'Use the assistant to ask follow-up questions about anything you see.',
  ],
  example:
    'I see that a new FCA consultation is highlighted. I click into the regulatory card to understand the new rule, then ask the assistant how this might affect our UK operations.',
  projectRelation:
    "This screen delivers the project's core promise: centralising fragmented data and using AI to turn it into clear, actionable insight for faster, better decisions.",
};

const stats = [
  {
    label: 'New UK Documents',
    value: '14',
    sub: '+8% this week',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    label: 'FCA Alerts',
    value: '2',
    sub: '1 Critical (APP Fraud)',
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50 dark:bg-red-900/20',
    isCritical: true,
  },
  {
    label: 'UK Market Reports',
    value: '8',
    sub: 'Updated yesterday',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    label: 'UK Volume',
    value: '£2.4B',
    sub: '+5.2% YoY',
    icon: PoundSterling,
    color: 'text-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
];

const regulatoryItems = [
  {
    title: 'PSR APP Fraud Reimbursement Policy',
    source: 'Payment Systems Regulator',
    date: '2 hours ago',
    tag: 'Regulation',
    impact: 'High' as const,
  },
  {
    title: 'FCA Consumer Duty: Closed Products Review',
    source: 'FCA',
    date: '5 hours ago',
    tag: 'Compliance',
    impact: 'Medium' as const,
  },
  {
    title: 'UK Digital Pound: Consultation Response',
    source: 'Bank of England',
    date: '1 day ago',
    tag: 'Strategy',
    impact: 'Low' as const,
  },
];

const trendingTags = [
  'Open Banking',
  'Confirmation of Payee',
  'APP Fraud',
  'Variable Recurring Payments',
  'FCA',
  'Consumer Duty',
];

export default function Overview() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Overview Dashboard"
        content={infoContent}
      />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Dashboard
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
            Welcome back, Jane. Here's what's happening in the UK payment
            landscape today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border backdrop-blur-sm">
          <Clock className="w-4 h-4" />
          <span>Last updated: Just now</span>
        </div>
      </div>

      {/* AI Console Button */}
      <div className="relative z-10 bg-gradient-to-br from-card to-secondary border border-border rounded-2xl p-8 overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-medium mb-3">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>AI Research Assistant</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Get AI-powered insights
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Ask questions about UK regulations, market trends, and payment intelligence. Generate reports and get instant answers.
            </p>
          </div>

          <a
            href="/app/ai-console"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Sparkles className="w-5 h-5" />
            Open AI Console
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="card-base p-6 card-hover group bg-card/80 backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-colors group-hover:scale-110 duration-200`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full border border-border/50 ${
                  stat.isCritical
                    ? 'text-red-600 bg-red-50 dark:bg-red-900/10'
                    : 'text-muted-foreground bg-secondary/50'
                }`}
              >
                {stat.sub}
              </span>
            </div>
            <div className="text-4xl font-bold mb-1 group-hover:text-primary transition-colors tracking-tight">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        {/* Left Column: Regulatory Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="p-1.5 bg-secondary rounded-lg">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              Regulatory Radar
            </h3>
            <button className="text-sm text-primary font-bold hover:underline">
              View all updates
            </button>
          </div>

          <div className="card-base divide-y divide-border bg-card/80 backdrop-blur-sm overflow-hidden">
            {regulatoryItems.map((item, i) => (
              <div
                key={i}
                className="p-5 hover:bg-secondary/40 transition-colors group cursor-pointer flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-secondary overflow-hidden shadow-sm border border-border">
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-muted-foreground bg-secondary">
                      {item.source.substring(0, 3)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-base group-hover:text-primary transition-colors truncate pr-4">
                      {item.title}
                    </h4>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span>{item.source}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold border border-blue-100 dark:border-blue-900/30">
                      {item.tag}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        item.impact === 'High'
                          ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-900/30'
                          : item.impact === 'Medium'
                            ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30'
                            : 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-900/30'
                      }`}
                    >
                      {item.impact} Impact
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Widgets */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="p-1.5 bg-secondary rounded-lg">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              Market Pulse
            </h3>
          </div>

          <div className="card-base p-6 bg-card/80 backdrop-blur-sm">
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Trending in UK
            </h4>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs font-bold hover:border-primary/50 hover:text-primary cursor-pointer transition-all"
                >
                  # {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Consumer Confidence</span>
                <span className="text-sm font-bold text-green-600">+2.4%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-[55%]" />
              </div>
            </div>
          </div>

          <div className="card-base p-0 overflow-hidden border-none shadow-lg relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-red-900 z-0" />

            <div className="relative z-10 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded backdrop-blur-md">
                  NEW REPORT
                </span>
              </div>

              <h4 className="font-bold text-xl mb-2 leading-tight">
                UK Payment Trends 2025
              </h4>
              <p className="text-sm text-white/90 mb-6 leading-relaxed">
                In-depth analysis of the shift to VRP and A2A payments in the UK
                market.
              </p>

              <button className="w-full py-3 bg-white text-primary rounded-xl text-sm font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                Read Full Analysis <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
