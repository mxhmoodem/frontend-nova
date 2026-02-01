import { ReactNode } from 'react';

/**
 * Supported file types with their associated colors and labels
 */
export type FileType =
  | 'pdf'
  | 'docx'
  | 'doc'
  | 'xlsx'
  | 'xls'
  | 'pptx'
  | 'ppt'
  | 'json'
  | 'csv'
  | 'txt'
  | 'image'
  | 'unknown';

/**
 * Category tags for documents
 */
export type DocumentCategory =
  | 'regulation'
  | 'market'
  | 'strategy'
  | 'data'
  | 'compliance'
  | 'research'
  | 'report'
  | 'other';

/**
 * Document data structure
 */
export interface DocumentData {
  /**
   * Unique identifier for the document
   */
  id: string;

  /**
   * Document title
   */
  title: string;

  /**
   * File type (extension)
   */
  fileType: FileType;

  /**
   * File size in bytes
   */
  fileSize: number;

  /**
   * Author or uploader name
   */
  author?: string;

  /**
   * Date the document was created/uploaded
   */
  createdAt: Date;

  /**
   * Date the document was last modified
   */
  modifiedAt?: Date;

  /**
   * Document category for tagging
   */
  category?: DocumentCategory;

  /**
   * Whether the document is favorited
   */
  isFavorite?: boolean;

  /**
   * Optional thumbnail URL
   */
  thumbnailUrl?: string;
}

export interface DocumentCardProps {
  /**
   * Document data to display
   */
  document: DocumentData;

  /**
   * View mode for the card
   * @default 'grid'
   */
  viewMode?: 'grid' | 'list';

  /**
   * Click handler for the card
   */
  onClick?: (document: DocumentData) => void;

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
   * Whether to show action buttons
   * @default true
   */
  showActions?: boolean;

  /**
   * Whether the card is selected
   * @default false
   */
  selected?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Test id for testing purposes
   */
  testId?: string;
}

/**
 * File type configuration for icons and colors
 */
export interface FileTypeConfig {
  color: string;
  label: string;
  icon?: ReactNode;
}

/**
 * Category configuration for styling
 */
export interface CategoryConfig {
  label: string;
  className: string;
}
