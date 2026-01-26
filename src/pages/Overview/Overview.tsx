import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { getFirstName } from '../../utils/formatters';
import { InfoModal } from '../../components/features/common/InfoModal';
import { infoModalContent } from '../../constants/infoModalContent';
import './Overview.css';

export default function Overview() {
  const { user } = useAuth();
  const userName = user?.name ? getFirstName(user.name) : 'User';
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Overview Dashboard"
        content={infoModalContent.overview}
      />
      <h2 className="overview__heading">
        Overview
        <InformationButton
          tooltip="Learn about this page"
          ariaLabel="Information about Overview Dashboard"
          onClick={() => setShowInfo(true)}
        />
      </h2>
      <p className="overview__subheading">
        Welcome back, {userName}. Here's what's happening in the global payment
        landscape today.
      </p>
    </div>
  );
}
