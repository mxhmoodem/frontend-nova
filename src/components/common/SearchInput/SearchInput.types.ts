import { ReactNode } from 'react';

export interface SearchInputProps {
  // The current value of the input
  value: string;

  // Callback fired when the input value changes. @param value - The new input value
  onChange: (value: string) => void;

  // Optional callback fired when the form is submitted (e.g., when Enter key is pressed)
  onSubmit?: () => void;

  // Optional placeholder text
  placeholder?: string;

  // Whether the input is disabled
  disabled?: boolean;

  // Whether the input is in a loading state
  loading?: boolean;

  // Optional leading element (icon, button, etc.)
  leadingSlot?: ReactNode;

  // Optional trailing element (icon, button, etc.)
  trailingSlot?: ReactNode;

  // Optional ARIA label for accessibility
  ariaLabel?: string;

  // Optional visible label
  label?: string;

  // Optional className for custom styling
  className?: string;

  // Optional size variation
  size?: 'sm' | 'md' | 'lg';

  // Optional ID for the input element
  id?: string;

  // Optional name attribute for the input element
  name?: string;
}
