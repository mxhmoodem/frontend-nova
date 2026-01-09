import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TopBar from './TopBar';

describe('TopBar', () => {
  it('renders search input', () => {
    render(<TopBar onAIClick={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search dashboards/i)).toBeDefined();
  });

  it('renders Ask AI button', () => {
    render(<TopBar onAIClick={vi.fn()} />);
    expect(screen.getByText('Ask AI')).toBeDefined();
  });

  it('calls onAIClick when Ask AI button is clicked', () => {
    const onAIClick = vi.fn();
    render(<TopBar onAIClick={onAIClick} />);

    fireEvent.click(screen.getByText('Ask AI'));
    expect(onAIClick).toHaveBeenCalled();
  });

  it('renders notifications button', () => {
    render(<TopBar onAIClick={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: /notifications/i })
    ).toBeDefined();
  });

  it('renders theme toggle button', () => {
    render(<TopBar onAIClick={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: /switch to dark mode/i })
    ).toBeDefined();
  });

  it('renders user profile', () => {
    render(<TopBar onAIClick={vi.fn()} />);
    expect(screen.getByText('Jane Smith')).toBeDefined();
    expect(screen.getByText('JS')).toBeDefined();
  });

  it('toggles dark mode when theme button is clicked', () => {
    render(<TopBar onAIClick={vi.fn()} />);
    const themeButton = screen.getByRole('button', {
      name: /switch to dark mode/i,
    });

    fireEvent.click(themeButton);

    // After clicking, the button should now say "Switch to Light Mode"
    expect(
      screen.getByRole('button', { name: /switch to light mode/i })
    ).toBeDefined();
  });
});
