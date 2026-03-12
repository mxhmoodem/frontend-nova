import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import type { DeleteConfirmationModalProps } from './DeleteConfirmationModal.types';
import './DeleteConfirmationModal.css';

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  documentTitle,
  isDeleting = false,
}: DeleteConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete document"
      size="small"
      closeOnEscape={!isDeleting}
      closeOnOverlayClick={!isDeleting}
      footer={
        <div className="delete-confirmation__footer">
          <Button
            text="Cancel"
            variant="secondary"
            onClick={onClose}
            disabled={isDeleting}
          />
          <Button
            text={isDeleting ? 'Deleting...' : 'Delete'}
            variant="danger"
            onClick={onConfirm}
            disabled={isDeleting}
            isLoading={isDeleting}
          />
        </div>
      }
    >
      <div className="delete-confirmation">
        <p className="delete-confirmation__message">
          Are you sure you want to delete <strong>"{documentTitle}"</strong>?
        </p>
        <p className="delete-confirmation__warning">
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}
