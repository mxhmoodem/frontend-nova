import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeDefined();
  });

  it('renders label when provided', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeDefined();
  });

  it('renders error message when provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeDefined();
  });

  it('handles onChange events', () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} placeholder="Test" />);

    fireEvent.change(screen.getByPlaceholderText('Test'), {
      target: { value: 'Hello' },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders with left icon', () => {
    render(<Input leftIcon={<span data-testid="left-icon">Icon</span>} />);
    expect(screen.getByTestId('left-icon')).toBeDefined();
  });

  it('renders with right icon', () => {
    render(<Input rightIcon={<span data-testid="right-icon">Icon</span>} />);
    expect(screen.getByTestId('right-icon')).toBeDefined();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveProperty(
      'disabled',
      true
    );
  });
});
