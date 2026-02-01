import { ReactNode } from 'react';

export type CardVariant = 'default' | 'outlined' | 'elevated';

export interface CardProps {
  /**
   * Card content
   */
  children: ReactNode;

  /**
   * Visual variant of the card
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Whether the card is clickable/interactive
   * @default false
   */
  clickable?: boolean;

  /**
   * Whether the card has hover effects
   * @default false
   */
  hoverable?: boolean;

  /**
   * Click handler for clickable cards
   */
  onClick?: () => void;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Padding size
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * Optional header content
   */
  header?: ReactNode;

  /**
   * Optional footer content
   */
  footer?: ReactNode;

  /**
   * Test id for testing purposes
   */
  testId?: string;

  /**
   * Accessible label for the card
   */
  ariaLabel?: string;

  /**
   * Whether the card is selected
   * @default false
   */
  selected?: boolean;
}
