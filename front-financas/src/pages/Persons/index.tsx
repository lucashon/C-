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
  // Aqui eu defino os estados para controlar a lista de pessoas e os campos do formulário.
  const [persons, setPersons] = useState<Person[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  
  // Esse estado é importante: ele me diz se eu estou criando uma pessoa nova ou editando uma existente.
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Aqui eu busco a lista atualizada de pessoas lá no meu backend.
  async function loadPersons() {
    try {
      const data = await getPersons();
      setPersons(data);
    } catch (err) {
      setError("Erro ao carregar a lista de pessoas.");
    }
  }

  // Assim que a tela abre, eu chamo a função para listar todo mundo.
  useEffect(() => {
    loadPersons();
  }, []);

  // Aqui está a lógica principal de salvar: ela decide se vai dar um POST (novo) ou um PUT (editar).
  async function handleSave() {
    // Validação simples para não enviar campos vazios.
    if (!name || !age) {
      setError("Preencha o nome e a idade.");
      return;
    }

    try {
      setError("");
      if (editingId) {
        // Se eu tiver um ID em edição, eu chamo o update para atualizar os dados.
        await updatePerson(editingId, { name, age: Number(age) });
        setEditingId(null);
      } else {
        // Se não tiver ID, eu chamo o create para cadastrar uma pessoa nova.
        await createPerson({ name, age: Number(age) });
      }
      
      // Depois de salvar, eu limpo os campos e atualizo a tabela.
      setName("");
      setAge("");
      loadPersons();
    } catch (err: any) {
      // Aqui eu pego a mensagem de erro que vem direto do meu backend em C#.
      const apiMessage = err.response?.data || "Erro ao processar requisição.";
      setError(apiMessage);
    }
  }

  // Aqui eu preparo o formulário para edição: eu preencho os campos com os dados da pessoa selecionada.
  function handleEdit(person: Person) {
    setError("");
    setName(person.name);
    setAge(String(person.age));
    setEditingId(person.id);
  }

  // Aqui eu faço a exclusão: primeiro eu confirmo com o usuário para evitar cliques acidentais.
  async function handleDelete(id: number) {
    if (confirm("Deseja realmente excluir esta pessoa e suas transações?")) {
      try {
        await deletePerson(id);
        loadPersons(); // Atualizo a lista para refletir a exclusão.
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
        {/* Aqui eu vinculo o valor dos inputs com os estados do React (Controlled Components) */}
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

        {/* Aqui o botão muda de texto dinamicamente dependendo se estou editando ou adicionando */}
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
          {/* Aqui eu percorro a lista de pessoas e crio as linhas da tabela com os botões de ação */}
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