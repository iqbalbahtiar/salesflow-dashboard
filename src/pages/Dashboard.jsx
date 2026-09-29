import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Banknote,
  ReceiptText,
  Users,
  CircleDollarSign,
  RotateCcw,
} from "lucide-react";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import TransactionTable from "../components/TransactionTable";
import TransactionModal from "../components/TransactionModal";
import DeleteModal from "../components/DeleteModal";
import Toast from "../components/Toast";

import {
  transactions as initialTransactions,
} from "../data/transactions";

const STORAGE_KEY =
  "salesflow_transactions";

const formatCompactRupiah = (value) => {
  if (value >= 1000000000) {
    return `Rp${(
      value / 1000000000
    ).toFixed(1)}B`;
  }

  if (value >= 1000000) {
    return `Rp${(
      value / 1000000
    ).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `Rp${(
      value / 1000
    ).toFixed(1)}K`;
  }

  return `Rp${Math.round(value)}`;
};

export default function Dashboard({
  searchQuery,
}) {
  const [transactions, setTransactions] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(STORAGE_KEY);

        return saved
          ? JSON.parse(saved)
          : initialTransactions;
      } catch {
        return initialTransactions;
      }
    });

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [
    selectedTransaction,
    setSelectedTransaction,
  ] = useState(null);

  const [
    deleteTransaction,
    setDeleteTransaction,
  ] = useState(null);

  const [toast, setToast] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 3000);

    return () =>
      clearTimeout(timer);
  }, [toast]);

  const filteredTransactions =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      return transactions.filter(
        (transaction) => {
          const matchesSearch =
            !query ||
            transaction.customer
              .toLowerCase()
              .includes(query) ||
            transaction.email
              .toLowerCase()
              .includes(query) ||
            transaction.id
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter === "All" ||
            transaction.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      transactions,
      searchQuery,
      statusFilter,
    ]);

  const statistics = useMemo(() => {
    const paidTransactions =
      transactions.filter(
        (item) =>
          item.status === "Paid"
      );

    const totalRevenue =
      paidTransactions.reduce(
        (total, item) =>
          total +
          Number(item.amount),
        0
      );

    const customerCount =
      new Set(
        transactions.map(
          (item) =>
            item.email.toLowerCase()
        )
      ).size;

    const averageOrder =
      transactions.length
        ? transactions.reduce(
            (total, item) =>
              total +
              Number(item.amount),
            0
          ) / transactions.length
        : 0;

    return {
      totalRevenue,
      transactionCount:
        transactions.length,
      customerCount,
      averageOrder,
    };
  }, [transactions]);

  const stats = [
    {
      title: "Total Revenue",
      value: formatCompactRupiah(
        statistics.totalRevenue
      ),
      change: "12.5%",
      trend: "up",
      icon: Banknote,
    },
    {
      title: "Transactions",
      value:
        statistics.transactionCount.toLocaleString(
          "id-ID"
        ),
      change: "8.2%",
      trend: "up",
      icon: ReceiptText,
    },
    {
      title: "Customers",
      value:
        statistics.customerCount.toLocaleString(
          "id-ID"
        ),
      change: "5.7%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Average Order",
      value: formatCompactRupiah(
        statistics.averageOrder
      ),
      change: "2.4%",
      trend: "down",
      icon: CircleDollarSign,
    },
  ];

  const handleAdd = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (
    transaction
  ) => {
    setSelectedTransaction(
      transaction
    );

    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (selectedTransaction) {
      setTransactions((prev) =>
        prev.map((item) =>
          item.id ===
          selectedTransaction.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );

      setToast(
        "Transaction updated successfully."
      );
    } else {
      const maxInvoice =
        transactions.reduce(
          (max, item) => {
            const number =
              Number(
                item.id.replace(
                  "INV-",
                  ""
                )
              ) || 0;

            return Math.max(
              max,
              number
            );
          },
          1000
        );

      const newTransaction = {
        id: `INV-${maxInvoice + 1}`,
        ...formData,
      };

      setTransactions((prev) => [
        newTransaction,
        ...prev,
      ]);

      setToast(
        "Transaction added successfully."
      );
    }

    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleDeleteRequest = (
    transaction
  ) => {
    setDeleteTransaction(
      transaction
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteTransaction) return;

    setTransactions((prev) =>
      prev.filter(
        (item) =>
          item.id !==
          deleteTransaction.id
      )
    );

    setDeleteTransaction(null);

    setToast(
      "Transaction deleted successfully."
    );
  };

  const handleResetDemo = () => {
    setTransactions(
      initialTransactions.map(
        (item) => ({ ...item })
      )
    );

    setStatusFilter("All");

    setToast(
      "Demo data has been reset."
    );
  };

  return (
    <>
      <main className="dashboard">
        <div className="dashboard-toolbar">
          <div>
            <span className="live-indicator">
              <span />
              Live demo
            </span>
          </div>

          <button
            type="button"
            className="reset-button"
            onClick={handleResetDemo}
          >
            <RotateCcw size={14} />
            Reset Demo Data
          </button>
        </div>

        <section className="stats-grid">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              {...stat}
            />
          ))}
        </section>

        <RevenueChart
          transactions={transactions}
        />

        <TransactionTable
          transactions={
            filteredTransactions
          }
          statusFilter={
            statusFilter
          }
          onStatusChange={
            setStatusFilter
          }
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={
            handleDeleteRequest
          }
        />
      </main>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTransaction(
            null
          );
        }}
        onSave={handleSave}
        transaction={
          selectedTransaction
        }
      />

      <DeleteModal
        isOpen={Boolean(
          deleteTransaction
        )}
        transaction={
          deleteTransaction
        }
        onClose={() =>
          setDeleteTransaction(null)
        }
        onConfirm={
          handleDeleteConfirm
        }
      />

      <Toast
        message={toast}
        onClose={() =>
          setToast("")
        }
      />
    </>
  );
}