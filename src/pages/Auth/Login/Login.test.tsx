import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from './Login';
import { AuthProvider } from '../../../context/AuthContext/AuthContext';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders login page with SSO button', () => {
    renderLogin();

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(
      screen.getByText('Sign in to access your insights workspace')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /login with sso/i })
    ).toBeInTheDocument();
  });

  it('displays SSO authentication message', () => {
    renderLogin();

    expect(
      screen.getByText('Secure authentication powered by SSO')
    ).toBeInTheDocument();
  });

  it('calls login and navigates to dashboard on SSO button click', async () => {
    renderLogin();

    const ssoButton = screen.getByRole('button', { name: /login with sso/i });
    fireEvent.click(ssoButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/app/overview');
    });
  });

  it('persists authentication state to localStorage', async () => {
    renderLogin();

    const ssoButton = screen.getByRole('button', { name: /login with sso/i });
    fireEvent.click(ssoButton);

    await waitFor(() => {
      const authState = localStorage.getItem('auth_state');
      expect(authState).toBeTruthy();

      const parsedState = JSON.parse(authState!);
      expect(parsedState.isAuthenticated).toBe(true);
      expect(parsedState.user).toBeTruthy();
    });
  });

  it('has accessible SSO button', () => {
    renderLogin();

    const ssoButton = screen.getByRole('button', { name: /login with sso/i });
    expect(ssoButton).toHaveAttribute('type', 'button');
  });
});
