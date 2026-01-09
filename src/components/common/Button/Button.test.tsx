import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toHaveProperty('disabled', true);
  });

  it('is disabled when isLoading is true', () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByRole('button')).toHaveProperty('disabled', true);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('applies variant styles', () => {
    const { container } = render(<Button variant="secondary">Click me</Button>);
    expect(container.querySelector('.bg-secondary')).toBeDefined();
  });

  it('applies size styles', () => {
    const { container } = render(<Button size="lg">Click me</Button>);
    expect(container.querySelector('.h-12')).toBeDefined();
  });
});
