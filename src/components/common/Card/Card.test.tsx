import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      render(<Card>Test content</Card>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with default variant', () => {
      render(<Card testId="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--default');
    });

    it('renders with outlined variant', () => {
      render(
        <Card variant="outlined" testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--outlined');
    });

    it('renders with elevated variant', () => {
      render(
        <Card variant="elevated" testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--elevated');
    });

    it('applies custom className', () => {
      render(
        <Card className="custom-class" testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Padding', () => {
    it('renders with default md padding', () => {
      render(<Card testId="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--padding-md');
    });

    it('renders with no padding', () => {
      render(
        <Card padding="none" testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--padding-none');
    });

    it('renders with small padding', () => {
      render(
        <Card padding="sm" testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--padding-sm');
    });

    it('renders with large padding', () => {
      render(
        <Card padding="lg" testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--padding-lg');
    });
  });

  describe('Interactivity', () => {
    it('applies hoverable class when hoverable is true', () => {
      render(
        <Card hoverable testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--hoverable');
    });

    it('applies clickable class when clickable is true', () => {
      render(
        <Card clickable onClick={() => {}} testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--clickable');
    });

    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(
        <Card clickable onClick={handleClick} testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Enter key press', () => {
      const handleClick = vi.fn();
      render(
        <Card clickable onClick={handleClick} testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      fireEvent.keyDown(card, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Space key press', () => {
      const handleClick = vi.fn();
      render(
        <Card clickable onClick={handleClick} testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      fireEvent.keyDown(card, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has role="button" when clickable', () => {
      render(
        <Card clickable onClick={() => {}} testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('role', 'button');
    });

    it('is focusable when clickable', () => {
      render(
        <Card clickable onClick={() => {}} testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Selected state', () => {
    it('applies selected class when selected is true', () => {
      render(
        <Card selected testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--selected');
    });
  });

  describe('Header and Footer', () => {
    it('renders header when provided', () => {
      render(<Card header={<span>Header Content</span>}>Body Content</Card>);
      expect(screen.getByText('Header Content')).toBeInTheDocument();
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('renders footer when provided', () => {
      render(<Card footer={<span>Footer Content</span>}>Body Content</Card>);
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('renders both header and footer', () => {
      render(
        <Card
          header={<span>Header</span>}
          footer={<span>Footer</span>}
          testId="card"
        >
          Body
        </Card>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('applies with-sections class when header or footer is provided', () => {
      render(
        <Card header={<span>Header</span>} testId="card">
          Body
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--with-sections');
    });
  });

  describe('Accessibility', () => {
    it('applies aria-label when provided', () => {
      render(
        <Card ariaLabel="Test card" testId="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('aria-label', 'Test card');
    });

    it('applies data-testid when provided', () => {
      render(<Card testId="my-card">Content</Card>);
      expect(screen.getByTestId('my-card')).toBeInTheDocument();
    });
  });
});
