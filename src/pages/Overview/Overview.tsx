import { useMemo } from 'react';
import { PoundSterling, CreditCard, Home, Percent } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getFirstName } from '../../utils/formatters';
import {
  usePaymentStats,
  usePaymentHistory,
  useTrendAlerts,
  useLegislation,
  useMarketTrends,
} from '../../services/api';
import type { TrendDirection } from '../../services/api';
import {
  LiveStatusBar,
  OverviewMetricCard,
  AIDailyBriefing,
  ComplianceSidebar,
  MarketSnapshot,
  IntelligenceFeed,
  UKPaymentHeatmap,
} from './components';
import type { MetricTrend } from './components';
import './Overview.css';

/** Maps BoE trend direction to component trend prop */
function mapTrend(t?: TrendDirection): MetricTrend {
  if (t === 'up') return 'up';
  if (t === 'down') return 'down';
  return 'neutral';
}

/**
 * Deterministic sparkline data per metric trend
 * Used for visual context when API history is loading
 */
const SPARKLINES: Record<MetricTrend, number[]> = {
  up: [40, 42, 39, 44, 47, 44, 49, 53],
  down: [58, 55, 60, 53, 51, 57, 50, 46],
  neutral: [50, 52, 49, 51, 50, 53, 51, 50],
};

const METRIC_LABELS = [
  {
    key: 'total_consumer_credit' as const,
    label: 'Total Consumer Credit',
    icon: <PoundSterling size={16} />,
  },
  {
    key: 'mortgage_approvals' as const,
    label: 'Mortgage Approvals',
    icon: <Home size={16} />,
  },
  {
    key: 'bank_rate' as const,
    label: 'BoE Base Rate',
    icon: <Percent size={16} />,
  },
  {
    key: 'credit_card_lending' as const,
    label: 'Credit Card Lending',
    icon: <CreditCard size={16} />,
  },
];

export default function Overview() {
  const { user } = useAuth();
  const userName = user?.name ? getFirstName(user.name) : 'User';

  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = usePaymentStats();
  const { data: historyData } = usePaymentHistory(12);
  const { data: alertsData, isLoading: alertsLoading } = useTrendAlerts();
  const { data: legislationData, isLoading: legislationLoading } =
    useLegislation();
  const { data: marketData, isLoading: marketLoading } = useMarketTrends();

  /** Derive sparkline data from actual history where available */
  const sparklinesByMetric = useMemo(() => {
    const result: Record<string, number[]> = {};
    if (!historyData) return result;

    const metricsMap = {
      total_consumer_credit: historyData.total_consumer_credit,
      mortgage_approvals: historyData.mortgage_approvals,
      bank_rate: historyData.bank_rate,
      credit_card_lending: historyData.credit_card_lending,
    };

    Object.entries(metricsMap).forEach(([key, metric]) => {
      if (metric?.data && metric.data.length >= 2) {
        result[key] = metric.data.slice(-8).map((p) => p.value);
      }
    });
    return result;
  }, [historyData]);

  /** Extract the flat items array from the paginated response */
  const legislationItems = legislationData?.items;

  /** Derive LiveStatusBar values from real API data */
  const documentsIndexed =
    (legislationData?.total ?? 0) + (marketData?.data?.items?.length ?? 0);
  const marketsTracked = marketData?.data?.items?.length ?? 0;
  const criticalDeadlines = alertsData?.alerts?.length ?? 0;
  const apiStatus: 'live' | 'degraded' | 'offline' = statsError
    ? 'offline'
    : statsData?.last_updated
      ? 'live'
      : statsLoading
        ? 'live'
        : 'degraded';

  return (
    <div className="overview">
      {/* ─── 1. Live Status Bar ─── */}
      <LiveStatusBar
        documentsIndexed={documentsIndexed}
        marketsTracked={marketsTracked}
        criticalDeadlines={criticalDeadlines}
        apiStatus={apiStatus}
      />

      {/* ─── 2. Top Section: Metrics + Heatmap ─── */}
      <div className="overview__top-section">
        <div className="overview__metrics-column">
          {/* 4 metric cards */}
          <div className="overview__metrics-grid">
            {METRIC_LABELS.map(({ key, label }) => {
              const stat = statsData?.[key];
              const trend = mapTrend(stat?.trend);
              const sparkline = sparklinesByMetric[key] ?? SPARKLINES[trend];

              return (
                <OverviewMetricCard
                  key={key}
                  label={label}
                  value={stat?.value ?? '—'}
                  change={stat?.change}
                  trend={trend}
                  sparklineData={sparkline}
                  period="Updated today"
                  isLoading={statsLoading}
                />
              );
            })}
          </div>

          {/* AI Daily Briefing hero */}
          <AIDailyBriefing
            userName={userName}
            legislationData={legislationItems}
            marketData={marketData ?? undefined}
            alertsData={alertsData ?? undefined}
            isLoading={legislationLoading || marketLoading || alertsLoading}
          />
        </div>

        {/* UK Heatmap - spans both rows */}
        <div className="overview__heatmap-column">
          <UKPaymentHeatmap />
        </div>
      </div>

      {/* ─── 3. Content Row: Feed (left) | Market Snapshot + Compliance (right) ─── */}
      <div className="overview__content-row">
        <IntelligenceFeed
          legislationData={legislationItems}
          marketData={marketData ?? undefined}
          alertsData={alertsData ?? undefined}
          isLoading={legislationLoading || marketLoading || alertsLoading}
          maxItems={5}
        />
        <div className="overview__content-right">
          <MarketSnapshot statsData={statsData} isLoading={statsLoading} />
          <ComplianceSidebar complianceScore={82} jurisdiction="UK" />
        </div>
      </div>
    </div>
  );
}
