import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { AuthProvider } from '../../../context/AuthContext/AuthContext';
import ProtectedRoute from './ProtectedRoute';

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const TestComponent = () => <div>Protected Content</div>;

  const renderProtectedRoute = (isAuthenticated: boolean = false) => {
    if (isAuthenticated) {
      localStorage.setItem(
        'auth_state',
        JSON.stringify({
          isAuthenticated: true,
          user: { id: '1', email: 'user@example.com', name: 'User' },
        })
      );
    }

    return render(
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <TestComponent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('redirects to login when not authenticated', () => {
    window.history.pushState({}, 'Test', '/protected');
    renderProtectedRoute(false);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    window.history.pushState({}, 'Test', '/protected');
    renderProtectedRoute(true);

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
