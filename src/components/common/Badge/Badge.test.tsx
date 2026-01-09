import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeDefined();
  });

  it('applies default variant', () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.querySelector('.bg-secondary')).toBeDefined();
  });

  it('applies success variant', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect(container.querySelector('.text-green-600')).toBeDefined();
  });

  it('applies danger variant', () => {
    const { container } = render(<Badge variant="danger">Danger</Badge>);
    expect(container.querySelector('.text-red-600')).toBeDefined();
  });

  it('applies warning variant', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    expect(container.querySelector('.text-amber-600')).toBeDefined();
  });

  it('applies size styles', () => {
    const { container } = render(<Badge size="sm">Small</Badge>);
    expect(container.querySelector('.px-1\\.5')).toBeDefined();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Badge className="custom-class">Custom</Badge>
    );
    expect(container.querySelector('.custom-class')).toBeDefined();
  });
});
