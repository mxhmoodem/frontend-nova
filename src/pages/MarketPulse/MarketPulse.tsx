import { useState } from 'react';
import { PoundSterling, Smartphone, CreditCard, Zap } from 'lucide-react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import { MarketStatCard } from '../../components/common';
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
    source: 'UK Finance',
    period: 'Q4 2025',
  },
  {
    id: 'digital-wallets',
    label: 'Digital Wallets',
    value: '45%',
    change: 5.2,
    trend: 'up' as const,
    icon: <Smartphone size={18} />,
    source: 'Pay.UK',
    period: 'YTD',
  },
  {
    id: 'card-payments',
    label: 'Card Payments',
    value: '32%',
    change: -2.1,
    trend: 'down' as const,
    icon: <CreditCard size={18} />,
    source: 'UK Cards Assoc.',
    period: 'Q4 2025',
  },
  {
    id: 'faster-payments',
    label: 'Faster Payments',
    value: '£890M',
    change: 8.4,
    trend: 'up' as const,
    icon: <Zap size={18} />,
    source: 'Pay.UK',
    period: 'Dec 2025',
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
          Real-time analysis of global payment trends and transaction volumes
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
    </div>
  );
}
