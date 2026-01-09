import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  it('renders the brand name', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Noval IQ')).toBeDefined();
  });

  it('renders get started button', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Get Started')).toBeDefined();
  });

  it('renders login link', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Log in')).toBeDefined();
  });

  it('renders capabilities section', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText('1. Centralise Data')).toBeDefined();
    expect(screen.getByText('2. Ask Questions')).toBeDefined();
    expect(screen.getByText('3. Generate Insights')).toBeDefined();
  });
});
