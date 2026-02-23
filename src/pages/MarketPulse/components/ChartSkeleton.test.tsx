import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ChartSkeleton } from './ChartSkeleton';

describe('ChartSkeleton', () => {
  describe('rendering', () => {
    it('renders skeleton structure', () => {
      const { container } = render(<ChartSkeleton />);

      expect(container.querySelector('.chart-skeleton')).toBeInTheDocument();
    });

    it('renders header section with title and value placeholders', () => {
      const { container } = render(<ChartSkeleton />);

      expect(
        container.querySelector('.chart-skeleton__header')
      ).toBeInTheDocument();
      expect(
        container.querySelector('.chart-skeleton__title')
      ).toBeInTheDocument();
      expect(
        container.querySelector('.chart-skeleton__value')
      ).toBeInTheDocument();
    });

    it('renders badge placeholder', () => {
      const { container } = render(<ChartSkeleton />);

      expect(
        container.querySelector('.chart-skeleton__badge')
      ).toBeInTheDocument();
    });

    it('renders chart area placeholder', () => {
      const { container } = render(<ChartSkeleton />);

      expect(
        container.querySelector('.chart-skeleton__chart')
      ).toBeInTheDocument();
    });
  });
});
