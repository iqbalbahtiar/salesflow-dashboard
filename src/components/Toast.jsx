import {
  CheckCircle2,
  X,
} from "lucide-react";

export default function Toast({
  message,
  onClose,
}) {
  if (!message) return null;

  return (
    <div className="toast-notification">
      <div className="toast-icon">
        <CheckCircle2 size={19} />
      </div>

      <div>
        <strong>Success</strong>
        <span>{message}</span>
      </div>

      <button
        type="button"
        onClick={onClose}
      >
        <X size={16} />
      </button>
    </div>
  );
}