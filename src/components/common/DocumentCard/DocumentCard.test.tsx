import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentCard } from './DocumentCard';
import { DocumentData } from './DocumentCard.types';

const mockDocument: DocumentData = {
  id: '1',
  title: 'Q4 Financial Report 2024',
  fileType: 'pdf',
  fileSize: 2457600, // 2.4 MB
  author: 'John Smith',
  createdAt: new Date('2024-01-15'),
  category: 'report',
  isFavorite: false,
};

describe('DocumentCard', () => {
  describe('Grid View Rendering', () => {
    it('renders document title', () => {
      render(<DocumentCard document={mockDocument} viewMode="grid" />);
      expect(screen.getByText('Q4 Financial Report 2024')).toBeInTheDocument();
    });

    it('renders file type label', () => {
      render(<DocumentCard document={mockDocument} viewMode="grid" />);
      expect(screen.getByText('PDF File')).toBeInTheDocument();
    });

    it('renders file size', () => {
      render(<DocumentCard document={mockDocument} viewMode="grid" />);
      expect(screen.getByText('2.3 MB')).toBeInTheDocument();
    });

    it('renders author name', () => {
      render(<DocumentCard document={mockDocument} viewMode="grid" />);
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });

    it('renders category tag', () => {
      render(<DocumentCard document={mockDocument} viewMode="grid" />);
      expect(screen.getByText('Report')).toBeInTheDocument();
    });

    it('applies grid class', () => {
      render(
        <DocumentCard document={mockDocument} viewMode="grid" testId="card" />
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('document-card--grid');
    });
  });

  describe('List View Rendering', () => {
    it('renders document title in list view', () => {
      render(<DocumentCard document={mockDocument} viewMode="list" />);
      expect(screen.getByText('Q4 Financial Report 2024')).toBeInTheDocument();
    });

    it('applies list class', () => {
      render(
        <DocumentCard document={mockDocument} viewMode="list" testId="card" />
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('document-card--list');
    });

    it('renders action buttons in list view', () => {
      const onDownload = vi.fn();
      const onShare = vi.fn();
      const onDelete = vi.fn();

      render(
        <DocumentCard
          document={mockDocument}
          viewMode="list"
          onDownload={onDownload}
          onShare={onShare}
          onDelete={onDelete}
        />
      );

      expect(screen.getByLabelText('Download document')).toBeInTheDocument();
      expect(screen.getByLabelText('Share document')).toBeInTheDocument();
      expect(screen.getByLabelText('Delete document')).toBeInTheDocument();
    });
  });

  describe('Interactivity', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = vi.fn();
      render(
        <DocumentCard
          document={mockDocument}
          onClick={handleClick}
          testId="card"
        />
      );

      fireEvent.click(screen.getByTestId('card'));
      expect(handleClick).toHaveBeenCalledWith(mockDocument);
    });

    it('calls onClick on Enter key press', () => {
      const handleClick = vi.fn();
      render(
        <DocumentCard
          document={mockDocument}
          onClick={handleClick}
          testId="card"
        />
      );

      fireEvent.keyDown(screen.getByTestId('card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledWith(mockDocument);
    });

    it('calls onFavoriteToggle when favorite button is clicked', () => {
      const handleFavorite = vi.fn();
      render(
        <DocumentCard
          document={mockDocument}
          viewMode="grid"
          onFavoriteToggle={handleFavorite}
        />
      );

      fireEvent.click(screen.getByLabelText('Add to favorites'));
      expect(handleFavorite).toHaveBeenCalledWith(mockDocument);
    });

    it('calls onDownload when download button is clicked', () => {
      const handleDownload = vi.fn();
      render(
        <DocumentCard
          document={mockDocument}
          viewMode="list"
          onDownload={handleDownload}
        />
      );

      fireEvent.click(screen.getByLabelText('Download document'));
      expect(handleDownload).toHaveBeenCalledWith(mockDocument);
    });

    it('calls onShare when share button is clicked', () => {
      const handleShare = vi.fn();
      render(
        <DocumentCard
          document={mockDocument}
          viewMode="list"
          onShare={handleShare}
        />
      );

      fireEvent.click(screen.getByLabelText('Share document'));
      expect(handleShare).toHaveBeenCalledWith(mockDocument);
    });

    it('calls onDelete when delete button is clicked', () => {
      const handleDelete = vi.fn();
      render(
        <DocumentCard
          document={mockDocument}
          viewMode="list"
          onDelete={handleDelete}
        />
      );

      fireEvent.click(screen.getByLabelText('Delete document'));
      expect(handleDelete).toHaveBeenCalledWith(mockDocument);
    });

    it('stops propagation on action button clicks', () => {
      const handleClick = vi.fn();
      const handleDownload = vi.fn();
      render(
        <DocumentCard
          document={mockDocument}
          viewMode="list"
          onClick={handleClick}
          onDownload={handleDownload}
        />
      );

      fireEvent.click(screen.getByLabelText('Download document'));
      expect(handleDownload).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Selected State', () => {
    it('applies selected class when selected is true', () => {
      render(<DocumentCard document={mockDocument} selected testId="card" />);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('document-card--selected');
    });
  });

  describe('File Type Icons', () => {
    it('renders correct icon for PDF', () => {
      render(<DocumentCard document={{ ...mockDocument, fileType: 'pdf' }} />);
      expect(screen.getByText('PDF File')).toBeInTheDocument();
    });

    it('renders correct icon for DOCX', () => {
      render(<DocumentCard document={{ ...mockDocument, fileType: 'docx' }} />);
      expect(screen.getByText('DOCX File')).toBeInTheDocument();
    });

    it('renders correct icon for XLSX', () => {
      render(<DocumentCard document={{ ...mockDocument, fileType: 'xlsx' }} />);
      expect(screen.getByText('Excel File')).toBeInTheDocument();
    });

    it('renders correct icon for PPTX', () => {
      render(<DocumentCard document={{ ...mockDocument, fileType: 'pptx' }} />);
      expect(screen.getByText('PowerPoint')).toBeInTheDocument();
    });
  });

  describe('Category Tags', () => {
    const categories = [
      { category: 'regulation', label: 'Regulation' },
      { category: 'market', label: 'Market' },
      { category: 'strategy', label: 'Strategy' },
      { category: 'compliance', label: 'Compliance' },
      { category: 'data', label: 'Data' },
    ] as const;

    categories.forEach(({ category, label }) => {
      it(`renders ${category} category tag`, () => {
        render(
          <DocumentCard
            document={{ ...mockDocument, category }}
            viewMode="grid"
          />
        );
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has role="button" when clickable', () => {
      render(
        <DocumentCard
          document={mockDocument}
          onClick={() => {}}
          testId="card"
        />
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('role', 'button');
    });

    it('is focusable when clickable', () => {
      render(
        <DocumentCard
          document={mockDocument}
          onClick={() => {}}
          testId="card"
        />
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('applies title attribute for truncated text', () => {
      render(<DocumentCard document={mockDocument} />);
      const title = screen.getByText('Q4 Financial Report 2024');
      expect(title).toHaveAttribute('title', 'Q4 Financial Report 2024');
    });
  });

  describe('Favorite State', () => {
    it('shows correct label when not favorited', () => {
      render(
        <DocumentCard
          document={{ ...mockDocument, isFavorite: false }}
          viewMode="grid"
          onFavoriteToggle={() => {}}
        />
      );
      expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();
    });

    it('shows correct label when favorited', () => {
      render(
        <DocumentCard
          document={{ ...mockDocument, isFavorite: true }}
          viewMode="grid"
          onFavoriteToggle={() => {}}
        />
      );
      expect(
        screen.getByLabelText('Remove from favorites')
      ).toBeInTheDocument();
    });

    it('applies active class when favorited', () => {
      render(
        <DocumentCard
          document={{ ...mockDocument, isFavorite: true }}
          viewMode="grid"
          onFavoriteToggle={() => {}}
        />
      );
      const favoriteButton = screen.getByLabelText('Remove from favorites');
      expect(favoriteButton).toHaveClass('document-card__favorite--active');
    });
  });

  describe('Hide Actions', () => {
    it('hides actions when showActions is false', () => {
      render(
        <DocumentCard
          document={mockDocument}
          viewMode="list"
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
