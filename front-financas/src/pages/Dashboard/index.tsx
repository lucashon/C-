import { useEffect, useState } from "react";
import { getReport } from "../../api/reportService";
import "./dashboard.css";

export function DashboardPage() {
  // Aqui eu crio um estado para guardar os dados do relatório que virão da API.
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    // Aqui eu disparo a função assim que a tela carrega para buscar os dados atualizados.
    async function load() {
      try {
        const data = await getReport();
        // Aqui eu guardo o resultado da busca dentro do meu estado 'report'.
        setReport(data);
      } catch (error) {
        console.error("Erro ao carregar relatório:", error);
      }
    }
    load();
  }, []);

  // Aqui eu faço uma trava de segurança: enquanto os dados não chegam da API, 
  // eu mostro uma mensagem de carregamento para o usuário não ver a tela vazia.
  if (!report) return (
    <div className="dashboard-container">
      <h1 className="loading">Sincronizando dados...</h1>
    </div>
  );

  // Aqui eu criei uma função simples para formatar os números para a nossa moeda (R$).
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Aqui eu trato os dados que vieram do C#. Como usei nomes que podem variar entre 
  // maiúsculas e minúsculas no JSON, eu garanto que vou pegar o valor certo de qualquer jeito.
  const total = report.totalGeral || report.TotalGeral;
  const listaPessoas = report.pessoas || report.Pessoas || [];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard Financeiro</h1>
          <p>Visão geral da residência</p>
        </div>
        <button className="export-btn">Exportar Relatório</button>
      </header>

      <div className="summary-cards">
        {/* Aqui eu exibo os cards de resumo com os totais gerais de receita, despesa e o saldo líquido */}
        <div className="stat-card income">
          <div className="card-icon">↓</div>
          <div className="card-info">
            <span className="label">Total Receitas</span>
            <p className="value">{formatCurrency(total?.receitaTotal ?? total?.ReceitaTotal ?? 0)}</p>
          </div>
        </div>

        <div className="stat-card expense">
          <div className="card-icon">↑</div>
          <div className="card-info">
            <span className="label">Total Despesas</span>
            <p className="value">{formatCurrency(total?.despesaTotal ?? total?.DespesaTotal ?? 0)}</p>
          </div>
        </div>

        <div className="stat-card balance">
          <div className="card-icon">∑</div>
          <div className="card-info">
            <span className="label">Saldo Líquido</span>
            <p className="value">{formatCurrency(total?.saldoLiquido ?? total?.SaldoLiquido ?? 0)}</p>
          </div>
        </div>
      </div>

      <div className="table-section">
        <div className="section-header">
          <h2>Totais por Pessoa</h2>
        </div>
        <table className="obsidian-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Receita</th>
              <th>Despesa</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {/* Aqui eu faço um mapeamento (map) da lista de pessoas para criar as linhas da tabela dinamicamente */}
            {listaPessoas.map((p: any) => {
              const r = p.totalReceita ?? p.TotalReceita ?? 0;
              const d = p.totalDespesa ?? p.TotalDespesa ?? 0;
              const s = p.saldo ?? p.Saldo ?? 0;

              return (
                <tr key={p.id ?? p.Id}>
                  <td className="person-name">{p.name ?? p.Name}</td>
                  <td className="text-income">{formatCurrency(r)}</td>
                  <td className="text-expense">{formatCurrency(d)}</td>
                  {/* Aqui eu aplico uma lógica visual: se o saldo for positivo fica verde, se for negativo fica vermelho */}
                  <td className={s >= 0 ? "text-income bold" : "text-expense bold"}>
                    {formatCurrency(s)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}