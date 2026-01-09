import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegulatoryRadar from './RegulatoryRadar';

const renderRegulatoryRadar = () => {
  return render(
    <BrowserRouter>
      <RegulatoryRadar />
    </BrowserRouter>
  );
};

describe('RegulatoryRadar', () => {
  it('renders the page title', () => {
    renderRegulatoryRadar();
    expect(screen.getByText('Regulatory Radar')).toBeDefined();
  });

  it('renders compliance status cards', () => {
    renderRegulatoryRadar();
    expect(screen.getByText('Compliant Areas')).toBeDefined();
    expect(screen.getByText('Upcoming Deadlines')).toBeDefined();
    expect(screen.getByText('Critical Alerts')).toBeDefined();
  });

  it('renders the compliance timeline', () => {
    renderRegulatoryRadar();
    expect(screen.getByText('UK Compliance Timeline')).toBeDefined();
    expect(screen.getByText('APP Fraud Reimbursement')).toBeDefined();
  });

  it('renders search input', () => {
    renderRegulatoryRadar();
    expect(screen.getByPlaceholderText('Search regulations...')).toBeDefined();
  });

  it('renders UK Focus section', () => {
    renderRegulatoryRadar();
    expect(screen.getByText('UK Focus')).toBeDefined();
  });
});
