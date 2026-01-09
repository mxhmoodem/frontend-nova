import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './AppShell';

const renderAppShell = () => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<div>Test Content</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

describe('AppShell', () => {
  it('renders the sidebar with brand name', () => {
    renderAppShell();
    expect(screen.getByText('Noval IQ')).toBeDefined();
  });

  it('renders the top bar with search', () => {
    renderAppShell();
    expect(screen.getByPlaceholderText(/search dashboards/i)).toBeDefined();
  });

  it('renders the outlet content', () => {
    renderAppShell();
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('renders the Ask AI button', () => {
    renderAppShell();
    expect(screen.getByText('Ask AI')).toBeDefined();
  });
});
