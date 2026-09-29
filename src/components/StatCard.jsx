import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  trend = "up",
  icon: Icon,
}) {
  const positive = trend === "up";

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={21} />
        </div>

        <div
          className={`stat-change ${
            positive ? "positive" : "negative"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}

          {change}
        </div>
      </div>

      <p>{title}</p>
      <h3>{value}</h3>

      <span className="stat-caption">
        Compared to last month
      </span>
    </div>
  );
}