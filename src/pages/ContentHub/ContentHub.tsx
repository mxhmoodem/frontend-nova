import { useState, useMemo } from 'react';
import { FiBarChart2, FiUpload } from 'react-icons/fi';
import { Search, LayoutGrid, List } from 'lucide-react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import {
  Button,
  DocumentGrid,
  DocumentList,
  DocumentPreviewModal,
  Pagination,
} from '../../components/common';
import { UploadDocumentModal } from '../../components/common/UploadDocumentModal/UploadDocumentModal';
import ChartBuilderModal from '../../components/features/chart-builder';
import { infoModalContent } from '../../constants/infoModalContent';
import {
  useContent,
  useUploadContent,
  useDeleteContent,
  useDownloadContent,
} from '../../services/api';
import type { DocumentFormData } from '../../components/common/UploadDocumentModal/UploadDocumentModal.types';
import type { DocumentData } from '../../components/common/DocumentCard/DocumentCard.types';
import type {
  ContentDocument,
  ContentType,
} from '../../services/api/content/content.types';
import './ContentHub.css';

// Category filter options
const CATEGORY_OPTIONS = [
  { id: 'all', label: 'All Categories' },
  { id: 'market', label: 'Market' },
  { id: 'regulation', label: 'Regulatory' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'payments', label: 'Payments' },
  { id: 'other', label: 'Other' },
];

// File type filter options
const FILE_TYPE_OPTIONS = [
  {
    id: 'documents',
    label: 'Documents',
    extensions: '.pdf, .docx, .ppt, .pptx, .txt',
  },
  {
    id: 'spreadsheets',
    label: 'Spreadsheets',
    extensions: '.xls, .xlsx, .csv',
  },
  {
    id: 'images',
    label: 'Images',
    extensions: '.png, .jpg, .jpeg, .gif, .webp',
  },
  {
    id: 'favourites',
    label: 'Favourites',
    extensions: '',
  },
];

// LocalStorage utilities for favorites
const FAVORITES_STORAGE_KEY = 'content-hub-favorites';

const getFavouritesFromStorage = (): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
  return stored ? new Set(JSON.parse(stored)) : new Set();
};

const saveFavouritesToStorage = (favorites: Set<string>) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify(Array.from(favorites))
  );
};

/** Map backend content_type to UI DocumentCategory */
const CONTENT_TYPE_TO_CATEGORY: Record<string, DocumentData['category']> = {
  market: 'market',
  legislation: 'regulation',
  insight: 'research',
};

/** Map UploadDocumentModal documentType to backend ContentType */
const DOCUMENT_TYPE_TO_CONTENT_TYPE: Record<string, string> = {
  market: 'market',
  regulatory: 'legislation',
  payments: 'market',
  compliance: 'market',
  other: 'market',
};

/** Map a backend ContentDocument to the DocumentData shape UI components expect */
function toDocumentData(doc: ContentDocument): DocumentData {
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description || undefined,
    fileType: doc.file_type as DocumentData['fileType'],
    fileSize: doc.file_size || 0,
    author: doc.uploaded_by || 'Jane Smith',
    source: doc.source || undefined,
    createdAt: new Date(doc.created_at),
    category: CONTENT_TYPE_TO_CATEGORY[doc.content_type ?? ''] ?? 'other',
    rawContentType: doc.content_type,
    isFavorite: false,
  };
}

type ViewMode = 'grid' | 'list';

