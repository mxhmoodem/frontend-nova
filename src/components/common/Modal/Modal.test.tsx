import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  // Mock createPortal to render content directly
  beforeEach(() => {
    // Create a div for portal rendering
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    // Clean up portal root
    const portalRoot = document.getElementById('portal-root');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
    // Reset body overflow
    document.body.style.overflow = '';
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        subtitle="This is a subtitle"
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        footer={<button>Submit</button>}
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked and closeOnOverlayClick is true', () => {
    const handleClose = vi.fn();
    render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        title="Test Modal"
        closeOnOverlayClick={true}
      >
        <p>Modal content</p>
      </Modal>
    );

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
    const handleClose = vi.fn();
    render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        title="Test Modal"
        closeOnOverlayClick={false}
      >
        <p>Modal content</p>
      </Modal>
    );

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed and closeOnEscape is true', () => {
    const handleClose = vi.fn();
    render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        title="Test Modal"
        closeOnEscape={true}
      >
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when Escape key is pressed and closeOnEscape is false', () => {
    const handleClose = vi.fn();
    render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        title="Test Modal"
        closeOnEscape={false}
      >
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('applies correct size class', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" size="large">
        <p>Modal content</p>
      </Modal>
    );

    // Find the modal element within the portal
    const modal = document.querySelector('.modal');
    expect(modal).toHaveClass('modal--large');
  });

  it('applies custom className', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        className="custom-modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    const modal = document.querySelector('.modal');
    expect(modal).toHaveClass('custom-modal');
  });

  it('prevents body scroll when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    rerender(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('');
  });
});
