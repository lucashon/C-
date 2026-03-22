import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { DashboardPage } from "../pages/Dashboard";
import { PersonsPage } from "../pages/Persons";
import { CategoriesPage } from "../pages/Categories";
import { TransactionsPage } from "../pages/Transactions";

// Configuração de rotas da aplicação :

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={ <DashboardPage />} />
          <Route path="/persons" element={<PersonsPage />} />
          <Route path="/categories" element={<CategoriesPage />} /> 
          <Route path="/transactions" element={<TransactionsPage />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}