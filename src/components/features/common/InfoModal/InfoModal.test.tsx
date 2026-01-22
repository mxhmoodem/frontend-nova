import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  it('renders nothing when closed', () => {
    const { container } = render(
      <InfoModal
        isOpen={false}
        onClose={() => {}}
        title="Test Modal"
        content={mockContent}
      />
    );
    expect(container.firstChild).toBeNull();
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
    expect(screen.getByText('Test Modal')).toBeDefined();
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
    expect(screen.getByText('Test purpose')).toBeDefined();
    expect(screen.getByText('Feature 1')).toBeDefined();
  });

  it('renders close button', () => {
    render(
      <InfoModal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        content={mockContent}
      />
    );
    expect(screen.getByLabelText('Close modal')).toBeDefined();
  });
});
