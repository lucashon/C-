import { useEffect, useState } from "react";
import "./persons.css";
import {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson,
  type Person,
} from "../../api/personService";

export function PersonsPage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function loadPersons() {
    try {
      const data = await getPersons();
      setPersons(data);
    } catch (err) {
      setError("Erro ao carregar a lista de pessoas.");
    }
  }

  useEffect(() => {
    loadPersons();
  }, []);

  async function handleSave() {
    if (!name || !age) {
      setError("Preencha o nome e a idade.");
      return;
    }

    try {
      setError("");
      if (editingId) {
        await updatePerson(editingId, { name, age: Number(age) });
        setEditingId(null);
      } else {
        await createPerson({ name, age: Number(age) });
      }
      setName("");
      setAge("");
      loadPersons();
    } catch (err: any) {
      const apiMessage = err.response?.data || "Erro ao processar requisição.";
      setError(apiMessage);
    }
  }

  function handleEdit(person: Person) {
    setError("");
    setName(person.name);
    setAge(String(person.age));
    setEditingId(person.id);
  }

  async function handleDelete(id: number) {
    if (confirm("Deseja realmente excluir esta pessoa e suas transações?")) {
      try {
        await deletePerson(id);
        loadPersons();
      } catch (err) {
        setError("Erro ao deletar pessoa.");
      }
    }
  }

  return (
    <div className="persons-container">
      <h1>Pessoas</h1>

      {error && (
        <div className="error-text">
          {error}
        </div>
      )}

      <div className="form">
        <input
          placeholder="Nome (máx 200)"
          value={name}
          maxLength={200}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button className="add-btn" onClick={handleSave}>
          {editingId ? "Salvar Alteração" : "Adicionar"}
        </button>

        {editingId && (
          <button
            className="cancel-btn"
            onClick={() => { setEditingId(null); setName(""); setAge(""); }}
          >
            Cancelar
          </button>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>
                <div className="actions-container">
                  <button className="edit-btn" onClick={() => handleEdit(p)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}