import { describe, it, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../context/AuthContext/AuthContext';
import Overview from './Overview';

// Mock API hooks used by Overview
vi.mock('../../services/api', async () => {
  const actual = await vi.importActual('../../services/api');
  return {
    ...actual,
    usePaymentStats: vi.fn(() => ({
      data: null,
      isLoading: false,
      isError: false,
    })),
    usePaymentHistory: vi.fn(() => ({
      data: null,
      isLoading: false,
      isError: false,
    })),
  };
});

// Mock AG Charts to prevent canvas errors in tests
vi.mock('ag-charts-react', () => ({
  AgCharts: () => <div data-testid="mock-ag-chart" />,
}));

let queryClient: QueryClient;

describe('Overview', () => {
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  });

  it('renders', () => {
    const { container } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Overview />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(container.querySelector('.overview')).toBeDefined();
  });
});
