import { useState } from 'react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import { infoModalContent } from '../../constants/infoModalContent';
import './MarketPulse.css';

export default function MarketPulse() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Market Pulse"
        content={infoModalContent.marketPulse}
      />
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
  );
}
