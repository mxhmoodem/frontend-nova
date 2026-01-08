import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import RegulatoryRadar from './RegulatoryRadar';

describe('RegulatoryRadar', () => {
  it('renders', () => {
    render(<RegulatoryRadar />);
    expect(screen.getByText('Regulatory Radar')).toBeDefined();
  });
});
