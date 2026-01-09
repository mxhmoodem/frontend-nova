import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Overview from './Overview';

const renderOverview = () => {
  return render(
    <BrowserRouter>
      <Overview />
    </BrowserRouter>
  );
};

describe('Overview', () => {
  it('renders the dashboard title', () => {
    renderOverview();
    expect(screen.getByText('Dashboard')).toBeDefined();
  });

  it('renders the welcome message', () => {
    renderOverview();
    expect(
      screen.getByText(
        /Welcome back, Jane. Here's what's happening in the UK payment landscape/
      )
    ).toBeDefined();
  });

  it('renders the AI assistant section', () => {
    renderOverview();
    expect(screen.getByText('AI Research Assistant')).toBeDefined();
    expect(screen.getByText('Get AI-powered insights')).toBeDefined();
  });

  it('renders the Open AI Console link', () => {
    renderOverview();
    expect(screen.getByText('Open AI Console')).toBeDefined();
  });

  it('renders stat cards', () => {
    renderOverview();
    expect(screen.getByText('New UK Documents')).toBeDefined();
    expect(screen.getByText('FCA Alerts')).toBeDefined();
    expect(screen.getByText('UK Market Reports')).toBeDefined();
    expect(screen.getByText('UK Volume')).toBeDefined();
  });

  it('renders regulatory radar section', () => {
    renderOverview();
    expect(screen.getByText('Regulatory Radar')).toBeDefined();
  });

  it('renders market pulse section', () => {
    renderOverview();
    expect(screen.getByText('Market Pulse')).toBeDefined();
    expect(screen.getByText('Trending in UK')).toBeDefined();
  });

  it('renders trending tags', () => {
    renderOverview();
    expect(screen.getByText('# Open Banking')).toBeDefined();
    expect(screen.getByText('# APP Fraud')).toBeDefined();
  });
});
