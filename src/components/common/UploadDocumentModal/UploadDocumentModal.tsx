import React, { useState, useRef, useCallback } from 'react';
import { FileText, X } from 'lucide-react';
import { Modal } from '../Modal/Modal';
import './UploadDocumentModal.css';
import {
  UploadDocumentModalProps,
  UploadedFile,
  DocumentFormData,
  DocumentType,
  ACCEPTED_FILE_TYPES,
  FILE_TYPE_LABELS,
  DOCUMENT_TYPE_OPTIONS,
  getAcceptString,
} from './UploadDocumentModal.types';

/**
 * Format file size to human-readable string
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Extract title from filename (remove extension)
 */
const extractTitleFromFilename = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) return filename;
  return filename.substring(0, lastDotIndex);
};

/**
 * Get human-readable file type label
 */
const getFileTypeLabel = (mimeType: string): string => {
  return FILE_TYPE_LABELS[mimeType] || 'Unknown File Type';
};

/**
 * UploadDocumentModal component for uploading and categorizing documents.
 * Supports drag-and-drop and file selection with form fields for metadata.
 */
export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  defaultAuthor = '',
}) => {
  // File state
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<DocumentFormData>({
    title: '',
    fileType: '',
    documentType: '',
    author: defaultAuthor,
  });

  // Validation errors
  const [errors, setErrors] = useState<
    Partial<Record<keyof DocumentFormData, string>>
  >({});

  /**
   * Reset form state to initial values
   */
  const resetForm = useCallback(() => {
    setUploadedFile(null);
    setFormData({
      title: '',
      fileType: '',
      documentType: '',
      author: defaultAuthor,
    });
    setErrors({});
    setIsDragActive(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [defaultAuthor]);

  /**
   * Handle modal close with state reset
   */
  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  /**
   * Handle file selection
   */
  const handleFileSelect = useCallback((file: File) => {
    // Validate file type
    const isValidType = Object.keys(ACCEPTED_FILE_TYPES).includes(file.type);
    if (!isValidType) {
      setErrors({
        title:
          'Invalid file type. Please upload PDF, DOCX, PPT, XLSX, or image files.',
      });
      return;
    }

    const newUploadedFile: UploadedFile = {
      file,
      name: file.name,
      type: file.type,
      size: file.size,
    };

    setUploadedFile(newUploadedFile);
    setFormData((prev) => ({
      ...prev,
      title: extractTitleFromFilename(file.name),
      fileType: getFileTypeLabel(file.type),
    }));
    setErrors({});
  }, []);

  /**
   * Handle drag events
   */
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  /**
   * Handle file input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  /**
   * Handle click on dropzone
   */
  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Remove uploaded file
   */
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFormData((prev) => ({
      ...prev,
      title: '',
      fileType: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Handle form field changes
   */
  const handleFieldChange = (field: keyof DocumentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * Validate form before submission
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DocumentFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.documentType) {
      newErrors.documentType = 'Document type is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    if (!uploadedFile) return;

    if (validateForm()) {
      onUpload(uploadedFile.file, formData);
      handleClose();
    }
  };

  /**
   * Check if form is ready for submission
   */
  const isFormValid =
    uploadedFile &&
    formData.title.trim() &&
    formData.documentType &&
    formData.author.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Upload new document"
      subtitle="Please ensure you have permission to upload this document."
      size="medium"
      footer={
        uploadedFile && (
          <div className="upload-document__footer">
            <button
              type="button"
              className="upload-document__cancel-btn"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="upload-document__submit-btn"
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Upload document
            </button>
          </div>
        )
      }
    >
      {/* Dropzone - shown when no file is uploaded */}
      {!uploadedFile && (
        <div
          className={`upload-document__dropzone ${
            isDragActive ? 'upload-document__dropzone--active' : ''
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleDropzoneClick}
          role="button"
          tabIndex={0}
          aria-label="Upload file dropzone"
        >
          <input
            ref={fileInputRef}
            type="file"
            className="upload-document__dropzone-input"
            onChange={handleInputChange}
            accept={getAcceptString()}
            aria-hidden="true"
          />

          {/* Stacked file icons */}
          <div className="upload-document__dropzone-icon">
            <div className="upload-document__dropzone-icon-wrapper">
              <div className="upload-document__file-icon upload-document__file-icon--back-left">
                <span className="upload-document__file-icon-text">Aa</span>
              </div>
              <div className="upload-document__file-icon upload-document__file-icon--front">
                <span className="upload-document__file-icon-text">Aa</span>
              </div>
              <div className="upload-document__file-icon upload-document__file-icon--back-right">
                <span className="upload-document__file-icon-text">Aa</span>
              </div>
            </div>
          </div>

          <p className="upload-document__dropzone-text">
            Drag and drop files here to upload
          </p>
          <p className="upload-document__dropzone-hint">
            For maximum browser support upload in PDF, DOCX, PPT, XLSX or image
            formats.
          </p>

          <button
            type="button"
            className="upload-document__select-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDropzoneClick();
            }}
          >
            Select files
          </button>
        </div>
      )}

      {/* File preview and form - shown when file is uploaded */}
      {uploadedFile && (
        <div className="upload-document__form">
          {/* File Preview */}
          <div className="upload-document__file-preview">
            <div className="upload-document__file-icon-preview">
              <FileText size={24} />
            </div>
            <div className="upload-document__file-info">
              <p className="upload-document__file-name">{uploadedFile.name}</p>
              <p className="upload-document__file-size">
                {formatFileSize(uploadedFile.size)}
              </p>
            </div>
            <button
              type="button"
              className="upload-document__file-remove"
              onClick={handleRemoveFile}
              aria-label="Remove file"
            >
              <X size={18} />
            </button>
          </div>

          {/* Title Field */}
          <div className="upload-document__field">
            <label
              htmlFor="upload-title"
              className="upload-document__label upload-document__label--required"
            >
              Title
            </label>
            <input
              id="upload-title"
              type="text"
              className={`upload-document__input ${
                errors.title ? 'upload-document__input--error' : ''
              }`}
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Enter document title"
            />
            {errors.title && (
              <span className="upload-document__error">{errors.title}</span>
            )}
          </div>

          {/* File Type (readonly) and Document Type */}
          <div className="upload-document__field-row">
            <div className="upload-document__field">
              <label
                htmlFor="upload-file-type"
                className="upload-document__label"
              >
                File Type
              </label>
              <input
                id="upload-file-type"
                type="text"
                className="upload-document__input upload-document__input--readonly"
                value={formData.fileType}
                readOnly
              />
            </div>

            <div className="upload-document__field">
              <label
                htmlFor="upload-document-type"
                className="upload-document__label upload-document__label--required"
              >
                Document Type
              </label>
              <select
                id="upload-document-type"
                className={`upload-document__select ${
                  errors.documentType ? 'upload-document__select--error' : ''
                }`}
                value={formData.documentType}
                onChange={(e) =>
                  handleFieldChange(
                    'documentType',
                    e.target.value as DocumentType
                  )
                }
              >
                <option value="">Select category</option>
                {DOCUMENT_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.documentType && (
                <span className="upload-document__error">
                  {errors.documentType}
                </span>
              )}
            </div>
          </div>

          {/* Author Field */}
          <div className="upload-document__field">
            <label
              htmlFor="upload-author"
              className="upload-document__label upload-document__label--required"
            >
              Author
            </label>
            <input
              id="upload-author"
              type="text"
              className={`upload-document__input ${
                errors.author ? 'upload-document__input--error' : ''
              }`}
              value={formData.author}
              onChange={(e) => handleFieldChange('author', e.target.value)}
              placeholder="Enter author name"
            />
            {errors.author && (
              <span className="upload-document__error">{errors.author}</span>
            )}
          </div>

          {/* Notes Field (optional) */}
          <div className="upload-document__field">
            <label htmlFor="upload-notes" className="upload-document__label">
              Notes (optional)
            </label>
            <textarea
              id="upload-notes"
              className="upload-document__textarea"
              placeholder="Add any additional notes"
              rows={3}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UploadDocumentModal;
