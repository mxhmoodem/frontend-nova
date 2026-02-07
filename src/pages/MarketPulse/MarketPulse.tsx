import { useState } from 'react';
import { PoundSterling, Smartphone, CreditCard, Zap } from 'lucide-react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import {
  MarketStatCard,
  PaymentMethodBreakdown,
  TrendAlerts,
} from '../../components/common';
import type { PaymentMethod, TrendAlert } from '../../components/common';
import { infoModalContent } from '../../constants/infoModalContent';
import './MarketPulse.css';

// Mock market data - in a real app this would come from an API
const MARKET_STATS = [
  {
    id: 'total-volume',
    label: 'Total Volume',
    value: '£4.2B',
    change: 12.5,
    trend: 'up' as const,
    icon: <PoundSterling size={18} />,
    source: {
      name: 'UK Finance',
      url: 'https://www.ukfinance.org.uk/data-and-research',
    },
    period: 'Q4 2024',
  },
  {
    id: 'digital-wallets',
    label: 'Digital Wallets',
    value: '45%',
    change: 5.2,
    trend: 'up' as const,
    icon: <Smartphone size={18} />,
    source: {
      name: 'Pay.UK',
      url: 'https://www.wearepay.uk/what-we-do/payment-statistics/',
    },
    period: 'YTD',
  },
  {
    id: 'card-payments',
    label: 'Card Payments',
    value: '32%',
    change: -2.1,
    trend: 'down' as const,
    icon: <CreditCard size={18} />,
    source: {
      name: 'UK Finance',
      url: 'https://www.ukfinance.org.uk/data-and-research/data/cards',
    },
    period: 'Q4 2024',
  },
  {
    id: 'faster-payments',
    label: 'Faster Payments',
    value: '£890M',
    change: 8.4,
    trend: 'up' as const,
    icon: <Zap size={18} />,
    source: {
      name: 'Pay.UK',
      url: 'https://www.wearepay.uk/what-we-do/payment-statistics/',
    },
    period: 'Dec 2024',
  },
];

// Payment method breakdown data - reflects UK Finance published breakdown
const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'cards', name: 'Card Payments', percentage: 45, color: '#3B82F6' },
  { id: 'faster', name: 'Faster Payments', percentage: 28, color: '#10B981' },
  {
    id: 'direct-debit',
    name: 'Direct Debit',
    percentage: 18,
    color: '#8B5CF6',
  },
  { id: 'cash', name: 'Cash', percentage: 6, color: '#F59E0B' },
  { id: 'other', name: 'Other', percentage: 3, color: '#6B7280' },
];

// Trend alerts - notable changes from UK payment data
const TREND_ALERTS: TrendAlert[] = [
  {
    id: 'open-banking',
    metric: 'Open Banking Payments',
    change: 34,
    direction: 'up',
    period: 'YoY',
    context: 'Strong VRP adoption in utilities',
  },
  {
    id: 'cash-usage',
    metric: 'Cash Usage',
    change: 12,
    direction: 'down',
    period: 'YoY',
  },
  {
    id: 'contactless',
    metric: 'Contactless Share',
    change: 8,
    direction: 'up',
    period: 'QoQ',
  },
  {
    id: 'cheques',
    metric: 'Cheque Volume',
    change: 18,
    direction: 'down',
    period: 'YoY',
  },
];

export default function MarketPulse() {
  const [showInfo, setShowInfo] = useState(false);

  const handleStatClick = (statId: string) => {
    console.log(`Clicked on ${statId} stat card`);
    // TODO: Navigate to detailed view or open modal
  };

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
        <p className="market-pulse__subheading">
          Real-time analysis of UK payment trends and transaction volumes
        </p>
      </div>

      <div className="market-pulse__stats-grid">
        {MARKET_STATS.map((stat) => (
          <MarketStatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            source={stat.source}
            period={stat.period}
            onClick={() => handleStatClick(stat.id)}
            testId={`market-stat-${stat.id}`}
          />
        ))}
      </div>

      <div className="market-pulse__charts-section">
        <div className="market-pulse__chart-main">
          <PaymentMethodBreakdown
            title="UK Payment Method Mix"
            methods={PAYMENT_METHODS}
            source={{
              name: 'UK Finance',
              url: 'https://www.ukfinance.org.uk/data-and-research',
            }}
            period="Q4 2024"
            testId="payment-breakdown"
          />
        </div>
        <div className="market-pulse__chart-sidebar">
          <TrendAlerts
            title="Notable Changes"
            alerts={TREND_ALERTS}
            source={{
              name: 'Pay.UK / UK Finance',
              url: 'https://www.wearepay.uk/what-we-do/payment-statistics/',
            }}
            testId="trend-alerts"
          />
        </div>
      </div>
    </div>
  );
}
