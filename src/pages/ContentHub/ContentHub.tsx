import { useState } from 'react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import { infoModalContent } from '../../constants/infoModalContent';
import './ContentHub.css';

export default function ContentHub() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Content Hub"
        content={infoModalContent.contentHub}
      />
      <h2 className="content-hub__heading">
        Content Hub
        <InformationButton
          tooltip="Learn about this page"
          ariaLabel="Information about Content Hub"
          onClick={() => setShowInfo(true)}
        />
      </h2>
      <p className="content-hub__subheading">
        Central repository for all your global market intelligence documents
      </p>
    </div>
  );
}
