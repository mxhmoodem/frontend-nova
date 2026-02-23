import { useState, useMemo } from 'react';
import {
  PoundSterling,
  CreditCard,
  Home,
  Percent,
  RefreshCw,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import { MarketStatCard } from '../../components/common';
import { infoModalContent } from '../../constants/infoModalContent';
import {
  usePaymentStats,
  useRefreshPaymentData,
  usePaymentHistory,
} from '../../services/api';
import type {
  StatItem,
  TrendDirection,
  MetricKey,
  HistoryDateRange,
  MetricHistory,
} from '../../services/api';
import {
  DateRangePicker,
  MetricFilter,
  MetricChart,
  ChartSkeleton,
} from './components';
import type { AvailableDateRange } from './components';
import './MarketPulse.css';

/**
 * Maps API trend direction to component trend prop
 */
function mapTrend(trend: TrendDirection): 'up' | 'down' | 'neutral' {
  if (trend === 'stable') return 'neutral';
  return trend;
}

/**
 * Configuration for stat cards display
 * Descriptions and tooltips tailored for payments teams at investment banks
 * Focus: Volume trends (settlement volumes) and rate environment (margins)
 */
const STAT_CONFIG = [
  {
    key: 'total_consumer_credit',
    label: 'Consumer Credit Outstanding',
    icon: <PoundSterling size={18} />,
    dataKey: 'total_consumer_credit' as const,
    description:
      'Indicates UK household borrowing appetite and potential credit risk exposure',
    tooltip:
      'Total unsecured lending volume affects credit risk exposure and collections forecasting. Rising credit indicates increased transaction volumes but also higher default risk.',
  },
  {
    key: 'credit_card_lending',
    label: 'Credit Card Lending',
    icon: <CreditCard size={18} />,
    dataKey: 'credit_card_lending' as const,
    description:
      'Transaction volume proxy - higher lending signals increased interchange revenue potential',
    tooltip:
      'Credit card balances reflect consumer spending patterns. Higher balances suggest increased card transaction volumes and interchange revenue, but also elevated default risk.',
  },
  {
    key: 'mortgage_approvals',
    label: 'Mortgage Approvals',
    icon: <Home size={18} />,
    dataKey: 'mortgage_approvals' as const,
    description:
      'Secured lending pipeline - impacts settlement volumes and funding requirements',
    tooltip:
      'Monthly approvals indicate future settlement volumes for mortgage payments. High approval rates signal increased remittance activity and funding needs.',
  },
  {
    key: 'bank_rate',
    label: 'Bank Rate',
    icon: <Percent size={18} />,
    dataKey: 'bank_rate' as const,
    description:
      'BoE base rate - affects interbank lending costs and product pricing',
    tooltip:
      'Directly affects pricing spreads, funds transfer pricing (FTP), and margin compression. Rate changes impact profitability on lending products.',
  },
] as const;

/**
 * Metric color scheme for charts
 */
const METRIC_COLORS: Record<MetricKey, string> = {
  total_consumer_credit: '#3B82F6', // Blue
  credit_card_lending: '#8B5CF6', // Purple
  mortgage_approvals: '#10B981', // Green
  bank_rate: '#F59E0B', // Amber
};

/**
 * All available metric keys
 */
const ALL_METRICS: MetricKey[] = [
  'total_consumer_credit',
  'credit_card_lending',
  'mortgage_approvals',
  'bank_rate',
];

/**
 * Get default date range - show all available data (24 months back)
 * This ensures all metrics with varying data availability are displayed
 */
function getDefaultDateRange(): HistoryDateRange {
  const now = new Date();
  const toYear = now.getFullYear();
  const toMonth = now.getMonth() + 1;

  // 24 months ago to show all available data
  const fromDate = new Date(now);
  fromDate.setMonth(fromDate.getMonth() - 23);
  const fromYear = fromDate.getFullYear();
  const fromMonth = fromDate.getMonth() + 1;

  return { fromMonth, fromYear, toMonth, toYear };
}

export default function MarketPulse() {
  const [showInfo, setShowInfo] = useState(false);
  const [dateRange, setDateRange] = useState<HistoryDateRange>(
    getDefaultDateRange()
  );
  const [selectedMetrics, setSelectedMetrics] =
    useState<MetricKey[]>(ALL_METRICS);

  // Fetch payment data using React Query hooks
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = usePaymentStats();
  const refreshMutation = useRefreshPaymentData();

  // Fetch all historical data (24 months) and filter on frontend
  const {
    data: historyData,
    isLoading: historyLoading,
    isError: historyError,
    error: historyErrorDetails,
    refetch: refetchHistory,
  } = usePaymentHistory(24);

  const isLoading = statsLoading;
  const hasError = statsError;

  // Calculate available date range from API data
  const availableDateRange = useMemo((): AvailableDateRange | undefined => {
    if (!historyData) return undefined;

    const allDates: Date[] = [];

    // Collect all dates from all metrics
    const metrics = [
      historyData.total_consumer_credit,
      historyData.credit_card_lending,
      historyData.mortgage_approvals,
      historyData.bank_rate,
    ];

    metrics.forEach((metric) => {
      if (metric?.data) {
        metric.data.forEach((point) => {
          allDates.push(new Date(point.date));
        });
      }
    });

    if (allDates.length === 0) return undefined;

    // Find min and max dates
    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

    return {
      minMonth: minDate.getMonth() + 1,
      minYear: minDate.getFullYear(),
      maxMonth: maxDate.getMonth() + 1,
      maxYear: maxDate.getFullYear(),
    };
  }, [historyData]);

  // Filter history data by selected date range on the frontend
  const filteredHistoryData = useMemo(() => {
    if (!historyData) return null;

    const fromDate = new Date(dateRange.fromYear, dateRange.fromMonth - 1, 1);
    const toDate = new Date(dateRange.toYear, dateRange.toMonth, 0); // Last day of month

    const filterDataPoints = (
      metric: MetricHistory | null
    ): MetricHistory | null => {
      if (!metric || !metric.data) return null;
      const filteredData = metric.data.filter((point) => {
        const pointDate = new Date(point.date);
        return pointDate >= fromDate && pointDate <= toDate;
      });
      if (filteredData.length === 0) return null;
      return { ...metric, data: filteredData };
    };

    const filtered = {
      total_consumer_credit: filterDataPoints(
        historyData.total_consumer_credit
      ),
      credit_card_lending: filterDataPoints(historyData.credit_card_lending),
      mortgage_approvals: filterDataPoints(historyData.mortgage_approvals),
      bank_rate: filterDataPoints(historyData.bank_rate),
    };

    // Calculate months included from the filtered data
    const monthsIncluded =
      filtered.total_consumer_credit?.data.length ||
      filtered.credit_card_lending?.data.length ||
      filtered.mortgage_approvals?.data.length ||
      filtered.bank_rate?.data.length ||
      0;

    return {
      ...filtered,
      months_included: monthsIncluded,
    };
  }, [historyData, dateRange]);

  // Filter to only show metrics that have data
  const visibleMetrics = selectedMetrics.filter(
    (key) => filteredHistoryData?.[key]
  );

  // Build stat cards from API data
  const statCards = useMemo(() => {
    if (!statsData) return [];
    return STAT_CONFIG.map((config) => {
      const stat: StatItem | null = statsData[config.dataKey];
      if (!stat) return null;
      // Flag significant changes (±5% threshold)
      const isSignificantChange = Math.abs(stat.change) >= 5;
      return {
        id: config.key,
        label: config.label,
        value: stat.value,
        change: stat.change,
        trend: mapTrend(stat.trend),
        icon: config.icon,
        period: stat.period,
        description: config.description,
        tooltip: config.tooltip,
        isSignificant: isSignificantChange,
        source: {
          name: 'Bank of England',
        },
      };
    }).filter(Boolean);
  }, [statsData]);

  const handleRefresh = () => {
    refreshMutation.mutate();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="market-pulse">
        <div className="market-pulse__header">
          <h2 className="market-pulse__heading">Market Pulse</h2>
          <p className="market-pulse__subheading">Loading payment data...</p>
        </div>
        <div className="market-pulse__loading">
          <Loader2 size={48} className="spinning" />
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="market-pulse">
        <div className="market-pulse__header">
          <h2 className="market-pulse__heading">Market Pulse</h2>
          <p className="market-pulse__subheading">
            Unable to load payment data. Please try again.
          </p>
        </div>
        <button className="market-pulse__retry-btn" onClick={handleRefresh}>
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="market-pulse">
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Market Pulse"
        content={infoModalContent.marketPulse}
      />
      <div className="market-pulse__header">
        <h2 className="market-pulse__heading">
          Market Pulse
          <InformationButton
            tooltip="Learn about this page"
            ariaLabel="Information about Market Pulse"
            onClick={() => setShowInfo(true)}
          />
        </h2>
        <div className="market-pulse__header-actions">
          <p className="market-pulse__subheading">
            UK payment trends from Bank of England data
          </p>
          <button
            className="market-pulse__refresh-btn"
            onClick={handleRefresh}
            disabled={refreshMutation.isPending}
            title="Refresh data from Bank of England"
          >
            <RefreshCw
              size={16}
              className={refreshMutation.isPending ? 'spinning' : ''}
            />
            {refreshMutation.isPending ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        {statsData?.last_updated && (
          <p className="market-pulse__last-updated">
            Last updated:{' '}
            {new Date(statsData.last_updated).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>

      <div className="market-pulse__stats-grid">
        {statCards.map(
          (stat) =>
            stat && (
              <MarketStatCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                trend={stat.trend}
                icon={stat.icon}
                source={stat.source}
                period={stat.period}
                description={stat.description}
                tooltip={stat.tooltip}
                isSignificant={stat.isSignificant}
                testId={`market-stat-${stat.id}`}
              />
            )
        )}
      </div>

      {/* Historical Trends Section */}
      <section className="market-pulse__charts-section">
        <div className="market-pulse__charts-header">
          <h3 className="market-pulse__section-title">Historical Trends</h3>
          <div className="market-pulse__chart-filters">
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              availableRange={availableDateRange}
            />
            <MetricFilter
              selected={selectedMetrics}
              onChange={setSelectedMetrics}
            />
          </div>
        </div>

        {/* Charts Content */}
        {historyLoading ? (
          <div className="market-pulse__charts-grid">
            {[1, 2, 3, 4].map((i) => (
              <ChartSkeleton key={i} />
            ))}
          </div>
        ) : historyError ? (
          <div className="market-pulse__charts-error">
            <AlertCircle size={32} className="market-pulse__error-icon" />
            <p className="market-pulse__error-title">
              Failed to load historical data
            </p>
            <p className="market-pulse__error-message">
              {historyErrorDetails?.message || 'An unexpected error occurred'}
            </p>
            <button
              type="button"
              className="market-pulse__retry-btn"
              onClick={() => refetchHistory()}
            >
              Try Again
            </button>
          </div>
        ) : selectedMetrics.length === 0 ? (
          <div className="market-pulse__charts-empty">
            <p>Select at least one metric to display</p>
          </div>
        ) : visibleMetrics.length === 0 ? (
          <div className="market-pulse__charts-empty">
            <p>No data available for selected metrics and date range</p>
          </div>
        ) : (
          <div className="market-pulse__charts-grid">
            {visibleMetrics.map((key) => (
              <MetricChart
                key={key}
                metricKey={key}
                history={filteredHistoryData![key]!}
                color={METRIC_COLORS[key]}
              />
            ))}
          </div>
        )}

        {/* Data footnote */}
        {filteredHistoryData && (
          <p className="market-pulse__charts-footnote">
            Showing {filteredHistoryData.months_included} months of Bank of
            England data. Updated monthly at 6 AM UTC.
          </p>
        )}
      </section>
    </div>
  );
}
