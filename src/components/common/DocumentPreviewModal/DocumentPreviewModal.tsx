import { useEffect, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  Download,
  Trash2,
  Heart,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Loader2,
  Edit2,
  Check,
  X as XIcon,
  Sparkles,
  Copy,
  CopyCheck,
} from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Modal } from '../Modal/Modal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal';
import { Button } from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';
import type { DocumentPreviewModalProps } from './DocumentPreviewModal.types';
import { formatFileSize, formatDate } from '../../../utils/formatters';
import { contentApi } from '../../../services/api/content/content.api';
import './DocumentPreviewModal.css';

// Configure PDF.js worker for document preview for PDFs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function DocumentPreviewModal({
  isOpen,
  onClose,
  document,
  allDocuments = [],
  onDownload,
  onDelete,
  onFavoriteToggle,
  onPrevious,
  onNext,
}: DocumentPreviewModalProps) {
  const [zoom, setZoom] = useState(100);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  // PDF-specific states
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // DOCX preview state
  const [docxHtml, setDocxHtml] = useState<string | null>(null);

  // Excel preview state
  const [excelData, setExcelData] = useState<string[][] | null>(null);

  // Text file preview state
  const [textContent, setTextContent] = useState<string | null>(null);

  // Edit states
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editedCategory, setEditedCategory] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // AI summariser
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Copy source
  const [copiedSource, setCopiedSource] = useState(false);

  const handleCopySource = () => {
    const text = document?.source || '';
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedSource(true);
        setTimeout(() => setCopiedSource(false), 2000);
      });
    }
  };

  const documentId = document?.id;
  const documentCategory = document?.category;
  const documentTitle = document?.title ?? '';
  const documentDescription = document?.description ?? '';
  const documentFileType = document?.fileType ?? '';

  // Load document preview
  useEffect(() => {
    if (!documentId || !isOpen) {
      return;
    }

    let isMounted = true;
    let objectUrl: string | null = null;
    const loadPreview = async () => {
      setIsLoadingPreview(true);
      setPreviewError(null);
      setDocxHtml(null);
      setExcelData(null);
      setTextContent(null);

      try {
        const backendContentType =
          document.rawContentType ||
          (documentCategory === 'regulation'
            ? 'legislation'
            : documentCategory === 'research'
              ? 'insight'
              : 'market');

        const blob = await contentApi.download(
          documentId,
          backendContentType as 'market' | 'legislation' | 'insight'
        );
        const fileType = documentFileType.toLowerCase();

        if (isMounted) {
          objectUrl = URL.createObjectURL(blob);
          setPreviewUrl(objectUrl);

          // Process DOCX files
          if (fileType === 'docx' || fileType === 'doc') {
            const arrayBuffer = await blob.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setDocxHtml(result.value);
          }

          // Process Excel files
          if (['xlsx', 'xls', 'csv'].includes(fileType || '')) {
            const arrayBuffer = await blob.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const data = XLSX.utils.sheet_to_json<string[]>(worksheet, {
              header: 1,
            });
            setExcelData(data);
          }

          // Process text files
          if (fileType === 'txt') {
            const text = await blob.text();
            setTextContent(text);
          }
        }
      } catch (error) {
        console.error('Failed to load document preview:', error);
        if (isMounted) {
          setPreviewError('Failed to load document preview');
        }
      } finally {
        if (isMounted) {
          setIsLoadingPreview(false);
        }
      }
    };

    loadPreview();

    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [documentId, documentCategory, documentFileType, isOpen]);

  // Handle arrow keys for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowLeft' && onPrevious) {
        onPrevious();
      }
      if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onPrevious, onNext]);

  // Reset zoom when document changes
  useEffect(() => {
    setZoom(100);
    setPageNumber(1);
    setIsEditingTitle(false);
    setIsEditingCategory(false);
    setIsEditingDescription(false);
    setEditedTitle(documentTitle);
    setEditedCategory(documentCategory || '');
    setEditedDescription(documentDescription);
  }, [documentId, documentTitle, documentCategory, documentDescription]);

  if (!document) return null;

  const currentIndex = allDocuments.findIndex((doc) => doc.id === document.id);
  const hasPrevious = currentIndex > 0 && onPrevious;
  const hasNext = currentIndex < allDocuments.length - 1 && onNext;

  const handleDownloadClick = () => {
    if (onDownload) onDownload(document);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (onDelete) {
      setIsDeleting(true);
      try {
        await onDelete(document);
        setShowDeleteConfirm(false);
        onClose();
      } catch (error) {
        console.error('Delete failed:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleFavoriteClick = () => {
    if (onFavoriteToggle) onFavoriteToggle(document);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleTitleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveTitle();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsEditingTitle(false);
      setEditedTitle(document.title);
    }
  };

  const handleSaveTitle = () => {
    // TODO: Implement API call to update title
    console.log('Saving title:', editedTitle);
    setIsEditingTitle(false);
  };

  const handleSaveCategory = () => {
    // TODO: Implement API call to update category
    console.log('Saving category:', editedCategory);
    setIsEditingCategory(false);
  };

  const handleSaveDescription = () => {
    // TODO: Implement API call to update description
    console.log('Saving description:', editedDescription);
    setIsEditingDescription(false);
  };

  const handleAISummarize = async () => {
    const fileType = document.fileType.toLowerCase();
    if (!['pdf', 'docx', 'doc', 'pptx', 'ppt'].includes(fileType)) {
      return;
    }

    setIsSummarizing(true);
    try {
      // TODO: Implement AI summarisation API call
      console.log('AI summarising document:', document.id);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      setEditedDescription(
        'This is a generated summary of the document. The AI has analyzed the content and provided this brief overview of the main points and key information.'
      );
    } catch (error) {
      console.error('AI summarisation failed:', error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const getCategoryLabel = () => {
    switch (document.category) {
      case 'market':
        return 'Market';
      case 'regulation':
        return 'Regulatory';
      case 'compliance':
        return 'Compliance';
      case 'payments':
        return 'Payments';
      case 'other':
        return 'Other';
      default:
        return 'Other';
    }
  };

  const canAISummarize = () => {
    const fileType = document.fileType.toLowerCase();
    return ['pdf', 'docx', 'doc', 'pptx', 'ppt'].includes(fileType);
  };

  const renderDocumentPreview = () => {
    const fileType = document.fileType.toLowerCase();

    // Loading state
    if (isLoadingPreview) {
      return (
        <div className="document-preview__loading">
          <Loader2 size={48} className="document-preview__spinner" />
          <p className="document-preview__message">Loading document...</p>
        </div>
      );
    }

    // Error state
    if (previewError) {
      return (
        <div className="document-preview__error">
          <div className="document-preview__file-icon">!</div>
          <p className="document-preview__message">{previewError}</p>
          <p className="document-preview__hint">
            Try downloading the file instead
          </p>
        </div>
      );
    }

    // No preview URL available
    if (!previewUrl) {
      return (
        <div className="document-preview__default-placeholder">
          <div className="document-preview__file-icon">
            {fileType.toUpperCase()}
          </div>
          <p className="document-preview__message">Loading preview...</p>
        </div>
      );
    }

    // PDF preview with react-pdf
    if (fileType === 'pdf') {
      return (
        <div className="document-preview__viewer">
          {numPages > 1 && (
            <div className="document-preview__pdf-controls">
              <button
                onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
                disabled={pageNumber <= 1}
                className="document-preview__pdf-nav-btn"
              >
                Previous
              </button>
              <span className="document-preview__pdf-page-info">
                Page {pageNumber} of {numPages}
              </span>
              <button
                onClick={() =>
                  setPageNumber((prev) => Math.min(numPages, prev + 1))
                }
                disabled={pageNumber >= numPages}
                className="document-preview__pdf-nav-btn"
              >
                Next
              </button>
            </div>
          )}
          <Document
            file={previewUrl}
            onLoadSuccess={({ numPages }: { numPages: number }) =>
              setNumPages(numPages)
            }
            onLoadError={(error: Error) => {
              console.error('Error loading PDF:', error);
              setPreviewError('Failed to load PDF');
            }}
            loading={
              <div className="document-preview__loading">
                <Loader2 size={48} className="document-preview__spinner" />
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={zoom / 100}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      );
    }

    // DOCX preview with mammoth
    if ((fileType === 'docx' || fileType === 'doc') && docxHtml) {
      return (
        <div
          className="document-preview__viewer document-preview__docx"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            width: `${100 / (zoom / 100)}%`,
          }}
        >
          <div
            className="document-preview__docx-content"
            dangerouslySetInnerHTML={{ __html: docxHtml }}
          />
        </div>
      );
    }

    // Excel preview with SheetJS
    if (
      ['xlsx', 'xls', 'csv'].includes(fileType) &&
      excelData &&
      excelData.length > 0
    ) {
      return (
        <div
          className="document-preview__viewer document-preview__excel"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top left',
          }}
        >
          <div className="document-preview__excel-container">
            <table className="document-preview__excel-table">
              <tbody>
                {excelData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="document-preview__excel-cell"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // PPTX preview with iframe embed
    if (['pptx', 'ppt'].includes(fileType)) {
      return (
        <div className="document-preview__viewer">
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(previewUrl)}`}
            className="document-preview__iframe"
            title={document.title}
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              width: `${100 / (zoom / 100)}%`,
              height: `${100 / (zoom / 100)}%`,
            }}
          />
        </div>
      );
    }

    // Image preview
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(fileType)) {
      return (
        <div className="document-preview__viewer">
          <img
            src={previewUrl}
            alt={document.title}
            className="document-preview__image"
            style={{
              transform: `scale(${zoom / 100})`,
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      );
    }

    // Text files (txt, md, json, etc.)
    if (['txt', 'md', 'json', 'xml'].includes(fileType)) {
      if (fileType === 'txt' && textContent) {
        return (
          <div className="document-preview__viewer">
            <pre
              className="document-preview__text-content"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top left',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                overflow: 'auto',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              {textContent}
            </pre>
          </div>
        );
      }
      // Fallback to iframe for other text formats
      return (
        <div className="document-preview__viewer">
          <iframe
            src={previewUrl || ''}
            className="document-preview__iframe"
            title={document.title}
          />
        </div>
      );
    }

    // Default fallback
    return (
      <div className="document-preview__default-placeholder">
        <div className="document-preview__file-icon">
          {fileType.toUpperCase()}
        </div>
        <p className="document-preview__message">
          Preview not available for this file type
        </p>
        <p className="document-preview__hint">
          Click download to view the file
        </p>
      </div>
    );
  };

  const modalFooter = (
    <div className="document-preview__footer">
      <button
        className="document-preview__nav-btn"
        onClick={onPrevious}
        disabled={!hasPrevious}
        aria-label="Previous document"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      {allDocuments.length > 0 && (
        <span className="document-preview__counter">
          {currentIndex + 1} of {allDocuments.length}
        </span>
      )}

      <button
        className="document-preview__nav-btn"
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next document"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );

  const modalTitle = (
    <span className="document-preview__modal-title">
      {isEditingTitle ? (
        <span className="document-preview__modal-title-edit">
          <input
            type="text"
            className="document-preview__modal-title-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            autoFocus
          />
          <button
            className="document-preview__modal-title-btn document-preview__modal-title-btn--save"
            onClick={handleSaveTitle}
            title="Save title"
            type="button"
          >
            <Check size={16} />
          </button>
          <button
            className="document-preview__modal-title-btn document-preview__modal-title-btn--cancel"
            onClick={() => {
              setIsEditingTitle(false);
              setEditedTitle(document.title);
            }}
            title="Cancel"
            type="button"
          >
            <XIcon size={16} />
          </button>
        </span>
      ) : (
        <span className="document-preview__modal-title-display">
          <span className="document-preview__modal-title-text">
            {document.title}
          </span>
          <button
            className="document-preview__modal-title-btn document-preview__modal-title-btn--edit"
            onClick={() => setIsEditingTitle(true)}
            title="Edit title"
            type="button"
          >
            <Edit2 size={16} />
          </button>
        </span>
      )}
    </span>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={modalTitle}
        size="xlarge"
        footer={modalFooter}
        className="document-preview-modal"
      >
        <div className="document-preview">
          {/* Action Bar */}
          <div className="document-preview__actions">
            <div className="document-preview__actions-left">
              <Tooltip
                content={
                  document.isFavorite
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
              >
                <button
                  className={`document-preview__action-btn ${
                    document.isFavorite
                      ? 'document-preview__action-btn--active'
                      : ''
                  }`}
                  onClick={handleFavoriteClick}
                  aria-label={
                    document.isFavorite
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  }
                >
                  <Heart
                    size={18}
                    fill={document.isFavorite ? 'currentColor' : 'none'}
                  />
                </button>
              </Tooltip>
              {onDownload && (
                <Tooltip content="Download">
                  <button
                    className="document-preview__action-btn"
                    onClick={handleDownloadClick}
                    aria-label="Download document"
                  >
                    <Download size={18} />
                  </button>
                </Tooltip>
              )}

              {canAISummarize() && (
                <Tooltip
                  content={isSummarizing ? 'Summarising...' : 'AI Summarise'}
                >
                  <button
                    className="document-preview__action-btn"
                    onClick={handleAISummarize}
                    disabled={isSummarizing}
                    aria-label="AI Summarise"
                    type="button"
                  >
                    <Sparkles size={18} />
                  </button>
                </Tooltip>
              )}
            </div>

            <div className="document-preview__actions-right">
              <div className="document-preview__zoom-controls">
                <Tooltip content="Zoom out">
                  <button
                    className="document-preview__action-btn"
                    onClick={handleZoomOut}
                    disabled={zoom <= 50}
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={18} />
                  </button>
                </Tooltip>
                <span className="document-preview__zoom-level">{zoom}%</span>
                <Tooltip content="Zoom in">
                  <button
                    className="document-preview__action-btn"
                    onClick={handleZoomIn}
                    disabled={zoom >= 200}
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={18} />
                  </button>
                </Tooltip>
                <Tooltip content="Fit to screen">
                  <button
                    className="document-preview__action-btn"
                    onClick={() => setZoom(100)}
                    aria-label="Reset zoom"
                  >
                    <Maximize2 size={18} />
                  </button>
                </Tooltip>
              </div>

              {onDelete && (
                <Tooltip content="Delete">
                  <Button
                    icon={<Trash2 size={18} />}
                    variant="danger"
                    onClick={handleDeleteClick}
                  />
                </Tooltip>
              )}
            </div>
          </div>

          {/* Preview Area */}
          <div className="document-preview__content">
            {renderDocumentPreview()}
          </div>

          {/* Document Metadata */}
          <div className="document-preview__info">
            {/* Description - Editable with AI Summariser */}
            <div className="document-preview__info-section">
              <div className="document-preview__field">
                <div className="document-preview__label-row">
                  <label className="document-preview__label">Description</label>
                </div>
                {isEditingDescription ? (
                  <div className="document-preview__edit-group">
                    <textarea
                      className="document-preview__textarea"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      rows={3}
                      autoFocus
                    />
                    <button
                      className="document-preview__edit-btn document-preview__edit-btn--save"
                      onClick={handleSaveDescription}
                      title="Save"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="document-preview__edit-btn document-preview__edit-btn--cancel"
                      onClick={() => {
                        setIsEditingDescription(false);
                        setEditedDescription(document.description || '');
                      }}
                      title="Cancel"
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="document-preview__value-group">
                    <span className="document-preview__value">
                      {document.description || 'No description'}
                    </span>
                    <button
                      className="document-preview__edit-icon-btn"
                      onClick={() => setIsEditingDescription(true)}
                      title="Edit description"
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                )}
              </div>
              <div className="document-preview__section-divider" />
            </div>

            {/* Metadata Grid */}
            <div className="document-preview__metadata">
              <div className="document-preview__metadata-item">
                <span className="document-preview__metadata-label">
                  Uploaded By
                </span>
                <span className="document-preview__metadata-value">
                  {document.author || 'Unknown'}
                </span>
              </div>
              <div className="document-preview__metadata-item">
                <span className="document-preview__metadata-label">Source</span>
                <div className="document-preview__metadata-value-row">
                  <span className="document-preview__metadata-value">
                    {document.source || 'No source'}
                  </span>
                  <Tooltip
                    content={
                      document.source
                        ? copiedSource
                          ? 'Copied!'
                          : 'Copy'
                        : 'No source'
                    }
                  >
                    <button
                      className="document-preview__copy-btn"
                      onClick={handleCopySource}
                      aria-label="Copy source"
                      disabled={!document.source}
                      type="button"
                    >
                      {copiedSource ? (
                        <CopyCheck size={13} />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </Tooltip>
                </div>
              </div>
              <div className="document-preview__metadata-item">
                <span className="document-preview__metadata-label">Type</span>
                <span className="document-preview__metadata-value">
                  {document.fileType.toUpperCase()} •{' '}
                  {formatFileSize(document.fileSize)}
                </span>
              </div>
              <div className="document-preview__metadata-item">
                <span className="document-preview__metadata-label">
                  Uploaded
                </span>
                <span className="document-preview__metadata-value">
                  {formatDate(document.createdAt)}
                </span>
              </div>
              <div className="document-preview__metadata-item">
                <span className="document-preview__metadata-label">
                  Category
                </span>
                {isEditingCategory ? (
                  <div className="document-preview__edit-group document-preview__edit-group--inline">
                    <select
                      className="document-preview__select"
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                      autoFocus
                    >
                      <option value="market">Market</option>
                      <option value="regulation">Regulatory</option>
                      <option value="compliance">Compliance</option>
                      <option value="payments">Payments</option>
                      <option value="other">Other</option>
                    </select>
                    <button
                      className="document-preview__edit-btn document-preview__edit-btn--save"
                      onClick={handleSaveCategory}
                      title="Save"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      className="document-preview__edit-btn document-preview__edit-btn--cancel"
                      onClick={() => {
                        setIsEditingCategory(false);
                        setEditedCategory(document.category || '');
                      }}
                      title="Cancel"
                    >
                      <XIcon size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="document-preview__value-group">
                    <span
                      className={`document-preview__category document-preview__category--${document.category}`}
                    >
                      {getCategoryLabel()}
                    </span>
                    <button
                      className="document-preview__edit-icon-btn"
                      onClick={() => setIsEditingCategory(true)}
                      title="Edit category"
                    >
                      <Edit2 size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        documentTitle={document.title}
        isDeleting={isDeleting}
      />
    </>
  );
}
