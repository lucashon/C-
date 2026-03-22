import type { ReactNode } from "react";
import { LayoutDashboard, Users, Tags, ArrowRightLeft, Settings, LogOut, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./layout.css";

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <Wallet size={28} className="logo-icon" />
            <h2 className="logo">Controle de Finanças</h2>
          </div>
          <span className="subtitle">Organize seus gastos familiares</span>
        </div>

        <nav className="menu">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/persons" className={location.pathname === "/persons" ? "active" : ""}>
            <Users size={20} /> People
          </Link>
          <Link to="/categories" className={location.pathname === "/categories" ? "active" : ""}>
            <Tags size={20} /> Categories
          </Link>
          <Link to="/transactions" className={location.pathname === "/transactions" ? "active" : ""}>
            <ArrowRightLeft size={20} /> Transactions
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/transactions">
            <button className="add-btn">+ Add Transaction</button>
          </Link>

          <div className="footer-links">
            <Link to="/settings"><Settings size={18} /> Settings</Link>
            <Link to="/logout"><LogOut size={18} /> Logout</Link>
          </div>
        </div>
      </aside>

      <main className="content">
        <div className="content-container">
          {children}
        </div>
      </main>
    </div>
  );
}