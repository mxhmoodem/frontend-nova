import { useState } from 'react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { AIQuerySearch } from '../../components/common/AIQuerySearch';
import { InfoModal } from '../../components/features/common/InfoModal';
import { infoModalContent } from '../../constants/infoModalContent';
import './AIConsole.css';

export default function AIConsole() {
  const [showInfo, setShowInfo] = useState(false);

  const handleAsk = (query: string) => {
    console.log('AI Query:', query);
  };

  return (
    <div>
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="AI Console"
        content={infoModalContent.aiConsole}
      />
      <h2 className="ai-console__heading">
        AI Console
        <InformationButton
          tooltip="Learn about this page"
          ariaLabel="Information about AI Console"
          onClick={() => setShowInfo(true)}
        />
      </h2>
      <p className="ai-console__subheading">Powered by AI</p>

      <div
        style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
      >
        <AIQuerySearch onAsk={handleAsk} />
      </div>
    </div>
  );
}
