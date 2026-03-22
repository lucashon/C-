import { useEffect, useState } from "react";
import "./transactions.css";
import { getPersons, type Person } from "../../api/personService";
import { getCategories, type Category } from "../../api/categoryService";
import { getTransactions, createTransaction, type Transaction } from "../../api/transactionService";

export function TransactionsPage() {
  // Aqui eu gerencio os estados da lista principal e também os dados que alimentam os selects (Pessoas e Categorias).
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Estados para capturar cada campo do formulário de lançamento.
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<"Receita" | "Despesa">("Despesa");
  const [personId, setPersonId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");

  // Aqui eu uso uma lógica bem eficiente: busco Transações, Pessoas e Categorias ao mesmo tempo.
  // O Promise.all garante que a tela só carregue quando eu tiver todas as informações necessárias.
  async function loadData() {
    try {
      const [t, p, c] = await Promise.all([
        getTransactions(),
        getPersons(),
        getCategories(),
      ]);
      setTransactions(t);
      setPersons(p);
      setCategories(c);
    } catch (err) {
      setError("Erro ao carregar dados.");
    }
  }

  useEffect(() => { loadData(); }, []);

  // Aqui eu faço o lançamento da transação.
  async function handleSave() {
    // Verificação básica para garantir que o usuário preencheu todos os campos obrigatórios.
    if (!description || !value || !personId || !categoryId) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setError("");
      // Aqui eu converto os textos dos inputs para Números e envio para o meu backend salvar no JSON.
      await createTransaction({
        description,
        value: Number(value),
        type,
        personId: Number(personId),
        categoryId: Number(categoryId),
      });

      // Limpo os campos de texto após o sucesso e atualizo a lista na tela.
      setDescription("");
      setValue("");
      loadData();
    } catch (err: any) {
      // Se houver erro (como a regra de menores de 18 anos não poderem lançar receita),
      // o erro que eu escrevi lá no C# vai aparecer aqui para o usuário.
      setError(err.response?.data || "Erro ao salvar transação.");
    }
  }

  return (
    <div className="transactions-container">
      <h1>Transações</h1>

      {error && <div className="error-text">{error}</div>}

      <div className="form">
        <input
          placeholder="Descrição (máx 400)"
          value={description}
          maxLength={400}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Valor"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value as "Receita" | "Despesa")}>
          <option value="Receita">Receita</option>
          <option value="Despesa">Despesa</option>
        </select>

        {/* Aqui eu percorro a lista de pessoas para montar as opções do select dinamicamente */}
        <select value={personId} onChange={(e) => setPersonId(e.target.value)}>
          <option value="">Selecione a Pessoa</option>
          {persons.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        {/* O mesmo eu faço aqui para as categorias cadastradas */}
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Categoria</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.description}</option>
          ))}
        </select>

        <button className="add-btn" onClick={handleSave}>Lançar</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Pessoa</th>
          </tr>
        </thead>
        <tbody>
          {/* Aqui eu listo as transações e uso uma lógica de CSS: verde para Receita e vermelho para Despesa */}
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.description}</td>
              <td className={t.type === "Receita" ? "value-income" : "value-expense"}>
                R$ {t.value.toFixed(2)}
              </td>
              <td>{t.type}</td>
              {/* Aqui eu faço uma busca rápida na lista de pessoas para mostrar o NOME em vez de apenas o ID */}
              <td>{persons.find(p => p.id === t.personId)?.name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}