import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import Overview from './Overview';

describe('Overview', () => {
  it('renders', () => {
    render(<Overview />);
    expect(screen.getByText('Overview')).toBeDefined();
  });
});
