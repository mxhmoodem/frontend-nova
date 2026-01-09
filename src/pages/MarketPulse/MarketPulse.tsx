import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Smartphone,
  CreditCard,
  ArrowRight,
  BarChart3,
  Calendar,
  Map,
  Download,
  Info,
  PoundSterling,
  Zap,
  Layers,
} from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'Market Pulse shows how payment and e-commerce markets are changing in the UK, across segments and time.',
  whatItDoes: [
    'Aggregates market and e-commerce trend data from multiple sources.',
    'Visualises trends such as transaction volumes, growth rates, and adoption of new payment methods.',
    'Surfaces the latest market news and changes in customer behaviour.',
  ],
  whenToUse:
    'Use this screen when you need to understand market dynamics before making product, pricing, or investment decisions.',
  howToUse: [
    'Select product type and time range using the filters.',
    'Review charts to see how volumes and growth are moving.',
    'Read recent news items for context.',
    'Ask the assistant to explain the trends or suggest possible opportunities or risks.',
  ],
  example:
    "I filter to 'UK – e-commerce – last 12 months' and see strong growth. I ask the assistant: 'What could be driving this increase, and what does it mean for our online card offering?'",
  projectRelation:
    'Market Pulse uses the centralised market and transaction data to provide insight into trends, helping teams move from static spreadsheets to live, AI-supported market intelligence.',
};

const kpis = [
  {
    label: 'Total Volume',
    value: '£4.2B',
    trend: '+12.5%',
    isUp: true,
    icon: PoundSterling,
  },
  {
    label: 'Digital Wallets',
    value: '45%',
    trend: '+5.2%',
    isUp: true,
    icon: Smartphone,
  },
  {
    label: 'Card Payments',
    value: '32%',
    trend: '-2.1%',
    isUp: false,
    icon: CreditCard,
  },
  {
    label: 'Faster Payments',
    value: '£890M',
    trend: '+8.4%',
    isUp: true,
    icon: Zap,
  },
];

const segments = [
  { name: 'E-commerce', val: 82, color: 'bg-blue-500' },
  { name: 'POS', val: 65, color: 'bg-primary' },
  { name: 'Recurring', val: 45, color: 'bg-purple-500' },
  { name: 'B2B', val: 30, color: 'bg-amber-500' },
];

const reports = [
  {
    title: 'UK E-commerce Trends 2025',
    tag: 'Strategic',
    date: '2 days ago',
    bg: 'from-blue-500/10 to-transparent',
  },
  {
    title: 'The Rise of A2A Payments in UK',
    tag: 'Technical',
    date: '4 days ago',
    bg: 'from-primary/10 to-transparent',
  },
  {
    title: 'Crypto Adoption in UK Retail',
    tag: 'Emerging',
    date: '1 week ago',
    bg: 'from-purple-500/10 to-transparent',
  },
];

const chartData = [40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function MarketPulse() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Market Pulse"
        content={infoContent}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Market Pulse
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
            Real-time analysis of UK payment trends and transaction volumes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-card/50 backdrop-blur border border-border rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-md flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="card-base p-6 hover:border-primary/50 transition-colors bg-card/80 backdrop-blur-sm group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-secondary rounded-xl text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <kpi.icon className="w-5 h-5" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border border-border/50 ${
                  kpi.isUp
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/10'
                    : 'text-red-600 bg-red-50 dark:bg-red-900/10'
                }`}
              >
                {kpi.isUp ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {kpi.trend}
              </div>
            </div>
            <div className="text-3xl font-bold mb-1 tracking-tight">
              {kpi.value}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              {kpi.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        {/* Large Chart Area */}
        <div className="lg:col-span-2 card-base p-6 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <div className="p-1.5 bg-secondary rounded-lg">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              UK Payment Mix Evolution
            </h3>
            <div className="flex gap-1 p-1 bg-secondary rounded-lg">
              {['Monthly', 'Quarterly', 'Yearly'].map((t, i) => (
                <button
                  key={t}
                  className={`text-xs font-bold px-3 py-1.5 rounded-md transition-all ${
                    i === 0
                      ? 'bg-background shadow text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-80 w-full flex items-end justify-between gap-3 sm:gap-6 px-2 pb-0 border-b border-border relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-full h-px bg-border/50 border-dashed"
                />
              ))}
            </div>

            {chartData.map((h, i) => (
              <div
                key={i}
                className="w-full h-full flex items-end relative group"
              >
                <div
                  className="w-full bg-primary/80 hover:bg-primary rounded-t-md transition-all duration-500 relative z-10"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-md" />
                </div>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-all shadow-xl z-20 pointer-events-none">
                  £{h}M
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-medium text-muted-foreground px-2">
            {months.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="card-base p-6 bg-card/80 backdrop-blur-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <div className="p-1.5 bg-secondary rounded-lg">
                <Map className="w-4 h-4 text-primary" />
              </div>
              Segment Growth (UK)
            </h3>
            <div className="space-y-5">
              {segments.map((region, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>{region.name}</span>
                    <span className="text-foreground">+{region.val}% YoY</span>
                  </div>
                  <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${region.color} rounded-full`}
                      style={{ width: `${region.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-base p-6 bg-gradient-to-br from-secondary to-background border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Layers className="w-24 h-24 text-primary" />
            </div>

            <h3 className="font-bold text-lg mb-3 relative z-10">
              Analyst Insight
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 relative z-10 font-medium">
              "Adoption of Variable Recurring Payments (VRP) is accelerating in
              the UK utility sector, reducing direct debit friction."
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                AI
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">
                  Generated by Insight Bot
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Just now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports Grid */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">Latest UK Market Reports</h3>
          <a
            href="#"
            className="text-sm text-primary hover:underline flex items-center gap-1 font-bold"
          >
            View library <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reports.map((report, i) => (
            <div
              key={i}
              className={`card-base p-6 hover:shadow-lg transition-all group cursor-pointer bg-gradient-to-br ${report.bg} hover:border-primary/50`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 bg-background/50 border border-border/50 rounded-md text-xs font-bold text-foreground backdrop-blur-sm">
                  {report.tag}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {report.date}
                </span>
              </div>
              <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-tight">
                {report.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Detailed analysis of market shifts, consumer behavior, and
                regulatory impacts...
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                Read Report <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
