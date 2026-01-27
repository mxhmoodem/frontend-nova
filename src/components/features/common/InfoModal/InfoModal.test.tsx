import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InfoModal from './InfoModal';
import type { InfoModalContent } from './InfoModal.types';

const mockContent: InfoModalContent = {
  whatFor: 'Test purpose',
  whatItDoes: ['Feature 1', 'Feature 2'],
  whenToUse: 'Test when to use',
  howToUse: ['Step 1', 'Step 2'],
  example: 'Test example',
  projectRelation: 'Test relation',
};

describe('InfoModal', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders nothing when closed', () => {
    render(
      <InfoModal
        isOpen={false}
        onClose={() => {}}
        title="Test Modal"
        content={mockContent}
      />
    );
    expect(screen.queryByText('Test Modal')).toBeNull();
  });

  it('renders modal when open', () => {
    render(
      <InfoModal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        content={mockContent}
      />
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders content sections', () => {
    render(
      <InfoModal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        content={mockContent}
      />
    );
    expect(screen.getByText('Test purpose')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Test when to use')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Test relation')).toBeInTheDocument();
  });

  it('renders close button from Modal component', () => {
    render(
      <InfoModal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        content={mockContent}
      />
    );
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('renders Got it button in footer', () => {
    render(
      <InfoModal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        content={mockContent}
      />
    );
    expect(screen.getByText('Got it')).toBeInTheDocument();
  });

  it('calls onClose when Got it button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <InfoModal
        isOpen={true}
        onClose={handleClose}
        title="Test Modal"
        content={mockContent}
      />
    );

    fireEvent.click(screen.getByText('Got it'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <InfoModal
        isOpen={true}
        onClose={handleClose}
        title="Test Modal"
        content={mockContent}
      />
    );

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
