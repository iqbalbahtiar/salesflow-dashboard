import { useMemo } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const formatCompact = (value) => {
  if (value >= 1000000) {
    return `${Math.round(value / 1000000)}M`;
  }

  if (value >= 1000) {
    return `${Math.round(value / 1000)}K`;
  }

  return value;
};

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function RevenueChart({
  transactions,
}) {
  const chartData = useMemo(() => {
    const months = {};

    transactions
      .filter(
        (transaction) =>
          transaction.status === "Paid"
      )
      .forEach((transaction) => {
        const date = new Date(
          `${transaction.date}T00:00:00`
        );

        const key = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

        const month = date.toLocaleString(
          "en-US",
          {
            month: "short",
          }
        );

        if (!months[key]) {
          months[key] = {
            key,
            month,
            revenue: 0,
          };
        }

        months[key].revenue += Number(
          transaction.amount
        );
      });

    return Object.values(months)
      .sort((a, b) =>
        a.key.localeCompare(b.key)
      )
      .slice(-6);
  }, [transactions]);

  return (
    <div className="content-card chart-card">
      <div className="card-heading">
        <div>
          <h3>Revenue Overview</h3>
          <p>
            Revenue from paid transactions
          </p>
        </div>

        <div className="chart-legend">
          <span />
          Paid Revenue
        </div>
      </div>

      <div className="chart-container">
        {chartData.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#635bff"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="#635bff"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#e9edf5"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={
                  formatCompact
                }
              />

              <Tooltip
                formatter={(value) => [
                  formatRupiah(value),
                  "Revenue",
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#635bff"
                strokeWidth={3}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-empty">
            <strong>
              No revenue data yet
            </strong>

            <span>
              Paid transactions will
              appear here.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}