import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UploadDocumentModal } from './UploadDocumentModal';

describe('UploadDocumentModal', () => {
  const mockOnClose = vi.fn();
  const mockOnUpload = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  const renderModal = (props = {}) => {
    return render(
      <UploadDocumentModal
        isOpen={true}
        onClose={mockOnClose}
        onUpload={mockOnUpload}
        {...props}
      />
    );
  };

  const createMockFile = (
    name: string = 'test-document.pdf',
    type: string = 'application/pdf'
  ) => {
    return new File(['test content'], name, { type });
  };

  it('renders when isOpen is true', () => {
    renderModal();

    expect(screen.getByText('Upload new document')).toBeInTheDocument();
    expect(
      screen.getByText(/Please ensure you have permission/)
    ).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <UploadDocumentModal
        isOpen={false}
        onClose={mockOnClose}
        onUpload={mockOnUpload}
      />
    );

    expect(screen.queryByText('Upload new document')).not.toBeInTheDocument();
  });

  it('shows dropzone when no file is uploaded', () => {
    renderModal();

    expect(
      screen.getByText('Drag and drop files here to upload')
    ).toBeInTheDocument();
    expect(screen.getByText('Select files')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    renderModal();

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('shows form fields after file upload', async () => {
    renderModal();

    const file = createMockFile();
    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    // Simulate file drop
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Title/)).toBeInTheDocument();
      expect(screen.getByLabelText(/File Type/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Document Type/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Author/)).toBeInTheDocument();
    });
  });

  it('auto-populates title from filename', async () => {
    renderModal();

    const file = createMockFile('my-important-document.pdf');
    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      const titleInput = screen.getByLabelText(/Title/) as HTMLInputElement;
      expect(titleInput.value).toBe('my-important-document');
    });
  });

  it('auto-populates file type from mime type', async () => {
    renderModal();

    const file = createMockFile('document.pdf', 'application/pdf');
    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      const fileTypeInput = screen.getByLabelText(
        /File Type/
      ) as HTMLInputElement;
      expect(fileTypeInput.value).toBe('PDF Document');
    });
  });

  it('shows file preview after upload', async () => {
    renderModal();

    const file = createMockFile('test-file.pdf');
    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(screen.getByText('test-file.pdf')).toBeInTheDocument();
    });
  });

  it('allows removing uploaded file', async () => {
    renderModal();

    const file = createMockFile();
    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(screen.getByText('test-document.pdf')).toBeInTheDocument();
    });

    const removeButton = screen.getByLabelText('Remove file');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(
        screen.getByText('Drag and drop files here to upload')
      ).toBeInTheDocument();
    });
  });

  it('disables submit button when required fields are missing', async () => {
    renderModal();

    const file = createMockFile();
    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(screen.getByText('Upload document')).toBeInTheDocument();
    });

    // Clear the auto-populated title
    const titleInput = screen.getByLabelText(/Title/);
    fireEvent.change(titleInput, { target: { value: '' } });

    // Submit button should be disabled when required fields are empty
    const submitButton = screen.getByText('Upload document');
    expect(submitButton).toBeDisabled();
  });

  it('disables submit button when document type is not selected', async () => {
    renderModal({ defaultAuthor: 'Test Author' });

    const file = createMockFile();
    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(screen.getByText('Upload document')).toBeInTheDocument();
    });

    // Submit button should be disabled until document type is selected
    const submitButton = screen.getByText('Upload document');
    expect(submitButton).toBeDisabled();
  });

  it('calls onUpload with correct data on valid submission', async () => {
    renderModal({ defaultAuthor: 'Test Author' });

    const file = createMockFile('test.pdf');
    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Document Type/)).toBeInTheDocument();
    });

    // Select document type
    const documentTypeSelect = screen.getByLabelText(/Document Type/);
    fireEvent.change(documentTypeSelect, { target: { value: 'regulatory' } });

    // Submit
    const submitButton = screen.getByText('Upload document');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith(
        file,
        expect.objectContaining({
          title: 'test',
          documentType: 'regulatory',
          author: 'Test Author',
        })
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('uses default author when provided', async () => {
    renderModal({ defaultAuthor: 'Dan Smith' });

    const file = createMockFile();
    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      const authorInput = screen.getByLabelText(/Author/) as HTMLInputElement;
      expect(authorInput.value).toBe('Dan Smith');
    });
  });

  it('handles drag enter and leave states', async () => {
    renderModal();

    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass('upload-document__dropzone--active');

    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass('upload-document__dropzone--active');
  });

  it('shows cancel button after file upload', async () => {
    renderModal();

    const file = createMockFile();
    const dropzone = screen.getByRole('button', {
      name: /upload file dropzone/i,
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
