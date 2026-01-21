import { ReactNode } from 'react';

// Generic lookup result interface. Extend or replace this with specific result type.
export interface LookupResult {
  id: string | number;
  label: string;
  [key: string]: unknown;
}

// Function type for fetching lookup results.
// @param query - The search query string.
// @returns Promise resolving to an array of results.
export type FetchLookupResults<T = LookupResult> = (
  query: string
) => Promise<T[]>;

export interface LookupSearchProps<T = LookupResult> {
  // Function to fetch lookup results based on query
  fetchResults: FetchLookupResults<T>;

  // Callback fired when a result is selected. @param result - The selected result
  onSelect: (result: T) => void;

  // Optional placeholder text for the search input. @default 'Search...'
  placeholder?: string;

  // Optional minimum query length before triggering lookup. @default 3
  minQueryLength?: number;

  // Optional custom rendering for each result item. @param result - The result to render. @param isActive - Whether this result is currently highlighted. @returns React node to render
  renderResult?: (result: T, isActive: boolean) => ReactNode;

  // Optional ARIA label for accessibility
  ariaLabel?: string;

  // Optional visible label
  label?: string;

  // Optional className for custom styling
  className?: string;

  // Optional size variation. @default 'md'
  size?: 'sm' | 'md' | 'lg';

  // Optional initial value for the search input
  initialValue?: string;

  // Optional leading element (icon, button, etc.) for the search input
  leadingSlot?: ReactNode;

  // Optional trailing element (icon, button, etc.) for the search input
  trailingSlot?: ReactNode;

  // Whether the input is disabled. @default false
  disabled?: boolean;

  // Optional ID for the input element
  id?: string;

  // Optional name attribute for the input element
  name?: string;

  // Optional custom empty state message. @default 'No results found'
  emptyStateMessage?: string;
}
