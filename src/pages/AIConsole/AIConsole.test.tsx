import { describe, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../context/AuthContext/AuthContext';
import { AIConsoleProvider } from '../../context/AIConsoleContext';
import AIConsole from './AIConsole';

let queryClient: QueryClient;

describe('AIConsole', () => {
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('renders', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AIConsoleProvider>
            <AIConsole />
          </AIConsoleProvider>
        </AuthProvider>
      </QueryClientProvider>
    );
    expect(screen.getByText('AI Console')).toBeDefined();
  });
});
