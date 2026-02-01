import { DocumentData } from '../DocumentCard/DocumentCard.types';

export interface DocumentGridProps {
  /**
   * Array of documents to display
   */
  documents: DocumentData[];

  /**
   * Handler when a document is clicked
   */
  onDocumentClick?: (document: DocumentData) => void;

  /**
   * Handler for download action
   */
  onDownload?: (document: DocumentData) => void;

  /**
   * Handler for share action
   */
  onShare?: (document: DocumentData) => void;

  /**
   * Handler for delete action
   */
  onDelete?: (document: DocumentData) => void;

  /**
   * Handler for favorite toggle
   */
  onFavoriteToggle?: (document: DocumentData) => void;

  /**
   * Whether to show action buttons on cards
   * @default true
   */
  showActions?: boolean;

  /**
   * Currently selected document IDs
   */
  selectedIds?: string[];

  /**
   * Number of columns in the grid
   * @default 'auto' (responsive)
   */
  columns?: 1 | 2 | 3 | 4 | 'auto';

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Test id for testing purposes
   */
  testId?: string;

  /**
   * Empty state message
   */
  emptyMessage?: string;

  /**
   * Loading state
   */
  loading?: boolean;
}
