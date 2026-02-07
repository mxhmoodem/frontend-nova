import { ReactNode } from 'react';

export interface PaymentMethod {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Name of the payment method
   */
  name: string;

  /**
   * Percentage of total payment mix
   */
  percentage: number;

  /**
   * Color for the bar
   */
  color: string;

  /**
   * Optional icon
   */
  icon?: ReactNode;
}

export interface PaymentMethodBreakdownProps {
  /**
   * Title of the card
   */
  title: string;

  /**
   * Payment methods to display
   */
  methods: PaymentMethod[];

  /**
   * Data source
   */
  source?: {
    name: string;
    url?: string;
  };

  /**
   * Time period for the data
   */
  period?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Test id for testing purposes
   */
  testId?: string;
}
