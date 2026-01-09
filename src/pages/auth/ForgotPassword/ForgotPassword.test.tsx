import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword', () => {
  it('renders the reset password title', () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    expect(screen.getByText('Reset Password')).toBeDefined();
  });

  it('renders email input', () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('name@company.com')).toBeDefined();
  });

  it('renders send reset link button', () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    expect(screen.getByText('Send Reset Link')).toBeDefined();
  });

  it('renders back to login link', () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    expect(screen.getByText('Back to login')).toBeDefined();
  });
});
