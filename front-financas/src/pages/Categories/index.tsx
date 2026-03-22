import { useEffect, useState } from "react";
import "./categories.css";
import { getCategories, createCategory, type Category } from "../../api/categoryService";

export function CategoriesPage() {
  // Aqui eu guardo a lista de categorias que vêm do banco e controlo os campos do formulário.
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState("");
  // Começo o select com "Despesa" por padrão, mas o usuário pode mudar.
  const [purpose, setPurpose] = useState<"Despesa" | "Receita" | "Ambas">("Despesa");
  const [error, setError] = useState("");

  // Aqui eu busco as categorias lá no meu backend em C#.
  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      // Aqui eu aviso o usuário se algo deu errado na hora de carregar a lista.
      setError("Erro ao carregar categorias.");
    }
  }

  // Assim que a tela termina de carregar, eu já peço para buscar as categorias.
  useEffect(() => { loadCategories(); }, []);

  // Aqui está a lógica para salvar uma nova categoria.
  async function handleAdd() {
    // Verifico se o usuário esqueceu de dar um nome para a categoria.
    if (!description) {
      setError("A descrição é obrigatória.");
      return;
    }

    try {
      setError("");
      // Aqui eu mando para o banco a descrição e a finalidade (se é receita, despesa ou ambas).
      await createCategory({
        description,
        purpose,
      });
      
      // Se deu tudo certo, eu limpo o campo de texto e atualizo a tabela na hora.
      setDescription("");
      loadCategories();
    } catch (err: any) {
      // Aqui eu mostro o erro que o meu backend devolveu (caso a regra de negócio seja quebrada).
      setError(err.response?.data || "Erro ao salvar categoria.");
    }
  }

  return (
    <div className="categories-container">
      <h1>Categorias</h1>

      {error && <div className="error-text"> {error}</div>}

      <div className="form">
        {/* Aqui o usuário digita o nome da categoria, tipo 'Mercado' ou 'Salário' */}
        <input
          placeholder="Descrição (ex: Alimentação, Investimentos)"
          value={description}
          maxLength={400}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Aqui eu permito que o usuário escolha a finalidade da categoria */}
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
          {/* Aqui eu percorro cada categoria cadastrada para montar as linhas da tabela */}
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.description}</td>
              <td>
                {/* Aqui eu uso uma classe dinâmica para pintar o 'badge' conforme o tipo (ex: verde para receita) */}
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