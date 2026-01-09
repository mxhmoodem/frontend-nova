import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders initials when provided', () => {
    render(<Avatar initials="JS" />);
    expect(screen.getByText('JS')).toBeDefined();
  });

  it('renders first letter of alt when no initials', () => {
    render(<Avatar alt="John Smith" />);
    expect(screen.getByText('J')).toBeDefined();
  });

  it('renders fallback when no initials or alt', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeDefined();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="/test.jpg" alt="Test" />);
    const img = screen.getByRole('img');
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBe('/test.jpg');
  });

  it('applies size styles', () => {
    const { container } = render(<Avatar size="lg" initials="AB" />);
    expect(container.querySelector('.w-12')).toBeDefined();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Avatar className="custom-class" initials="AB" />
    );
    expect(container.querySelector('.custom-class')).toBeDefined();
  });
});
