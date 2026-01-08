import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import ContentHub from './ContentHub';

describe('ContentHub', () => {
  it('renders', () => {
    render(<ContentHub />);
    expect(screen.getByText('Content Hub')).toBeDefined();
  });
});
