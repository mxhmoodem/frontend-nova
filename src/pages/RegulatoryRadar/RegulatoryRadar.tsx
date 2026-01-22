import { useState } from 'react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import { infoModalContent } from '../../constants/infoModalContent';
import './RegulatoryRadar.css';

export default function RegulatoryRadar() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Regulatory Radar"
        content={infoModalContent.regulatoryRadar}
      />
      <h2 className="regulatory-radar__heading">
        Regulatory Radar
        <InformationButton
          tooltip="Learn about this page"
          ariaLabel="Information about Regulatory Radar"
          onClick={() => setShowInfo(true)}
        />
      </h2>
      <p className="regulatory-radar__subheading">
        Track, monitor and prepare for global compliance changes.
      </p>
    </div>
  );
}
