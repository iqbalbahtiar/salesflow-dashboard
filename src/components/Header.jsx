import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

export default function Header({
  searchQuery,
  onSearchChange,
}) {
  return (
    <header className="header">
      <div>
        <h1>Sales Overview</h1>

        <p>
          Here's what's happening with your business
          today.
        </p>
      </div>

      <div className="header-actions">
        <div className="header-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
          />
        </div>

        <button
          type="button"
          className="notification-button"
        >
          <Bell size={20} />
          <span />
        </button>

        <div className="profile">
          <div className="profile-avatar">AM</div>

          <div className="profile-info">
            <strong>Alex Morgan</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={17} />
        </div>
      </div>
    </header>
  );
}