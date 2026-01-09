import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Scenarios from './Scenarios';

describe('Scenarios', () => {
  it('renders the page title', () => {
    render(
      <BrowserRouter>
        <Scenarios />
      </BrowserRouter>
    );
    expect(screen.getByText('Scenarios')).toBeDefined();
  });

  it('renders scenario cards', () => {
    render(
      <BrowserRouter>
        <Scenarios />
      </BrowserRouter>
    );
    expect(screen.getByText('Base Case 2025')).toBeDefined();
    expect(screen.getByText('High Growth Scenario')).toBeDefined();
  });

  it('renders new scenario button', () => {
    render(
      <BrowserRouter>
        <Scenarios />
      </BrowserRouter>
    );
    expect(screen.getByText('New Scenario')).toBeDefined();
  });
});
