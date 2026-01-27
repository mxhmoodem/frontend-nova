import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import './Modal.css';
import { ModalProps } from './Modal.types';

/**
 * Modal component for displaying content in an overlay dialog.
 * Supports different sizes, keyboard navigation, and customizable close behavior.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'medium',
  className = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  /**
   * Handle keyboard events for modal
   * Closes modal on Escape key press if closeOnEscape is true
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [onClose, closeOnEscape]
  );

  /**
   * Handle overlay click
   * Closes modal if closeOnOverlayClick is true
   */
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // Add keyboard event listener when modal is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Don't render anything if modal is not open
  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`modal modal--${size} ${className}`.trim()}>
        {/* Modal Header */}
        <div className="modal__header">
          <div className="modal__header-content">
            <h2 id="modal-title" className="modal__title">
              {title}
            </h2>
            {subtitle && <p className="modal__subtitle">{subtitle}</p>}
          </div>
          <button
            className="modal__close-button"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal__body">{children}</div>

        {/* Modal Footer (optional) */}
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );

  // Render modal in a portal to avoid z-index issues
  return createPortal(modalContent, document.body);
};

export default Modal;
