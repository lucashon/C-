import { useEffect, useState } from "react";
import "./categories.css";
import { getCategories, createCategory, type Category } from "../../api/categoryService";

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState<"Despesa" | "Receita" | "Ambas">("Despesa");
  const [error, setError] = useState("");

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError("Erro ao carregar categorias.");
    }
  }

  useEffect(() => { loadCategories(); }, []);

  async function handleAdd() {
    if (!description) {
      setError("A descrição é obrigatória.");
      return;
    }

    try {
      setError("");
      await createCategory({
        description,
        purpose,
      });
      setDescription("");
      loadCategories();
    } catch (err: any) {
      setError(err.response?.data || "Erro ao salvar categoria.");
    }
  }

  return (
    <div className="categories-container">
      <h1>Categorias</h1>

      {error && <div className="error-text"> {error}</div>}

      <div className="form">
        <input
          placeholder="Descrição (ex: Alimentação, Investimentos)"
          value={description}
          maxLength={400}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value as any)}
        >
          <option value="Despesa">Despesa</option>
          <option value="Receita">Receita</option>
          <option value="Ambas">Ambas</option>
        </select>

        <button className="add-btn" onClick={handleAdd}>+ Nova Categoria</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Finalidade</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.description}</td>
              <td>
                <span className={`badge ${c.purpose.toLowerCase()}`}>
                  {c.purpose}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}