export default function ContentHub() {
  const [showInfo, setShowInfo] = useState(false);
  const [showChartBuilder, setShowChartBuilder] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(() =>
    getFavouritesFromStorage()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // ── API hooks ──────────────────────────────────────────────────────────────
  const {
    data: contentResponse,
    isLoading,
    isError,
  } = useContent(currentPage, itemsPerPage, searchQuery);
  const uploadMutation = useUploadContent();
  const deleteMutation = useDeleteContent();
  const downloadMutation = useDownloadContent();

  // Map backend documents to UI shape
  const documents: DocumentData[] = useMemo(
    () =>
      (contentResponse?.data ?? []).map((doc) => ({
        ...toDocumentData(doc),
        isFavorite: favorites.has(doc.id),
      })),
    [contentResponse, favorites]
  );

  // Sync selectedDocument with updated documents (for favorite status changes)
  const syncedSelectedDocument = useMemo(() => {
    if (!selectedDocument) return null;
    const updatedDocument = documents.find(
      (doc) => doc.id === selectedDocument.id
    );
    return updatedDocument || selectedDocument;
  }, [documents, selectedDocument]);

  // Filter documents based on category and file types (search is handled by API)
  const filteredDocuments = useMemo(() => {
    let filtered = documents;

    // Filter by category if not "all"
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((doc) => doc.category === selectedCategory);
    }

    // Filter by file type if any selected
    if (selectedFileTypes.length > 0) {
      filtered = filtered.filter((doc) => {
        const fileTypeStr = String(doc.fileType).toLowerCase();

        // Check if document matches any of the selected filter categories
        const matchesDocuments =
          selectedFileTypes.includes('documents') &&
          (fileTypeStr === 'pdf' ||
            fileTypeStr === 'docx' ||
            fileTypeStr === 'ppt' ||
            fileTypeStr === 'pptx' ||
            fileTypeStr === 'txt');

        const matchesSpreadsheets =
          selectedFileTypes.includes('spreadsheets') &&
          (fileTypeStr === 'xlsx' ||
            fileTypeStr === 'xls' ||
            fileTypeStr === 'csv');

        const matchesImages =
          selectedFileTypes.includes('images') &&
          (fileTypeStr === 'png' ||
            fileTypeStr === 'jpg' ||
            fileTypeStr === 'jpeg' ||
            fileTypeStr === 'gif' ||
            fileTypeStr === 'webp');

        const matchesFavorites =
          selectedFileTypes.includes('favourites') && doc.isFavorite;

        // Return true if document matches ANY selected category
        return (
          matchesDocuments ||
          matchesSpreadsheets ||
          matchesImages ||
          matchesFavorites
        );
      });
    }

    return filtered;
  }, [documents, selectedCategory, selectedFileTypes]);

  const handleFileTypeToggle = (fileTypeId: string) => {
    setSelectedFileTypes((prev) =>
      prev.includes(fileTypeId)
        ? prev.filter((id) => id !== fileTypeId)
        : [...prev, fileTypeId]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optionally scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDocumentUpload = (file: File, formData: DocumentFormData) => {
    const contentType = (DOCUMENT_TYPE_TO_CONTENT_TYPE[formData.documentType] ??
      'market') as 'market' | 'legislation' | 'insight';

    uploadMutation.mutate({
      file,
      title: formData.title,
      content_type: contentType,
      description: formData.description,
    });
  };

  const handleDocumentClick = (document: DocumentData) => {
    setSelectedDocument(document);
    setShowPreviewModal(true);
  };

  const handleDownload = (document: DocumentData) => {
    const contentType = (document.rawContentType || 
      (document.category === 'regulation' ? 'legislation' : 
       document.category === 'research' ? 'insight' : 'market')) as ContentType;

    downloadMutation.mutate({
      id: document.id,
      filename: `${document.title}.${document.fileType}`,
      contentType
    });
  };

  const handleShare = (document: DocumentData) => {
    console.log('Share:', document.title);
    // TODO: Implement share
  };

  const handleDelete = (document: DocumentData) => {
    const contentType = (document.rawContentType || 
      (document.category === 'regulation' ? 'legislation' : 
       document.category === 'research' ? 'insight' : 'market')) as ContentType;

    deleteMutation.mutate({ id: document.id, contentType });
  };

  const handleFavoriteToggle = (document: DocumentData) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(document.id)) {
        newFavorites.delete(document.id);
      } else {
        newFavorites.add(document.id);
      }
      saveFavouritesToStorage(newFavorites);
      return newFavorites;
    });
  };

  const handlePreviousDocument = () => {
    if (!selectedDocument) return;
    const currentIndex = filteredDocuments.findIndex(
      (doc) => doc.id === selectedDocument.id
    );
    if (currentIndex > 0) {
      setSelectedDocument(filteredDocuments[currentIndex - 1]);
    }
  };

  const handleNextDocument = () => {
    if (!selectedDocument) return;
    const currentIndex = filteredDocuments.findIndex(
      (doc) => doc.id === selectedDocument.id
    );
    if (currentIndex < filteredDocuments.length - 1) {
      setSelectedDocument(filteredDocuments[currentIndex + 1]);
    }
  };

  if (isError) {
    return (
      <div className="content-hub">
        <p className="content-hub__error">
          Failed to load documents. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="content-hub">
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
      <DocumentPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        document={syncedSelectedDocument}
        allDocuments={filteredDocuments}
        onDownload={handleDownload}
        onDelete={handleDelete}
        onFavoriteToggle={handleFavoriteToggle}
        onPrevious={handlePreviousDocument}
        onNext={handleNextDocument}
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

      {/* Search bar with filter and view toggle */}
      <div className="content-hub__search-bar">
        <div className="content-hub__search-wrapper">
          <Search size={18} className="content-hub__search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search documents..."
            className="content-hub__search-input"
          />
        </div>
        <div className="content-hub__search-actions">
          <div className="content-hub__view-toggle">
            <button
              className={`content-hub__view-btn ${viewMode === 'grid' ? 'content-hub__view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`content-hub__view-btn ${viewMode === 'list' ? 'content-hub__view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content area with sidebar and documents */}
      <div className="content-hub__main">
        {/* Left sidebar with filters */}
        <aside className="content-hub__sidebar">
          {/* Category filter card */}
          <div className="content-hub__filter-card">
            <div className="content-hub__filter-card-header">
              <h3 className="content-hub__filter-title">CATEGORY</h3>
            </div>
            <div className="content-hub__filter-card-body">
              <ul className="content-hub__filter-list">
                {CATEGORY_OPTIONS.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`content-hub__filter-item ${selectedCategory === category.id ? 'content-hub__filter-item--active' : ''}`}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* File Type filter card */}
          <div className="content-hub__filter-card">
            <div className="content-hub__filter-card-header">
              <h3 className="content-hub__filter-title">FILE TYPE</h3>
            </div>
            <div className="content-hub__filter-card-body">
              <ul className="content-hub__filter-list">
                {FILE_TYPE_OPTIONS.map((fileType) => (
                  <li key={fileType.id}>
                    <label className="content-hub__checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedFileTypes.includes(fileType.id)}
                        onChange={() => handleFileTypeToggle(fileType.id)}
                        className="content-hub__checkbox"
                      />
                      <span className="content-hub__checkbox-text">
                        <span className="content-hub__checkbox-label">
                          {fileType.label}
                        </span>
                        {fileType.extensions && (
                          <span className="content-hub__checkbox-extensions">
                            {fileType.extensions}
                          </span>
                        )}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Document display */}
        <div className="content-hub__content">
          {isLoading ? (
            <p className="content-hub__loading">Loading documents...</p>
          ) : viewMode === 'grid' ? (
            <DocumentGrid
              documents={filteredDocuments}
              onDocumentClick={handleDocumentClick}
              onDownload={handleDownload}
              onShare={handleShare}
              onDelete={handleDelete}
              onFavoriteToggle={handleFavoriteToggle}
              emptyMessage={
                searchQuery || selectedFileTypes.length > 0
                  ? 'No documents match your filters'
                  : 'No documents yet. Upload your first document!'
              }
            />
          ) : (
            <DocumentList
              documents={filteredDocuments}
              onDocumentClick={handleDocumentClick}
              onDownload={handleDownload}
              onShare={handleShare}
              onDelete={handleDelete}
              onFavoriteToggle={handleFavoriteToggle}
              emptyMessage={
                searchQuery || selectedFileTypes.length > 0
                  ? 'No documents match your filters'
                  : 'No documents yet. Upload your first document!'
              }
            />
          )}

          {/* Pagination */}
          {!isLoading && contentResponse && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(
                (contentResponse.total || 0) / itemsPerPage
              )}
              totalItems={contentResponse.total}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
