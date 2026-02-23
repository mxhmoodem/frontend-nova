import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MarketPulse from './MarketPulse';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('MarketPulse', () => {
  it('renders', () => {
    renderWithProviders(<MarketPulse />);
    expect(screen.getByText('Market Pulse')).toBeDefined();
  });
});
