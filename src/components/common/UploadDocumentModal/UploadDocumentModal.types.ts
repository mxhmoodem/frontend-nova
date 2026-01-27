/**
 * Document type options for categorization
 */
export type DocumentType =
  | 'regulatory'
  | 'payments'
  | 'market'
  | 'compliance'
  | 'other';

/**
 * Accepted file types for upload
 */
export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
  ],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': [
    '.pptx',
  ],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
    '.xlsx',
  ],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
};

/**
 * Human-readable file type labels
 */
export const FILE_TYPE_LABELS: Record<string, string> = {
  'application/pdf': 'PDF Document',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'Word Document',
  'application/vnd.ms-powerpoint': 'PowerPoint Presentation',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'PowerPoint Presentation',
  'application/vnd.ms-excel': 'Excel Spreadsheet',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    'Excel Spreadsheet',
  'image/png': 'PNG Image',
  'image/jpeg': 'JPEG Image',
  'image/gif': 'GIF Image',
  'image/webp': 'WebP Image',
};

/**
 * Get the accept string for file input
 */
export const getAcceptString = (): string => {
  return Object.entries(ACCEPTED_FILE_TYPES)
    .flatMap(([mimeType, extensions]) => [mimeType, ...extensions])
    .join(',');
};

/**
 * Document type options for dropdown
 */
export const DOCUMENT_TYPE_OPTIONS: { value: DocumentType; label: string }[] = [
  { value: 'regulatory', label: 'Regulatory' },
  { value: 'payments', label: 'Payments' },
  { value: 'market', label: 'Market' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'other', label: 'Other' },
];

/**
 * Uploaded file information
 */
export interface UploadedFile {
  file: File;
  name: string;
  type: string;
  size: number;
  preview?: string;
}

/**
 * Form data for document upload
 */
export interface DocumentFormData {
  title: string;
  fileType: string;
  documentType: DocumentType | '';
  author: string;
}

/**
 * Props for UploadDocumentModal component
 */
export interface UploadDocumentModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal closes */
  onClose: () => void;
  /** Callback when document is successfully uploaded */
  onUpload: (file: File, formData: DocumentFormData) => void;
  /** Default author name (optional) */
  defaultAuthor?: string;
}
