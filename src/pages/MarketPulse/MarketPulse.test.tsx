import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MarketPulse from './MarketPulse';

// Mock all API hooks used by MarketPulse
vi.mock('../../services/api', async () => {
  const actual = await vi.importActual('../../services/api');
  return {
    ...actual,
    usePaymentStats: vi.fn(() => ({
      data: null,
      isLoading: false,
      isError: false,
    })),
    useRefreshPaymentData: vi.fn(() => ({
      mutate: vi.fn(),
      isPending: false,
    })),
    usePaymentHistory: vi.fn(() => ({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    })),
    useMarketTrends: vi.fn(() => ({
      data: null,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    })),
  };
});

// Mock AG Charts to prevent canvas errors in tests
vi.mock('ag-charts-react', () => ({
  AgCharts: () => <div data-testid="mock-ag-chart" />,
}));

let queryClient: QueryClient;

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('MarketPulse', () => {
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('renders the page title', () => {
    renderWithProviders(<MarketPulse />);
    expect(screen.getByText('Market Pulse')).toBeDefined();
  });

  it('renders the information button', () => {
    renderWithProviders(<MarketPulse />);
    expect(
      screen.getByLabelText('Information about Market Pulse')
    ).toBeInTheDocument();
  });

  it('renders metric tabs', () => {
    renderWithProviders(<MarketPulse />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders all four metric tab options', () => {
    renderWithProviders(<MarketPulse />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4);
  });

  it('renders the news panel with empty state', () => {
    renderWithProviders(<MarketPulse />);
    expect(screen.getByText('No market news available')).toBeInTheDocument();
  });

  it('renders stats grid container', () => {
    const { container } = renderWithProviders(<MarketPulse />);
    expect(
      container.querySelector('.market-pulse__stats-grid')
    ).toBeInTheDocument();
  });

  it('renders content grid layout', () => {
    const { container } = renderWithProviders(<MarketPulse />);
    expect(
      container.querySelector('.market-pulse__content-grid')
    ).toBeInTheDocument();
  });

  it('renders chart panel inside content grid', () => {
    const { container } = renderWithProviders(<MarketPulse />);
    expect(
      container.querySelector('.market-pulse__chart-panel')
    ).toBeInTheDocument();
  });

  it('renders news panel inside content grid', () => {
    const { container } = renderWithProviders(<MarketPulse />);
    expect(
      container.querySelector('.market-pulse__news-panel')
    ).toBeInTheDocument();
  });
});
