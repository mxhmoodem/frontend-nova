import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Alerts from './Alerts';

describe('Alerts', () => {
  it('renders the page title', () => {
    render(
      <BrowserRouter>
        <Alerts />
      </BrowserRouter>
    );
    expect(screen.getByText('Alerts')).toBeDefined();
  });

  it('renders alert items', () => {
    render(
      <BrowserRouter>
        <Alerts />
      </BrowserRouter>
    );
    expect(screen.getByText('APP Fraud Deadline Approaching')).toBeDefined();
  });

  it('renders mark all read button', () => {
    render(
      <BrowserRouter>
        <Alerts />
      </BrowserRouter>
    );
    expect(screen.getByText('Mark All Read')).toBeDefined();
  });
});
