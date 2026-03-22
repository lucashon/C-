import { useEffect, useState } from "react";
import "./transactions.css";
import { getPersons, type Person } from "../../api/personService";
import { getCategories, type Category } from "../../api/categoryService";
import { getTransactions, createTransaction, type Transaction } from "../../api/transactionService";

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<"Receita" | "Despesa">("Despesa");
  const [personId, setPersonId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");

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

  async function handleSave() {
    if (!description || !value || !personId || !categoryId) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setError("");
      await createTransaction({
        description,
        value: Number(value),
        type,
        personId: Number(personId),
        categoryId: Number(categoryId),
      });

      setDescription("");
      setValue("");
      loadData();
    } catch (err: any) {
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

        <select value={personId} onChange={(e) => setPersonId(e.target.value)}>
          <option value="">Selecione a Pessoa</option>
          {persons.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

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
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.description}</td>
              <td className={t.type === "Receita" ? "value-income" : "value-expense"}>
                R$ {t.value.toFixed(2)}
              </td>
              <td>{t.type}</td>
              <td>{persons.find(p => p.id === t.personId)?.name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}