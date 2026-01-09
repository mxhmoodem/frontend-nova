import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MarketPulse from './MarketPulse';

const renderMarketPulse = () => {
  return render(
    <BrowserRouter>
      <MarketPulse />
    </BrowserRouter>
  );
};

describe('MarketPulse', () => {
  it('renders the page title', () => {
    renderMarketPulse();
    expect(screen.getByText('Market Pulse')).toBeDefined();
  });

  it('renders the description', () => {
    renderMarketPulse();
    expect(
      screen.getByText(
        'Real-time analysis of UK payment trends and transaction volumes.'
      )
    ).toBeDefined();
  });

  it('renders KPI cards', () => {
    renderMarketPulse();
    expect(screen.getByText('Total Volume')).toBeDefined();
    expect(screen.getByText('Digital Wallets')).toBeDefined();
    expect(screen.getByText('Card Payments')).toBeDefined();
    expect(screen.getByText('Faster Payments')).toBeDefined();
  });

  it('renders the chart section', () => {
    renderMarketPulse();
    expect(screen.getByText('UK Payment Mix Evolution')).toBeDefined();
  });

  it('renders segment growth section', () => {
    renderMarketPulse();
    expect(screen.getByText('Segment Growth (UK)')).toBeDefined();
    expect(screen.getByText('E-commerce')).toBeDefined();
    expect(screen.getByText('POS')).toBeDefined();
  });

  it('renders analyst insight section', () => {
    renderMarketPulse();
    expect(screen.getByText('Analyst Insight')).toBeDefined();
  });

  it('renders latest reports section', () => {
    renderMarketPulse();
    expect(screen.getByText('Latest UK Market Reports')).toBeDefined();
    expect(screen.getByText('UK E-commerce Trends 2025')).toBeDefined();
  });

  it('renders export button', () => {
    renderMarketPulse();
    expect(screen.getByText('Export Report')).toBeDefined();
  });
});
