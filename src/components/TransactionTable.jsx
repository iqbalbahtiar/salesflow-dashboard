import { useState } from "react";

import {
  ArrowUpRight,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  SearchX,
} from "lucide-react";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

export default function TransactionTable({
  transactions,
  statusFilter,
  onStatusChange,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu((prev) =>
      prev === id ? null : id
    );
  };

  return (
    <div className="content-card transaction-card">
      <div className="card-heading transaction-heading">
        <div>
          <h3>Recent Transactions</h3>

          <p>
            Manage and monitor customer transactions
          </p>
        </div>

        <div className="transaction-actions">
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(e.target.value)
            }
            className="status-filter"
          >
            <option value="All">
              All Status
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Failed">
              Failed
            </option>
          </select>

          <button
            type="button"
            className="primary-button"
            onClick={onAdd}
          >
            <Plus size={17} />
            Add Transaction
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>INVOICE</th>
              <th>CUSTOMER</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <div className="invoice-cell">
                      <div className="invoice-icon">
                        <ArrowUpRight size={16} />
                      </div>

                      <strong>
                        {transaction.id}
                      </strong>
                    </div>
                  </td>

                  <td>
                    <div className="customer-cell">
                      <strong>
                        {transaction.customer}
                      </strong>

                      <span>
                        {transaction.email}
                      </span>
                    </div>
                  </td>

                  <td>
                    {formatDate(
                      transaction.date
                    )}
                  </td>

                  <td className="amount-cell">
                    {formatRupiah(
                      transaction.amount
                    )}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${transaction.status.toLowerCase()}`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  <td className="action-cell">
                    <button
                      type="button"
                      className="table-action"
                      onClick={() =>
                        toggleMenu(
                          transaction.id
                        )
                      }
                    >
                      <MoreHorizontal
                        size={19}
                      />
                    </button>

                    {openMenu ===
                      transaction.id && (
                      <div className="action-menu">
                        <button
                          type="button"
                          onClick={() => {
                            onEdit(
                              transaction
                            );
                            setOpenMenu(null);
                          }}
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-action"
                          onClick={() => {
                            onDelete(
                              transaction
                            );
                            setOpenMenu(null);
                          }}
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="empty-table"
                >
                  <SearchX size={30} />

                  <strong>
                    No transactions found
                  </strong>

                  <span>
                    Try changing your search
                    or filter.
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Showing {transactions.length}{" "}
          transaction
          {transactions.length !== 1
            ? "s"
            : ""}
        </span>

        <span className="table-footer-label">
          SalesFlow Transaction Management
        </span>
      </div>
    </div>
  );
}