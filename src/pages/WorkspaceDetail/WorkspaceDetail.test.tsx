import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WorkspaceDetail from './WorkspaceDetail';

describe('WorkspaceDetail', () => {
  it('renders back link', () => {
    render(
      <BrowserRouter>
        <WorkspaceDetail />
      </BrowserRouter>
    );
    expect(screen.getByText('Back to Workspaces')).toBeDefined();
  });

  it('renders documents section', () => {
    render(
      <BrowserRouter>
        <WorkspaceDetail />
      </BrowserRouter>
    );
    expect(screen.getByText('Documents')).toBeDefined();
  });

  it('renders activity section', () => {
    render(
      <BrowserRouter>
        <WorkspaceDetail />
      </BrowserRouter>
    );
    expect(screen.getByText('Activity')).toBeDefined();
  });
});
