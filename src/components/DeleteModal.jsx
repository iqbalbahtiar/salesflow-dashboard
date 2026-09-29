import {
  AlertTriangle,
  X,
} from "lucide-react";

export default function DeleteModal({
  isOpen,
  transaction,
  onClose,
  onConfirm,
}) {
  if (!isOpen || !transaction) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="delete-modal">
        <button
          type="button"
          className="delete-modal-close"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className="delete-warning-icon">
          <AlertTriangle size={24} />
        </div>

        <h3>Delete Transaction?</h3>

        <p>
          Are you sure you want to delete{" "}
          <strong>{transaction.id}</strong>{" "}
          from{" "}
          <strong>
            {transaction.customer}
          </strong>
          ?
        </p>

        <span>
          This action cannot be undone.
        </span>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="danger-button"
            onClick={onConfirm}
          >
            Delete Transaction
          </button>
        </div>
      </div>
    </div>
  );
}