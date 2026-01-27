import { ReactNode } from 'react';

/**
 * Modal size variants
 */
export type ModalSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Props for the Modal component
 */
export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Modal title displayed in the header */
  title: string;
  /** Optional subtitle/description below the title */
  subtitle?: string;
  /** Modal content */
  children: ReactNode;
  /** Footer content (typically action buttons) */
  footer?: ReactNode;
  /** Size of the modal */
  size?: ModalSize;
  /** Additional CSS class for the modal */
  className?: string;
  /** Whether clicking the overlay closes the modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
}
