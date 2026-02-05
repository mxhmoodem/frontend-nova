import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PoundSterling } from 'lucide-react';
import { MarketStatCard } from './MarketStatCard';

describe('MarketStatCard', () => {
  const defaultProps = {
    label: 'Total Volume',
    value: '£4.2B',
  };

  describe('rendering', () => {
    it('renders label and value', () => {
      render(<MarketStatCard {...defaultProps} />);

      expect(screen.getByText('Total Volume')).toBeInTheDocument();
      expect(screen.getByText('£4.2B')).toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      render(
        <MarketStatCard
          {...defaultProps}
          icon={<PoundSterling data-testid="icon" />}
        />
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders positive change with up trend', () => {
      render(<MarketStatCard {...defaultProps} change={12.5} trend="up" />);

      expect(screen.getByText('+12.5%')).toBeInTheDocument();
    });

    it('renders negative change with down trend', () => {
      render(<MarketStatCard {...defaultProps} change={-2.1} trend="down" />);

      expect(screen.getByText('-2.1%')).toBeInTheDocument();
    });

    it('renders source and period when provided', () => {
      render(
        <MarketStatCard
          {...defaultProps}
          source="UK Finance"
          period="Q4 2025"
        />
      );

      expect(screen.getByText('UK Finance')).toBeInTheDocument();
      expect(screen.getByText('Q4 2025')).toBeInTheDocument();
    });

    it('does not render footer when no source or period', () => {
      const { container } = render(<MarketStatCard {...defaultProps} />);

      expect(
        container.querySelector('.market-stat-card__footer')
      ).not.toBeInTheDocument();
    });

    it('applies testId when provided', () => {
      render(<MarketStatCard {...defaultProps} testId="test-card" />);

      expect(screen.getByTestId('test-card')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <MarketStatCard {...defaultProps} className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('trend styling', () => {
    it('applies up trend class', () => {
      const { container } = render(
        <MarketStatCard {...defaultProps} change={5} trend="up" />
      );

      expect(
        container.querySelector('.market-stat-card__trend--up')
      ).toBeInTheDocument();
    });

    it('applies down trend class', () => {
      const { container } = render(
        <MarketStatCard {...defaultProps} change={-5} trend="down" />
      );

      expect(
        container.querySelector('.market-stat-card__trend--down')
      ).toBeInTheDocument();
    });

    it('applies neutral trend class by default', () => {
      const { container } = render(
        <MarketStatCard {...defaultProps} change={0} />
      );

      expect(
        container.querySelector('.market-stat-card__trend--neutral')
      ).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('is not clickable when onClick not provided', () => {
      const { container } = render(<MarketStatCard {...defaultProps} />);

      expect(container.firstChild).not.toHaveClass(
        'market-stat-card--clickable'
      );
      expect(container.firstChild).not.toHaveAttribute('role', 'button');
    });

    it('is clickable when onClick provided', () => {
      const onClick = vi.fn();
      const { container } = render(
        <MarketStatCard {...defaultProps} onClick={onClick} />
      );

      expect(container.firstChild).toHaveClass('market-stat-card--clickable');
      expect(container.firstChild).toHaveAttribute('role', 'button');
    });

    it('calls onClick when clicked', () => {
      const onClick = vi.fn();
      render(<MarketStatCard {...defaultProps} onClick={onClick} />);

      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Enter key', () => {
      const onClick = vi.fn();
      const { container } = render(
        <MarketStatCard {...defaultProps} onClick={onClick} />
      );

      fireEvent.keyDown(container.firstChild!, { key: 'Enter' });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Space key', () => {
      const onClick = vi.fn();
      const { container } = render(
        <MarketStatCard {...defaultProps} onClick={onClick} />
      );

      fireEvent.keyDown(container.firstChild!, { key: ' ' });
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
