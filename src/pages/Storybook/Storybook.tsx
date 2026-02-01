import { useState } from 'react';
import { Button } from '../../components/common/Button/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { AIQuerySearch } from '../../components/common/AIQuerySearch';
import { LookupSearch } from '../../components/common/LookupSearch';
import { ChatMessage } from '../../components/common/ChatMessage';
import { Modal } from '../../components/common/Modal/Modal';
import { UploadDocumentModal } from '../../components/common/UploadDocumentModal/UploadDocumentModal';
import { DocumentCard } from '../../components/common/DocumentCard/DocumentCard';
import { DocumentGrid } from '../../components/common/DocumentGrid/DocumentGrid';
import { DocumentList } from '../../components/common/DocumentList/DocumentList';
import type { DocumentFormData } from '../../components/common/UploadDocumentModal/UploadDocumentModal.types';
import type { DocumentData } from '../../components/common/DocumentCard/DocumentCard.types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Sparkles,
  RotateCcw,
  Paperclip,
  Save,
  Trash2,
  Search,
  Upload,
  LayoutGrid,
  List,
} from 'lucide-react';
import './Storybook.css';

// Create a query client for LookupSearch
const queryClient = new QueryClient();

// Mock documents for demonstration
const DEMO_DOCUMENTS: DocumentData[] = [
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
    title: 'Compliance Guidelines',
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
];

