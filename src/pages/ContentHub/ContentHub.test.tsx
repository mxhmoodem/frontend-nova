import { describe, it, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContentHub from './ContentHub';

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('ContentHub', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders', () => {
    renderWithQueryClient(<ContentHub />);
    expect(screen.getByText('Content Hub')).toBeDefined();
  });

  it('renders the upload document button', () => {
    renderWithQueryClient(<ContentHub />);
    expect(screen.getByText('Upload Document')).toBeInTheDocument();
  });

  it('opens upload modal when button is clicked', async () => {
    renderWithQueryClient(<ContentHub />);

    const uploadButton = screen.getByText('Upload Document');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText('Upload new document')).toBeInTheDocument();
    });
  });

  it('closes upload modal when close button is clicked', async () => {
    renderWithQueryClient(<ContentHub />);

    // Open modal
    const uploadButton = screen.getByText('Upload Document');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText('Upload new document')).toBeInTheDocument();
    });

    // Close modal
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Upload new document')).not.toBeInTheDocument();
    });
  });
});
