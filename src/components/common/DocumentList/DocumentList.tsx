import React from 'react';
import { FolderOpen } from 'lucide-react';
import { DocumentCard } from '../DocumentCard/DocumentCard';
import { DocumentListProps } from './DocumentList.types';
import './DocumentList.css';

/**
 * Skeleton loader for list items
 */
const SkeletonItem: React.FC = () => (
  <div className="document-list__skeleton">
    <div className="document-list__skeleton-icon" />
    <div className="document-list__skeleton-content">
      <div className="document-list__skeleton-title" />
      <div className="document-list__skeleton-subtitle" />
    </div>
    <div className="document-list__skeleton-tag" />
    <div className="document-list__skeleton-size" />
    <div className="document-list__skeleton-date" />
    <div className="document-list__skeleton-actions">
      <div className="document-list__skeleton-action" />
      <div className="document-list__skeleton-action" />
      <div className="document-list__skeleton-action" />
    </div>
  </div>
);

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDocumentClick,
  onDownload,
  onShare,
  onDelete,
  onFavoriteToggle,
  showActions = true,
  selectedIds = [],
  className = '',
  testId,
  emptyMessage = 'No documents found',
  loading = false,
}) => {
  const listClasses = ['document-list', className].filter(Boolean).join(' ');

  // Show loading skeletons
  if (loading) {
    return (
      <div className={listClasses} data-testid={testId}>
        {[...Array(5)].map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </div>
    );
  }

  // Show empty state
  if (documents.length === 0) {
    return (
      <div className={listClasses} data-testid={testId}>
        <div className="document-list__empty">
          <FolderOpen className="document-list__empty-icon" />
          <p className="document-list__empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={listClasses} data-testid={testId}>
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          viewMode="list"
          onClick={onDocumentClick}
          onDownload={onDownload}
          onShare={onShare}
          onDelete={onDelete}
          onFavoriteToggle={onFavoriteToggle}
          showActions={showActions}
          selected={selectedIds.includes(document.id)}
          testId={`document-item-${document.id}`}
        />
      ))}
    </div>
  );
};

export default DocumentList;