export default function Storybook() {
  const [searchValue, setSearchValue] = useState('');

  // Modal state
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Document card state
  const [cardViewMode, setCardViewMode] = useState<'grid' | 'list'>('grid');
  const [documents, setDocuments] = useState<DocumentData[]>(DEMO_DOCUMENTS);

  // Mock fetch function for LookupSearch
  const fetchMockResults = async (query: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock data
    const mockData = [
      { id: '1', label: `Document: ${query} - Result 1` },
      { id: '2', label: `Document: ${query} - Result 2` },
      { id: '3', label: `Document: ${query} - Result 3` },
      { id: '4', label: `File: ${query} - Analysis` },
      { id: '5', label: `Report: ${query} - Summary` },
    ];

    return mockData.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleLookupSelect = (result: { id: string; label: string }) => {
    console.log('Selected:', result);
    alert(`Selected: ${result.label}`);
  };

  const handleAIAsk = (question: string) => {
    console.log('AI Query submitted:', question);
    alert(`AI Query: ${question}`);
  };

  const handleSearchSubmit = () => {
    console.log('Search submitted:', searchValue);
    alert(`Search: ${searchValue}`);
  };

  /**
   * Handle document upload
   */
  const handleDocumentUpload = (file: File, formData: DocumentFormData) => {
    console.log('Document uploaded:', { file, formData });
    alert(
      `Document "${formData.title}" (${formData.documentType}) uploaded successfully!`
    );
  };

  /**
   * Handle favorite toggle
   */
  const handleFavoriteToggle = (document: DocumentData) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === document.id ? { ...doc, isFavorite: !doc.isFavorite } : doc
      )
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="storybook-container">
        <h2 className="storybook__heading">Component Library</h2>
        <p className="storybook__subheading">
          Explore and test common UI components
        </p>

        <section className="storybook__section">
          <h3>Button Component</h3>
          <div className="storybook__demo-grid">
            <div className="storybook__demo-item">
              <h4>Just Text</h4>
              <div className="storybook__demo-row">
                <Button text="Ask AI" variant="primary" />
                <Button text="Reset" variant="secondary" />
                <Button text="Delete" variant="danger" />
              </div>
            </div>

            <div className="storybook__demo-item">
              <h4>Icon and Text</h4>
              <div className="storybook__demo-row">
                <Button
                  text="Ask AI"
                  icon={<Sparkles size={16} />}
                  variant="primary"
                />
                <Button
                  text="Reset"
                  icon={<RotateCcw size={16} />}
                  variant="secondary"
                />
                <Button
                  text="Save Changes"
                  icon={<Save size={16} />}
                  variant="primary"
                />
              </div>
            </div>

            <div className="storybook__demo-item">
              <h4>Just Icon</h4>
              <div className="storybook__demo-row">
                <Button
                  icon={<Paperclip size={16} />}
                  variant="secondary"
                  aria-label="Attach file"
                  tooltip="Attach file"
                />
                <Button
                  icon={<Sparkles size={16} />}
                  variant="primary"
                  aria-label="AI Action"
                  tooltip="AI Action"
                />
                <Button
                  icon={<RotateCcw size={16} />}
                  variant="ghost"
                  aria-label="Reset"
                  tooltip="Reset"
                />
                <Button
                  icon={<Trash2 size={16} />}
                  variant="danger"
                  aria-label="Delete"
                  tooltip="Delete"
                />
              </div>
            </div>

            <div className="storybook__demo-item">
              <h4>Loading State</h4>
              <div className="storybook__demo-row">
                <Button text="Saving..." isLoading variant="primary" />
                <Button
                  icon={<RotateCcw size={16} />}
                  isLoading
                  variant="secondary"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="storybook__section">
          <h3>Search Components</h3>

          <div className="storybook__demo-item storybook__search-demo-item">
            <h4>Base SearchInput</h4>
            <p className="storybook__description">
              Basic search input with optional submit action
            </p>
            <div className="storybook__demo-column">
              <SearchInput
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={handleSearchSubmit}
                placeholder="Search documents..."
                leadingSlot={<Search size={18} />}
              />
              <SearchInput
                value="Loading state"
                onChange={() => {}}
                loading={true}
                placeholder="Loading..."
              />
            </div>
          </div>

          <div className="storybook__demo-item storybook__search-demo-item">
            <h4>Lookup Search</h4>
            <p className="storybook__description">
              Search with live results from remote API (type 3+ characters)
            </p>
            <div className="storybook__demo-column">
              <LookupSearch
                fetchResults={fetchMockResults}
                onSelect={handleLookupSelect}
                placeholder="Search documents..."
                minQueryLength={3}
                leadingSlot={<Search size={18} />}
              />
            </div>
          </div>

          <div className="storybook__demo-item storybook__search-demo-item">
            <h4>AI Query Search</h4>
            <p className="storybook__description">
              AI-styled search with conversational interface
            </p>
            <div className="storybook__demo-column">
              <AIQuerySearch
                onAsk={handleAIAsk}
                placeholder="Ask AI anything..."
              />
            </div>
          </div>
        </section>

        <section className="storybook__section">
          <h3>Chat Message Component</h3>
          <p className="storybook__description">
            Message bubbles for AI conversations. AI messages appear on the
            left, user messages on the right.
          </p>

          <div className="storybook__demo-item">
            <div className="storybook__chat-container">
              <ChatMessage
                role="ai"
                content="Hello Jane. I've analyzed the latest regulatory updates from the EPC and UK Peacock. What would you like to explore today?"
                timestamp="10:30 AM"
              />
              <ChatMessage
                role="user"
                content="Can you summarize the key changes in the EPC regulations?"
                userInitals="Jane Smith"
                timestamp="10:31 AM"
              />
              <ChatMessage
                role="ai"
                content="Certainly! The European Payments Council has introduced three major updates this quarter: 1) Enhanced security requirements for instant payments, 2) New data sharing protocols for cross-border transactions, and 3) Updated guidelines for digital wallet integration."
                timestamp="10:31 AM"
              />
              <ChatMessage
                role="user"
                content="What are the implications for our compliance team?"
                userInitals="Jane Smith"
                timestamp="10:32 AM"
              />
              <ChatMessage
                role="ai"
                content="Your compliance team should focus on three key areas: First, reviewing and updating your instant payment security protocols by Q2. Second, implementing the new data sharing framework for cross-border operations. Third, ensuring your digital wallet solutions meet the new integration standards."
                timestamp="10:32 AM"
              />
            </div>
          </div>
        </section>

        {/* Modal Components Section - Simplified */}
        <section className="storybook__section">
          <h3>Modal Components</h3>
          <p className="storybook__description">
            Dialog overlays for focused user interactions.
          </p>

          <div className="storybook__demo-item">
            <h4>Modals</h4>
            <div className="storybook__demo-row">
              <Button
                text="Open Basic Modal"
                variant="secondary"
                onClick={() => setIsBasicModalOpen(true)}
              />
              <Button
                text="Upload Document"
                icon={<Upload size={16} />}
                variant="primary"
                onClick={() => setIsUploadModalOpen(true)}
              />
            </div>
          </div>
        </section>

        {/* Document Card Components Section */}
        <section className="storybook__section">
          <h3>Document Card Components</h3>
          <p className="storybook__description">
            Cards for displaying documents with file icons, metadata, and
            actions. Supports both grid and list views.
          </p>

          <div className="storybook__demo-item">
            <h4>View Toggle</h4>
            <div className="storybook__demo-row">
              <Button
                text="Grid View"
                icon={<LayoutGrid size={16} />}
                variant={cardViewMode === 'grid' ? 'primary' : 'secondary'}
                onClick={() => setCardViewMode('grid')}
              />
              <Button
                text="List View"
                icon={<List size={16} />}
                variant={cardViewMode === 'list' ? 'primary' : 'secondary'}
                onClick={() => setCardViewMode('list')}
              />
            </div>
          </div>

          <div className="storybook__demo-item">
            <h4>{cardViewMode === 'grid' ? 'Grid View' : 'List View'}</h4>
            <div className="storybook__card-demo">
              {cardViewMode === 'grid' ? (
                <DocumentGrid
                  documents={documents}
                  onDocumentClick={(doc) => alert(`Clicked: ${doc.title}`)}
                  onDownload={(doc) => alert(`Download: ${doc.title}`)}
                  onFavoriteToggle={handleFavoriteToggle}
                  columns={3}
                />
              ) : (
                <DocumentList
                  documents={documents}
                  onDocumentClick={(doc) => alert(`Clicked: ${doc.title}`)}
                  onDownload={(doc) => alert(`Download: ${doc.title}`)}
                  onShare={(doc) => alert(`Share: ${doc.title}`)}
                  onDelete={(doc) => alert(`Delete: ${doc.title}`)}
                />
              )}
            </div>
          </div>

          <div className="storybook__demo-item">
            <h4>Single Card (All File Types)</h4>
            <div className="storybook__demo-row storybook__card-types">
              <DocumentCard
                document={{
                  id: 'pdf',
                  title: 'PDF Document',
                  fileType: 'pdf',
                  fileSize: 1024000,
                  createdAt: new Date(),
                  category: 'regulation',
                }}
                viewMode="grid"
                onClick={() => {}}
              />
              <DocumentCard
                document={{
                  id: 'docx',
                  title: 'Word Document',
                  fileType: 'docx',
                  fileSize: 512000,
                  createdAt: new Date(),
                  category: 'compliance',
                }}
                viewMode="grid"
                onClick={() => {}}
              />
              <DocumentCard
                document={{
                  id: 'xlsx',
                  title: 'Excel Spreadsheet',
                  fileType: 'xlsx',
                  fileSize: 2048000,
                  createdAt: new Date(),
                  category: 'data',
                }}
                viewMode="grid"
                onClick={() => {}}
              />
              <DocumentCard
                document={{
                  id: 'pptx',
                  title: 'PowerPoint',
                  fileType: 'pptx',
                  fileSize: 3072000,
                  createdAt: new Date(),
                  category: 'strategy',
                }}
                viewMode="grid"
                onClick={() => {}}
              />
            </div>
          </div>
        </section>

        {/* Basic Modal Instance */}
        <Modal
          isOpen={isBasicModalOpen}
          onClose={() => setIsBasicModalOpen(false)}
          title="Example Modal"
          subtitle="This is a demonstration of the base Modal component."
          size="medium"
          footer={
            <div className="storybook__modal-footer">
              <Button
                text="Cancel"
                variant="secondary"
                onClick={() => setIsBasicModalOpen(false)}
              />
              <Button
                text="Confirm"
                variant="primary"
                onClick={() => {
                  alert('Confirmed!');
                  setIsBasicModalOpen(false);
                }}
              />
            </div>
          }
        >
          <p>
            Modals are used to display content that requires user attention or
            interaction. They overlay the main content and can be closed by
            clicking the X button, clicking outside (overlay), or pressing
            Escape.
          </p>
          <p style={{ marginTop: '1rem' }}>
            The Modal component supports three sizes: small, medium, and large.
            It also includes accessibility features like focus trapping and ARIA
            attributes.
          </p>
        </Modal>

        {/* Upload Document Modal Instance */}
        <UploadDocumentModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleDocumentUpload}
          defaultAuthor="Dan Smith"
        />
      </div>
    </QueryClientProvider>
  );
}
