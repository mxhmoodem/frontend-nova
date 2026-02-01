import React from 'react';
import { FolderOpen } from 'lucide-react';
import { DocumentCard } from '../DocumentCard/DocumentCard';
import { DocumentGridProps } from './DocumentGrid.types';
import './DocumentGrid.css';

/**
 * Skeleton loader for grid items
 */
const SkeletonCard: React.FC = () => (
  <div className="document-grid__skeleton">
    <div className="document-grid__skeleton-icon" />
    <div className="document-grid__skeleton-content">
      <div className="document-grid__skeleton-title" />
      <div className="document-grid__skeleton-meta" />
      <div className="document-grid__skeleton-meta" />
      <div className="document-grid__skeleton-tag" />
    </div>
  </div>
);

export const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  onDocumentClick,
  onDownload,
  onShare,
  onDelete,
  onFavoriteToggle,
  showActions = true,
  selectedIds = [],
  columns = 'auto',
  className = '',
  testId,
  emptyMessage = 'No documents found',
  loading = false,
}) => {
  const gridClasses = [
    'document-grid',
    `document-grid--columns-${columns}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Show loading skeletons
  if (loading) {
    return (
      <div className={gridClasses} data-testid={testId}>
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // Show empty state
  if (documents.length === 0) {
    return (
      <div className={gridClasses} data-testid={testId}>
        <div className="document-grid__empty">
          <FolderOpen className="document-grid__empty-icon" />
          <p className="document-grid__empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={gridClasses} data-testid={testId}>
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          viewMode="grid"
          onClick={onDocumentClick}
          onDownload={onDownload}
          onShare={onShare}
          onDelete={onDelete}
          onFavoriteToggle={onFavoriteToggle}
          showActions={showActions}
          selected={selectedIds.includes(document.id)}
          testId={`document-card-${document.id}`}
        />
      ))}
    </div>
  );
};

export default DocumentGrid;
