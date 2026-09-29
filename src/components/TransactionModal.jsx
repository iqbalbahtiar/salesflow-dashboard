import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  customer: "",
  email: "",
  date: new Date().toISOString().split("T")[0],
  amount: "",
  status: "Paid",
};

export default function TransactionModal({
  isOpen,
  onClose,
  onSave,
  transaction,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const isEdit = Boolean(transaction);

  useEffect(() => {
    if (!isOpen) return;

    if (transaction) {
      setFormData({
        customer: transaction.customer || "",
        email: transaction.email || "",
        date: transaction.date || "",
        amount: transaction.amount || "",
        status: transaction.status || "Paid",
      });
    } else {
      setFormData({
        ...emptyForm,
        date: new Date().toISOString().split("T")[0],
      });
    }

    setErrors({});
  }, [transaction, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customer.trim()) {
      newErrors.customer = "Customer name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.date) {
      newErrors.date = "Date is required.";
    }

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {
      newErrors.amount =
        "Amount must be greater than 0.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSave({
      ...formData,
      amount: Number(formData.amount),
    });
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="transaction-modal">
        <div className="modal-header">
          <div>
            <h3>
              {isEdit
                ? "Edit Transaction"
                : "Add Transaction"}
            </h3>

            <p>
              {isEdit
                ? "Update transaction information."
                : "Create a new customer transaction."}
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name</label>

            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="e.g. Nusantara Tech"
            />

            {errors.customer && (
              <span className="form-error">
                {errors.customer}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="finance@company.com"
            />

            {errors.email && (
              <span className="form-error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Transaction Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              {errors.date && (
                <span className="form-error">
                  {errors.date}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">
                  Pending
                </option>
                <option value="Failed">
                  Failed
                </option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>

            <div className="amount-input">
              <span>Rp</span>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>

            {errors.amount && (
              <span className="form-error">
                {errors.amount}
              </span>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button modal-save"
            >
              {isEdit
                ? "Save Changes"
                : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}