import { useState, useMemo } from 'react';
import { FiBarChart2, FiUpload } from 'react-icons/fi';
import { Search, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import { Button, DocumentGrid, DocumentList } from '../../components/common';
import { UploadDocumentModal } from '../../components/common/UploadDocumentModal/UploadDocumentModal';
import ChartBuilderModal from '../../components/features/chart-builder';
import { infoModalContent } from '../../constants/infoModalContent';
import type { DocumentFormData } from '../../components/common/UploadDocumentModal/UploadDocumentModal.types';
import type { DocumentData } from '../../components/common/DocumentCard/DocumentCard.types';
import './ContentHub.css';

// Source filter options
const SOURCE_OPTIONS = [
  { id: 'all', label: 'All Sources' },
  { id: 'internal', label: 'Internal' },
  { id: 'regulatory-uk', label: 'Regulatory Bodies (UK)' },
  { id: 'news', label: 'News Feeds' },
  { id: 'partner', label: 'Partner Emails' },
];

// File type filter options
const FILE_TYPE_OPTIONS = [
  { id: 'pdf', label: 'PDF Documents' },
  { id: 'pptx', label: 'Presentations' },
  { id: 'xlsx', label: 'Spreadsheets' },
];

// Mock document data
const MOCK_DOCUMENTS: DocumentData[] = [
  {
    id: '1',
    title: 'Q4 2024 Financial Report',
    fileType: 'pdf',
    fileSize: 2457600,
    author: 'John Smith',
    createdAt: new Date('2024-01-15'),
    category: 'report',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Market Analysis Europe',
    fileType: 'xlsx',
    fileSize: 1048576,
    author: 'Jane Doe',
    createdAt: new Date('2024-01-10'),
    category: 'market',
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Compliance Guidelines 2024',
    fileType: 'docx',
    fileSize: 512000,
    author: 'Bob Wilson',
    createdAt: new Date('2024-01-05'),
    category: 'compliance',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'EPC Regulatory Update',
    fileType: 'pdf',
    fileSize: 1843200,
    author: 'Sarah Johnson',
    createdAt: new Date('2024-01-18'),
    category: 'regulation',
    isFavorite: true,
  },
  {
    id: '5',
    title: 'API Integration Specs',
    fileType: 'json',
    fileSize: 102400,
    author: 'Mike Chen',
    createdAt: new Date('2024-01-12'),
    category: 'data',
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Strategic Roadmap 2025',
    fileType: 'pptx',
    fileSize: 5242880,
    author: 'Emily Brown',
    createdAt: new Date('2024-01-20'),
    category: 'strategy',
    isFavorite: false,
  },
  {
    id: '7',
    title: 'Transaction Data Export',
    fileType: 'csv',
    fileSize: 3145728,
    author: 'David Lee',
    createdAt: new Date('2024-01-08'),
    category: 'data',
    isFavorite: false,
  },
  {
    id: '8',
    title: 'Research: Payment Trends',
    fileType: 'pdf',
    fileSize: 4194304,
    author: 'Anna Martinez',
    createdAt: new Date('2024-01-22'),
    category: 'research',
    isFavorite: true,
  },
];

type ViewMode = 'grid' | 'list';

export default function ContentHub() {
  const [showInfo, setShowInfo] = useState(false);
  const [showChartBuilder, setShowChartBuilder] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [documents, setDocuments] = useState<DocumentData[]>(MOCK_DOCUMENTS);
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);

  // Filter documents based on search query, source, and file types
  const filteredDocuments = useMemo(() => {
    let filtered = documents;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.author?.toLowerCase().includes(query) ||
          doc.category?.toLowerCase().includes(query)
      );
    }

    // Filter by file type if any selected
    if (selectedFileTypes.length > 0) {
      filtered = filtered.filter((doc) => {
        // Map file types to filter categories
        if (selectedFileTypes.includes('pdf') && doc.fileType === 'pdf')
          return true;
        if (
          selectedFileTypes.includes('pptx') &&
          (doc.fileType === 'pptx' || doc.fileType === 'ppt')
        )
          return true;
        if (
          selectedFileTypes.includes('xlsx') &&
          (doc.fileType === 'xlsx' ||
            doc.fileType === 'xls' ||
            doc.fileType === 'csv')
        )
          return true;
        return false;
      });
    }

    return filtered;
  }, [documents, searchQuery, selectedFileTypes]);

  const handleFileTypeToggle = (fileTypeId: string) => {
    setSelectedFileTypes((prev) =>
      prev.includes(fileTypeId)
        ? prev.filter((id) => id !== fileTypeId)
        : [...prev, fileTypeId]
    );
  };

  const handleDocumentUpload = (file: File, formData: DocumentFormData) => {
    // Create new document from upload
    const newDocument: DocumentData = {
      id: `doc-${Date.now()}`,
      title: formData.title,
      fileType: formData.fileType as DocumentData['fileType'],
      fileSize: file.size,
      author: formData.author,
      createdAt: new Date(),
      category: formData.documentType as DocumentData['category'],
      isFavorite: false,
    };

    setDocuments((prev) => [newDocument, ...prev]);
    setShowUploadModal(false);
  };

  const handleDocumentClick = (document: DocumentData) => {
    console.log('Document clicked:', document);
    // TODO: Open document preview or details
  };

  const handleDownload = (document: DocumentData) => {
    console.log('Download:', document.title);
    // TODO: Implement download
  };

  const handleShare = (document: DocumentData) => {
    console.log('Share:', document.title);
    // TODO: Implement share
  };

  const handleDelete = (document: DocumentData) => {
    if (confirm(`Are you sure you want to delete "${document.title}"?`)) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== document.id));
    }
  };

  const handleFavoriteToggle = (document: DocumentData) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === document.id ? { ...doc, isFavorite: !doc.isFavorite } : doc
      )
    );
  };

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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="content-hub__search-input"
          />
        </div>
        <div className="content-hub__search-actions">
          <button className="content-hub__filter-btn" aria-label="Filter">
            <SlidersHorizontal size={18} />
          </button>
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
          {/* Sources filter card */}
          <div className="content-hub__filter-card">
            <div className="content-hub__filter-card-header">
              <h3 className="content-hub__filter-title">SOURCES</h3>
            </div>
            <div className="content-hub__filter-card-body">
              <ul className="content-hub__filter-list">
                {SOURCE_OPTIONS.map((source) => (
                  <li key={source.id}>
                    <button
                      className={`content-hub__filter-item ${selectedSource === source.id ? 'content-hub__filter-item--active' : ''}`}
                      onClick={() => setSelectedSource(source.id)}
                    >
                      {source.label}
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
                      <span className="content-hub__checkbox-label">
                        {fileType.label}
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
          {viewMode === 'grid' ? (
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
        </div>
      </div>
    </div>
  );
}
