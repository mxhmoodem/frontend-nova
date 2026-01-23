import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

describe('Button', () => {
  it('renders correctly with just text', () => {
    render(<Button text="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
  });

  it('renders correctly with just icon', () => {
    render(<Button icon={<MockIcon />} aria-label="Edit" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders correctly with both text and icon', () => {
    render(<Button text="Save" icon={<MockIcon />} />);
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    const { container } = render(<Button text="Delete" variant="danger" />);
    expect(container.firstChild).toHaveClass('button--danger');
  });

  it('applies icon-only class when only icon is provided', () => {
    const { container } = render(<Button icon={<MockIcon />} />);
    expect(container.firstChild).toHaveClass('button--icon-only');
  });

  it('does not apply icon-only class when text is present', () => {
    const { container } = render(<Button icon={<MockIcon />} text="Add" />);
    expect(container.firstChild).not.toHaveClass('button--icon-only');
  });

  it('throws an error if neither text nor icon is provided', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<Button />);
    }).toThrow(
      'Button component requires either "text" or "icon" prop to be defined.'
    );

    consoleSpy.mockRestore();
  });

  it('supports passing standard HTML attributes', () => {
    const handleClick = vi.fn();
    render(
      <Button text="Click Me" onClick={handleClick} disabled type="submit" />
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });
});
