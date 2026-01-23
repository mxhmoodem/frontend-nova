import { useState } from 'react';
import { FiBarChart2, FiUpload } from 'react-icons/fi';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import { Button } from '../../components/common';
import ChartBuilderModal from '../../components/features/chart-builder';
import { infoModalContent } from '../../constants/infoModalContent';
import './ContentHub.css';

export default function ContentHub() {
  const [showInfo, setShowInfo] = useState(false);
  const [showChartBuilder, setShowChartBuilder] = useState(false);

  return (
    <div>
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Content Hub"
        content={infoModalContent.contentHub}
      />
      <ChartBuilderModal
        isOpen={showChartBuilder}
        onClose={() => setShowChartBuilder(false)}
      />
      <header className="content-hub-header">
        <div className="content-hub-header__top">
          <h2 className="content-hub__heading">
            Content Hub
            <InformationButton
              tooltip="Learn about this page"
              ariaLabel="Information about Content Hub"
              onClick={() => setShowInfo(true)}
            />
          </h2>
          <div className="content-hub-header__buttons">
            <Button
              variant="secondary"
              text="Upload Document"
              icon={<FiUpload size={16} />}
              onClick={() => {}}
            />
            <Button
              variant="primary"
              text="Chart Builder"
              icon={<FiBarChart2 size={16} />}
              onClick={() => setShowChartBuilder(true)}
            />
          </div>
        </div>
        <p className="content-hub__subheading">
          Central repository for all your global market intelligence documents
        </p>
      </header>
    </div>
  );
}
