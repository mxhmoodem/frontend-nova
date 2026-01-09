import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContentHub from './ContentHub';

const renderContentHub = () => {
  return render(
    <BrowserRouter>
      <ContentHub />
    </BrowserRouter>
  );
};

describe('ContentHub', () => {
  it('renders the page title', () => {
    renderContentHub();
    expect(screen.getByText('Content Hub')).toBeDefined();
  });

  it('renders search input', () => {
    renderContentHub();
    expect(screen.getByPlaceholderText('Search documents...')).toBeDefined();
  });

  it('renders upload button', () => {
    renderContentHub();
    expect(screen.getByText('Upload Document')).toBeDefined();
  });

  it('renders document list', () => {
    renderContentHub();
    expect(
      screen.getByText('UK_Payment_Markets_Review_2025.pdf')
    ).toBeDefined();
  });

  it('renders sources filter', () => {
    renderContentHub();
    expect(screen.getByText('Sources')).toBeDefined();
    expect(screen.getByText('All Sources')).toBeDefined();
  });

  it('renders storage indicator', () => {
    renderContentHub();
    expect(screen.getByText('Storage')).toBeDefined();
    expect(screen.getByText('45% used')).toBeDefined();
  });
});
