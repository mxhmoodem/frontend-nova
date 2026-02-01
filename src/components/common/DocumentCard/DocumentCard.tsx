import React from 'react';
import {
  FileText,
  File,
  FileSpreadsheet,
  Presentation,
  FileJson,
  FileType2,
  Image,
  Heart,
  Download,
  Share2,
  Trash2,
  User,
  Calendar,
  HardDrive,
} from 'lucide-react';
import {
  DocumentCardProps,
  FileType,
  DocumentCategory,
  FileTypeConfig,
  CategoryConfig,
} from './DocumentCard.types';
import './DocumentCard.css';

/**
 * File type configurations
 */
const FILE_TYPE_CONFIG: Record<FileType, FileTypeConfig> = {
  pdf: { color: '#dc2626', label: 'PDF File' },
  docx: { color: '#2563eb', label: 'DOCX File' },
  doc: { color: '#2563eb', label: 'DOC File' },
  xlsx: { color: '#16a34a', label: 'Excel File' },
  xls: { color: '#16a34a', label: 'Excel File' },
  csv: { color: '#16a34a', label: 'CSV File' },
  pptx: { color: '#ea580c', label: 'PowerPoint' },
  ppt: { color: '#ea580c', label: 'PowerPoint' },
  json: { color: '#eab308', label: 'JSON File' },
  txt: { color: '#6b7280', label: 'Text File' },
  image: { color: '#8b5cf6', label: 'Image' },
  unknown: { color: '#9ca3af', label: 'File' },
};

/**
 * Category configurations
 */
const CATEGORY_CONFIG: Record<DocumentCategory, CategoryConfig> = {
  regulation: { label: 'Regulation', className: 'regulation' },
  market: { label: 'Market', className: 'market' },
  strategy: { label: 'Strategy', className: 'strategy' },
  data: { label: 'Data', className: 'data' },
  compliance: { label: 'Compliance', className: 'compliance' },
  research: { label: 'Research', className: 'research' },
  report: { label: 'Report', className: 'report' },
  other: { label: 'Other', className: 'other' },
};

/**
 * Get file icon based on file type
 */
const getFileIcon = (fileType: FileType): React.ReactElement => {
  switch (fileType) {
    case 'pdf':
      return <FileText />;
    case 'docx':
    case 'doc':
      return <FileText />;
    case 'xlsx':
    case 'xls':
    case 'csv':
      return <FileSpreadsheet />;
    case 'pptx':
    case 'ppt':
      return <Presentation />;
    case 'json':
      return <FileJson />;
    case 'txt':
      return <FileType2 />;
    case 'image':
      return <Image />;
    default:
      return <File />;
  }
};

/**
 * Format file size for display
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Format date for display
 */
const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return 'Today';
  } else if (days === 1) {
    return 'Yesterday';
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  }
};

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  viewMode = 'grid',
  onClick,
  onDownload,
  onShare,
  onDelete,
  onFavoriteToggle,
  showActions = true,
  selected = false,
  className = '',
  testId,
}) => {
  const { title, fileType, fileSize, author, createdAt, category, isFavorite } =
    document;

  const fileConfig = FILE_TYPE_CONFIG[fileType] || FILE_TYPE_CONFIG.unknown;
  const categoryConfig = category ? CATEGORY_CONFIG[category] : null;

  const handleClick = () => {
    onClick?.(document);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(document);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.(document);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(document);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(document);
  };

  const cardClasses = [
    'document-card',
    `document-card--${viewMode}`,
    onClick && 'document-card--clickable',
    selected && 'document-card--selected',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Grid View
  if (viewMode === 'grid') {
    return (
      <div
        className={cardClasses}
        onClick={onClick ? handleClick : undefined}
        data-testid={testId}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick();
                }
              }
            : undefined
        }
      >
        <div className="document-card__icon-section">
          <div
            className={`document-card__file-icon document-card__file-icon--${fileType}`}
          >
            {getFileIcon(fileType)}
            <span className="document-card__file-type-label">
              {fileConfig.label}
            </span>
          </div>
          {showActions && onFavoriteToggle && (
            <button
              className={`document-card__favorite ${isFavorite ? 'document-card__favorite--active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
              type="button"
            >
              <Heart size={16} />
            </button>
          )}
        </div>

        <div className="document-card__content">
          <h3 className="document-card__title" title={title}>
            {title}
          </h3>

          <div className="document-card__meta">
            {author && (
              <div className="document-card__meta-row">
                <User />
                <span>{author}</span>
              </div>
            )}
            <div className="document-card__meta-row">
              <HardDrive />
              <span className="document-card__size">
                {formatFileSize(fileSize)}
              </span>
            </div>
            <div className="document-card__meta-row">
              <Calendar />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>

          {categoryConfig && (
            <span
              className={`document-card__category document-card__category--${categoryConfig.className}`}
            >
              {categoryConfig.label}
            </span>
          )}
        </div>
      </div>
    );
  }

  // List View
  return (
    <div
      className={cardClasses}
      onClick={onClick ? handleClick : undefined}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
    >
      <div
        className={`document-card__file-icon document-card__file-icon--${fileType}`}
      >
        {getFileIcon(fileType)}
      </div>

      <div className="document-card__info">
        <h3 className="document-card__title" title={title}>
          {title}
        </h3>
        <span className="document-card__subtitle">
          {fileConfig.label}
          {author && ` • ${author}`}
        </span>
      </div>

      {categoryConfig && (
        <span
          className={`document-card__category document-card__category--${categoryConfig.className}`}
        >
          {categoryConfig.label}
        </span>
      )}

      <span className="document-card__size">{formatFileSize(fileSize)}</span>

      <div className="document-card__date-info">
        <span className="document-card__date">{formatDate(createdAt)}</span>
        {author && <span className="document-card__author">by {author}</span>}
      </div>

      {showActions && (
        <div className="document-card__actions">
          {onDownload && (
            <button
              className="document-card__action-btn"
              onClick={handleDownloadClick}
              aria-label="Download document"
              type="button"
            >
              <Download />
            </button>
          )}
          {onShare && (
            <button
              className="document-card__action-btn"
              onClick={handleShareClick}
              aria-label="Share document"
              type="button"
            >
              <Share2 />
            </button>
          )}
          {onDelete && (
            <button
              className="document-card__action-btn document-card__action-btn--danger"
              onClick={handleDeleteClick}
              aria-label="Delete document"
              type="button"
            >
              <Trash2 />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentCard;
