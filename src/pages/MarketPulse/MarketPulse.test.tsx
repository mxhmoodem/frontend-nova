import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import MarketPulse from './MarketPulse';

describe('MarketPulse', () => {
  it('renders', () => {
    render(<MarketPulse />);
    expect(screen.getByText('Market Pulse')).toBeDefined();
  });
});
