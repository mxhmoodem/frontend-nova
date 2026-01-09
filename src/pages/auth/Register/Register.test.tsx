import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

describe('Register', () => {
  it('renders the request access title', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(
      screen.getByRole('heading', { name: 'Request Access' })
    ).toBeDefined();
  });

  it('renders form inputs', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Jane Smith')).toBeDefined();
    expect(screen.getByPlaceholderText('name@company.com')).toBeDefined();
    expect(screen.getByPlaceholderText('Company name')).toBeDefined();
  });

  it('renders sign in link', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByText('Sign in')).toBeDefined();
  });
});
