import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LiveNewsCard } from './index';

describe('LiveNewsCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the component with title', () => {
    render(<LiveNewsCard />);
    expect(screen.getByText('Live Global Payment News')).toBeInTheDocument();
  });

  it('should render with custom title', () => {
    render(<LiveNewsCard title="Custom News Title" />);
    expect(screen.getByText('Custom News Title')).toBeInTheDocument();
  });

  it('should display live indicator', () => {
    render(<LiveNewsCard />);
    expect(screen.getByText('LIVE')).toBeInTheDocument();
  });

  it('should display the first news item on initial render', () => {
    render(<LiveNewsCard />);
    expect(
      screen.getByText('Global Payments Expands Cross-Border Services')
    ).toBeInTheDocument();
  });

  it('should rotate to next news on button click', async () => {
    render(<LiveNewsCard />);
    const nextButton = screen.getByLabelText('Next news');

    fireEvent.click(nextButton);

    await waitFor(
      () => {
        expect(
          screen.getByText('Central Banks Launch Digital Currency Initiative')
        ).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it('should display correct counter', () => {
    render(<LiveNewsCard />);
    expect(screen.getByText(/Next \(1\/5\)/)).toBeInTheDocument();
  });

  it('should update counter after rotation', async () => {
    render(<LiveNewsCard />);
    const nextButton = screen.getByLabelText('Next news');

    fireEvent.click(nextButton);

    await waitFor(
      () => {
        expect(screen.getByText(/Next \(2\/5\)/)).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it('should cycle back to first news after last one', async () => {
    render(<LiveNewsCard />);
    const nextButton = screen.getByLabelText('Next news');

    // Click 5 times to go through all news
    for (let i = 0; i < 5; i++) {
      fireEvent.click(nextButton);
      await waitFor(() => {}, { timeout: 500 });
    }

    expect(screen.getByText(/Next \(1\/5\)/)).toBeInTheDocument();
  });

  it('should display category badge', () => {
    render(<LiveNewsCard />);
    expect(screen.getByText('PAYMENT')).toBeInTheDocument();
  });

  it('should display source and timestamp', () => {
    render(<LiveNewsCard />);
    expect(screen.getByText('FinanceToday')).toBeInTheDocument();
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  it('should auto-rotate news every 15 seconds', async () => {
    render(<LiveNewsCard />);

    expect(
      screen.getByText('Global Payments Expands Cross-Border Services')
    ).toBeInTheDocument();

    vi.advanceTimersByTime(15000);

    await waitFor(() => {
      expect(
        screen.getByText('Central Banks Launch Digital Currency Initiative')
      ).toBeInTheDocument();
    });
  });

  it('should disable button while rotating', async () => {
    render(<LiveNewsCard />);
    const nextButton = screen.getByLabelText('Next news') as HTMLButtonElement;

    fireEvent.click(nextButton);
    expect(nextButton.disabled).toBe(true);

    await waitFor(
      () => {
        expect(nextButton.disabled).toBe(false);
      },
      { timeout: 500 }
    );
  });
});
