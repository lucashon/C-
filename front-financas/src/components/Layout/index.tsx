import type { ReactNode } from "react";
import { LayoutDashboard, Users, Tags, ArrowRightLeft, Settings, LogOut, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./layout.css";

export function Layout({ children }: { children: ReactNode }) {
  // Aqui eu uso o useLocation para saber exatamente em qual página o usuário está.
  // Isso serve para eu "acender" o botão azul no menu lateral e dar um feedback visual.
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
          {/* Aqui eu verifico a rota atual: se for a mesma do link, eu aplico a classe "active" */}
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
          {/* Aqui eu criei um atalho rápido para o usuário adicionar uma transação de qualquer tela */}
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
          {/* Aqui é onde a "mágica" acontece: o conteúdo de cada página (Dashboard, People, etc.) 
              é renderizado dentro deste espaço branco através do 'children' */}
          {children}
        </div>
      </main>
    </div>
  );
}