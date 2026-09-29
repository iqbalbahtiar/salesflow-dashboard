import {
  LayoutDashboard,
  ReceiptText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  WalletCards,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    name: "Transactions",
    icon: ReceiptText,
  },
  {
    name: "Customers",
    icon: Users,
  },
  {
    name: "Reports",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <WalletCards size={22} />
        </div>

        <div>
          <h2>SalesFlow</h2>
          <span>Business Dashboard</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <p className="menu-label">MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.name}
              className={`menu-item ${
                item.active ? "active" : ""
              }`}
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button type="button" className="menu-item">
          <Settings size={19} />
          <span>Settings</span>
        </button>

        <button type="button" className="menu-item logout">
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}