import type { DocumentData } from '../DocumentCard/DocumentCard.types';

export interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentData | null;
  allDocuments?: DocumentData[];
  onDownload?: (document: DocumentData) => void;
  onDelete?: (document: DocumentData) => void | Promise<void>;
  onFavoriteToggle?: (document: DocumentData) => void;
  onPrevious?: () => void;
  onNext?: () => void;
}
