import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentMethodBreakdown } from './PaymentMethodBreakdown';
import type { PaymentMethod } from './PaymentMethodBreakdown.types';

const mockMethods: PaymentMethod[] = [
  { id: '1', name: 'Card Payments', percentage: 45, color: '#3B82F6' },
  { id: '2', name: 'Faster Payments', percentage: 28, color: '#10B981' },
  { id: '3', name: 'Direct Debit', percentage: 18, color: '#8B5CF6' },
  { id: '4', name: 'Cash', percentage: 9, color: '#F59E0B' },
];

describe('PaymentMethodBreakdown', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(
        <PaymentMethodBreakdown title="Payment Methods" methods={mockMethods} />
      );

      expect(screen.getByText('Payment Methods')).toBeInTheDocument();
    });

    it('should render all payment methods', () => {
      render(
        <PaymentMethodBreakdown title="Payment Methods" methods={mockMethods} />
      );

      expect(screen.getByText('Card Payments')).toBeInTheDocument();
      expect(screen.getByText('Faster Payments')).toBeInTheDocument();
      expect(screen.getByText('Direct Debit')).toBeInTheDocument();
      expect(screen.getByText('Cash')).toBeInTheDocument();
    });

    it('should display percentages for each method', () => {
      render(
        <PaymentMethodBreakdown title="Payment Methods" methods={mockMethods} />
      );

      expect(screen.getByText('45%')).toBeInTheDocument();
      expect(screen.getByText('28%')).toBeInTheDocument();
      expect(screen.getByText('18%')).toBeInTheDocument();
      expect(screen.getByText('9%')).toBeInTheDocument();
    });

    it('should render progress bars with correct widths', () => {
      const { container } = render(
        <PaymentMethodBreakdown
          title="Payment Methods"
          methods={mockMethods}
          testId="breakdown"
        />
      );

      const bars = container.querySelectorAll('.payment-method-breakdown__bar');
      expect(bars).toHaveLength(4);
      expect(bars[0]).toHaveStyle({ width: '45%' });
      expect(bars[1]).toHaveStyle({ width: '28%' });
    });

    it('should render with custom icon for methods', () => {
      const methodsWithIcon: PaymentMethod[] = [
        {
          id: '1',
          name: 'Card Payments',
          percentage: 45,
          color: '#3B82F6',
          icon: '💳',
        },
      ];

      render(
        <PaymentMethodBreakdown
          title="Payment Methods"
          methods={methodsWithIcon}
        />
      );

      expect(screen.getByText('💳')).toBeInTheDocument();
    });
  });

  describe('Source Attribution', () => {
    it('should display source text', () => {
      render(
        <PaymentMethodBreakdown
          title="Payment Methods"
          methods={mockMethods}
          source={{ name: 'UK Finance' }}
        />
      );

      expect(screen.getByText('UK Finance')).toBeInTheDocument();
    });

    it('should render source as link when URL provided', () => {
      render(
        <PaymentMethodBreakdown
          title="Payment Methods"
          methods={mockMethods}
          source={{
            name: 'UK Finance',
            url: 'https://www.ukfinance.org.uk',
          }}
        />
      );

      const link = screen.getByRole('link', { name: 'UK Finance' });
      expect(link).toHaveAttribute('href', 'https://www.ukfinance.org.uk');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should display period text', () => {
      render(
        <PaymentMethodBreakdown
          title="Payment Methods"
          methods={mockMethods}
          currentPeriod="Q4 2024"
        />
      );

      expect(screen.getByText('Q4 2024')).toBeInTheDocument();
    });

    it('should display both source and period', () => {
      render(
        <PaymentMethodBreakdown
          title="Payment Methods"
          methods={mockMethods}
          source={{ name: 'UK Finance' }}
          currentPeriod="Q4 2024"
        />
      );

      expect(screen.getByText('UK Finance')).toBeInTheDocument();
      expect(screen.getByText('Q4 2024')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have correct test id', () => {
      render(
        <PaymentMethodBreakdown
          title="Payment Methods"
          methods={mockMethods}
          testId="breakdown"
        />
      );

      expect(screen.getByTestId('breakdown')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <PaymentMethodBreakdown
          title="Payment Methods"
          methods={mockMethods}
          className="custom-class"
        />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should have accessible structure with heading', () => {
      render(
        <PaymentMethodBreakdown title="Payment Methods" methods={mockMethods} />
      );

      expect(
        screen.getByRole('heading', { name: 'Payment Methods' })
      ).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty methods array', () => {
      const { container } = render(
        <PaymentMethodBreakdown title="No Data" methods={[]} />
      );

      expect(screen.getByText('No Data')).toBeInTheDocument();
      expect(
        container.querySelectorAll('.payment-method-breakdown__item')
      ).toHaveLength(0);
    });

    it('should handle 0% percentage', () => {
      const methods: PaymentMethod[] = [
        { id: '1', name: 'Crypto', percentage: 0, color: '#F59E0B' },
      ];

      render(<PaymentMethodBreakdown title="Methods" methods={methods} />);

      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('should handle 100% percentage', () => {
      const methods: PaymentMethod[] = [
        { id: '1', name: 'Cards', percentage: 100, color: '#3B82F6' },
      ];

      render(<PaymentMethodBreakdown title="Methods" methods={methods} />);

      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });
});
