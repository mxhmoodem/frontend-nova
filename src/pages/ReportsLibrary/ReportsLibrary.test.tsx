import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReportsLibrary from './ReportsLibrary';

describe('ReportsLibrary', () => {
  it('renders the page title', () => {
    render(
      <BrowserRouter>
        <ReportsLibrary />
      </BrowserRouter>
    );
    expect(screen.getByText('Reports Library')).toBeDefined();
  });

  it('renders search input', () => {
    render(
      <BrowserRouter>
        <ReportsLibrary />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Search reports...')).toBeDefined();
  });

  it('renders report items', () => {
    render(
      <BrowserRouter>
        <ReportsLibrary />
      </BrowserRouter>
    );
    expect(screen.getByText('UK Payment Trends 2025')).toBeDefined();
  });
});
