import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Help from './Help';

describe('Help', () => {
  it('renders the page title', () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );
    expect(screen.getByText('Help Center')).toBeDefined();
  });

  it('renders search input', () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Search for help...')).toBeDefined();
  });

  it('renders FAQ section', () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );
    expect(screen.getByText('Frequently Asked Questions')).toBeDefined();
  });

  it('renders contact support button', () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );
    expect(screen.getByText('Contact Support')).toBeDefined();
  });
});
