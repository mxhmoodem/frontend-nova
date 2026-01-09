import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Reports from './Reports';

describe('Reports', () => {
  it('renders the page title', () => {
    render(
      <BrowserRouter>
        <Reports />
      </BrowserRouter>
    );
    expect(screen.getByText('Reports')).toBeDefined();
  });

  it('renders report items', () => {
    render(
      <BrowserRouter>
        <Reports />
      </BrowserRouter>
    );
    expect(screen.getByText('UK Market Summary Q3 2025')).toBeDefined();
  });

  it('renders generate report button', () => {
    render(
      <BrowserRouter>
        <Reports />
      </BrowserRouter>
    );
    expect(screen.getByText('Generate Report')).toBeDefined();
  });
});
