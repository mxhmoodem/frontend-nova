import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card, { CardHeader, CardContent, CardFooter } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeDefined();
  });

  it('applies default variant', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector('.card-base')).toBeDefined();
  });

  it('applies hover variant', () => {
    const { container } = render(<Card variant="hover">Content</Card>);
    expect(container.querySelector('.card-hover')).toBeDefined();
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.querySelector('.custom-class')).toBeDefined();
  });

  it('applies padding', () => {
    const { container } = render(<Card padding="lg">Content</Card>);
    expect(container.querySelector('.p-8')).toBeDefined();
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeDefined();
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Body content</CardContent>);
    expect(screen.getByText('Body content')).toBeDefined();
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeDefined();
  });
});
