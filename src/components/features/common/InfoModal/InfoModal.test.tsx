import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InfoModal from './InfoModal';
import type { InfoModalContent } from './InfoModal.types';

const mockContent: InfoModalContent = {
  whatFor: 'This is what the page is for',
  whatItDoes: ['Feature 1', 'Feature 2'],
  whenToUse: 'Use it when you need to',
  howToUse: ['Step 1', 'Step 2'],
  example: 'An example scenario',
  projectRelation: 'How it relates to the project',
};

describe('InfoModal', () => {
  it('renders nothing when closed', () => {
    render(
      <InfoModal
        isOpen={false}
        onClose={vi.fn()}
        title="Test"
        content={mockContent}
      />
    );
    expect(screen.queryByText('Test')).toBeNull();
  });

  it('renders when open', () => {
    render(
      <InfoModal
        isOpen={true}
        onClose={vi.fn()}
        title="Test Modal"
        content={mockContent}
      />
    );
    expect(screen.getByText('Test Modal')).toBeDefined();
  });

  it('renders content sections', () => {
    render(
      <InfoModal
        isOpen={true}
        onClose={vi.fn()}
        title="Test"
        content={mockContent}
      />
    );
    expect(screen.getByText('This is what the page is for')).toBeDefined();
    expect(screen.getByText('Feature 1')).toBeDefined();
    expect(screen.getByText('Feature 2')).toBeDefined();
    expect(screen.getByText('Use it when you need to')).toBeDefined();
  });

  it('renders example and project relation', () => {
    render(
      <InfoModal
        isOpen={true}
        onClose={vi.fn()}
        title="Test"
        content={mockContent}
      />
    );
    expect(screen.getByText(/"An example scenario"/)).toBeDefined();
    expect(screen.getByText('How it relates to the project')).toBeDefined();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <InfoModal
        isOpen={true}
        onClose={onClose}
        title="Test"
        content={mockContent}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Got it button is clicked', () => {
    const onClose = vi.fn();
    render(
      <InfoModal
        isOpen={true}
        onClose={onClose}
        title="Test"
        content={mockContent}
      />
    );

    fireEvent.click(screen.getByText('Got it'));
    expect(onClose).toHaveBeenCalled();
  });
});
