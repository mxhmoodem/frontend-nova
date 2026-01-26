import { useState } from 'react';
import { FiBarChart2, FiUpload } from 'react-icons/fi';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import { Button } from '../../components/common';
import { UploadDocumentModal } from '../../components/common/UploadDocumentModal/UploadDocumentModal';
import ChartBuilderModal from '../../components/features/chart-builder';
import { infoModalContent } from '../../constants/infoModalContent';
import type { DocumentFormData } from '../../components/common/UploadDocumentModal/UploadDocumentModal.types';
import './ContentHub.css';

export default function ContentHub() {
  const [showInfo, setShowInfo] = useState(false);
  const [showChartBuilder, setShowChartBuilder] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleDocumentUpload = (file: File, formData: DocumentFormData) => {
    console.log('Document uploaded:', { file, formData });
    // TODO: Implement actual upload logic
    setShowUploadModal(false);
  };

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
      <UploadDocumentModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleDocumentUpload}
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
              onClick={() => setShowUploadModal(true)}
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
