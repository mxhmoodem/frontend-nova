import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Workspaces from './Workspaces';

describe('Workspaces', () => {
  it('renders the page title', () => {
    render(
      <BrowserRouter>
        <Workspaces />
      </BrowserRouter>
    );
    expect(screen.getByText('Workspaces')).toBeDefined();
  });

  it('renders workspace cards', () => {
    render(
      <BrowserRouter>
        <Workspaces />
      </BrowserRouter>
    );
    expect(screen.getByText('UK Digital Payments Strategy')).toBeDefined();
  });

  it('renders new workspace button', () => {
    render(
      <BrowserRouter>
        <Workspaces />
      </BrowserRouter>
    );
    expect(screen.getByText('New Workspace')).toBeDefined();
  });
});
