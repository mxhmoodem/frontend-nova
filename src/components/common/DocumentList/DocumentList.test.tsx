import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentList } from './DocumentList';
import { DocumentData } from '../DocumentCard/DocumentCard.types';

const mockDocuments: DocumentData[] = [
  {
    id: '1',
    title: 'Q4 Financial Report',
    fileType: 'pdf',
    fileSize: 2457600,
    author: 'John Smith',
    createdAt: new Date('2024-01-15'),
    category: 'report',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Market Analysis 2024',
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
];

describe('DocumentList', () => {
  describe('Rendering', () => {
    it('renders all documents', () => {
      render(<DocumentList documents={mockDocuments} />);

      expect(screen.getByText('Q4 Financial Report')).toBeInTheDocument();
      expect(screen.getByText('Market Analysis 2024')).toBeInTheDocument();
      expect(screen.getByText('Compliance Guidelines')).toBeInTheDocument();
    });

    it('applies list class', () => {
      render(<DocumentList documents={mockDocuments} testId="list" />);
      const list = screen.getByTestId('list');
      expect(list).toHaveClass('document-list');
    });

    it('applies custom className', () => {
      render(
        <DocumentList
          documents={mockDocuments}
          className="custom-list"
          testId="list"
        />
      );
      const list = screen.getByTestId('list');
      expect(list).toHaveClass('custom-list');
    });

    it('renders documents in list view mode', () => {
      render(<DocumentList documents={mockDocuments} testId="list" />);
      const item = screen.getByTestId('document-item-1');
      expect(item).toHaveClass('document-card--list');
    });
  });

  describe('Empty State', () => {
    it('shows empty message when no documents', () => {
      render(<DocumentList documents={[]} />);
      expect(screen.getByText('No documents found')).toBeInTheDocument();
    });

    it('shows custom empty message', () => {
      render(
        <DocumentList
          documents={[]}
          emptyMessage="Upload your first document"
        />
      );
      expect(
        screen.getByText('Upload your first document')
      ).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows skeleton loaders when loading', () => {
      render(<DocumentList documents={[]} loading testId="list" />);
      const list = screen.getByTestId('list');
      const skeletons = list.querySelectorAll('.document-list__skeleton');
      expect(skeletons.length).toBe(5);
    });
  });

  describe('Interactivity', () => {
    it('calls onDocumentClick when document is clicked', () => {
      const handleClick = vi.fn();
      render(
        <DocumentList documents={mockDocuments} onDocumentClick={handleClick} />
      );

      fireEvent.click(screen.getByText('Q4 Financial Report'));
      expect(handleClick).toHaveBeenCalledWith(mockDocuments[0]);
    });

    it('calls onDownload when download button is clicked', () => {
      const handleDownload = vi.fn();
      render(
        <DocumentList documents={mockDocuments} onDownload={handleDownload} />
      );

      const downloadButtons = screen.getAllByLabelText('Download document');
      fireEvent.click(downloadButtons[0]);
      expect(handleDownload).toHaveBeenCalledWith(mockDocuments[0]);
    });

    it('calls onShare when share button is clicked', () => {
      const handleShare = vi.fn();
      render(<DocumentList documents={mockDocuments} onShare={handleShare} />);

      const shareButtons = screen.getAllByLabelText('Share document');
      fireEvent.click(shareButtons[0]);
      expect(handleShare).toHaveBeenCalledWith(mockDocuments[0]);
    });

    it('calls onDelete when delete button is clicked', () => {
      const handleDelete = vi.fn();
      render(
        <DocumentList documents={mockDocuments} onDelete={handleDelete} />
      );

      const deleteButtons = screen.getAllByLabelText('Delete document');
      fireEvent.click(deleteButtons[0]);
      expect(handleDelete).toHaveBeenCalledWith(mockDocuments[0]);
    });
  });

  describe('Selection', () => {
    it('marks selected documents', () => {
      render(
        <DocumentList
          documents={mockDocuments}
          selectedIds={['1', '3']}
          testId="list"
        />
      );

      const item1 = screen.getByTestId('document-item-1');
      const item2 = screen.getByTestId('document-item-2');
      const item3 = screen.getByTestId('document-item-3');

      expect(item1).toHaveClass('document-card--selected');
      expect(item2).not.toHaveClass('document-card--selected');
      expect(item3).toHaveClass('document-card--selected');
    });
  });

  describe('Actions', () => {
    it('hides actions when showActions is false', () => {
      render(
        <DocumentList
          documents={mockDocuments}
          showActions={false}
          onDownload={() => {}}
          onShare={() => {}}
        />
      );

      expect(
        screen.queryByLabelText('Download document')
      ).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Share document')).not.toBeInTheDocument();
    });
  });
});
