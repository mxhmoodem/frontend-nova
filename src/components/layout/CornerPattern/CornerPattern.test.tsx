import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CornerPattern from './CornerPattern';

describe('CornerPattern', () => {
  it('renders without crashing', () => {
    const { container } = render(<CornerPattern />);
    expect(container.firstChild).toBeDefined();
  });

  it('renders decorative SVG elements', () => {
    const { container } = render(<CornerPattern />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(2);
  });

  it('is not interactive (pointer-events-none)', () => {
    const { container } = render(<CornerPattern />);
    expect(container.querySelector('.pointer-events-none')).toBeDefined();
  });
});
