import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentGrid } from './DocumentGrid';
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

describe('DocumentGrid', () => {
  describe('Rendering', () => {
    it('renders all documents', () => {
      render(<DocumentGrid documents={mockDocuments} />);

      expect(screen.getByText('Q4 Financial Report')).toBeInTheDocument();
      expect(screen.getByText('Market Analysis 2024')).toBeInTheDocument();
      expect(screen.getByText('Compliance Guidelines')).toBeInTheDocument();
    });

    it('applies grid class with auto columns by default', () => {
      render(<DocumentGrid documents={mockDocuments} testId="grid" />);
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass('document-grid--columns-auto');
    });

    it('applies custom column count', () => {
      render(
        <DocumentGrid documents={mockDocuments} columns={3} testId="grid" />
      );
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass('document-grid--columns-3');
    });

    it('applies custom className', () => {
      render(
        <DocumentGrid
          documents={mockDocuments}
          className="custom-grid"
          testId="grid"
        />
      );
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass('custom-grid');
    });
  });

  describe('Empty State', () => {
    it('shows empty message when no documents', () => {
      render(<DocumentGrid documents={[]} />);
      expect(screen.getByText('No documents found')).toBeInTheDocument();
    });

    it('shows custom empty message', () => {
      render(
        <DocumentGrid
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
      render(<DocumentGrid documents={[]} loading testId="grid" />);
      const grid = screen.getByTestId('grid');
      const skeletons = grid.querySelectorAll('.document-grid__skeleton');
      expect(skeletons.length).toBe(6);
    });
  });

  describe('Interactivity', () => {
    it('calls onDocumentClick when document is clicked', () => {
      const handleClick = vi.fn();
      render(
        <DocumentGrid documents={mockDocuments} onDocumentClick={handleClick} />
      );

      fireEvent.click(screen.getByText('Q4 Financial Report'));
      expect(handleClick).toHaveBeenCalledWith(mockDocuments[0]);
    });

    it('calls onFavoriteToggle when favorite is clicked', () => {
      const handleFavorite = vi.fn();
      render(
        <DocumentGrid
          documents={mockDocuments}
          onFavoriteToggle={handleFavorite}
        />
      );

      const favoriteButtons = screen.getAllByLabelText(/favorites/);
      fireEvent.click(favoriteButtons[0]);
      expect(handleFavorite).toHaveBeenCalledWith(mockDocuments[0]);
    });
  });

  describe('Selection', () => {
    it('marks selected documents', () => {
      render(
        <DocumentGrid
          documents={mockDocuments}
          selectedIds={['1', '3']}
          testId="grid"
        />
      );

      const card1 = screen.getByTestId('document-card-1');
      const card2 = screen.getByTestId('document-card-2');
      const card3 = screen.getByTestId('document-card-3');

      expect(card1).toHaveClass('document-card--selected');
      expect(card2).not.toHaveClass('document-card--selected');
      expect(card3).toHaveClass('document-card--selected');
    });
  });

  describe('Actions', () => {
    it('hides actions when showActions is false', () => {
      render(
        <DocumentGrid
          documents={mockDocuments}
          showActions={false}
          onFavoriteToggle={() => {}}
        />
      );

      expect(screen.queryByLabelText(/favorites/)).not.toBeInTheDocument();
    });
  });
});
