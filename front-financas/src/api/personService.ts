import { api } from "./axios";

export interface Person {
  id: number;
  name: string;
  age: number;
}

// LISTAR
export async function getPersons() {
  // Aqui eu busco todos os moradores que estão cadastrados no sistema.
  const response = await api.get<Person[]>("/persons");
  return response.data;
}

// CRIAR
export async function createPerson(data: Omit<Person, "id">) {
  // Aqui eu cadastro uma nova pessoa no sistema passando nome e idade.
  const response = await api.post<Person>("/persons", data);
  return response.data;
}

// ATUALIZAR
export async function updatePerson(id: number, data: Omit<Person, "id">) {
  // Aqui eu faço a lógica de edição. Eu mando o ID da pessoa que quero mudar 
  // e passo os novos dados para atualizar o registro lá no banco JSON.
  const response = await api.put(`/persons/${id}`, data);
  return response.data;
}

// DELETAR
export async function deletePerson(id: number) {
  // Aqui eu retiro uma pessoa do sistema pelo ID dela.
  // Vale lembrar que o meu backend já remove todas as transações dela automaticamente (em cascata).
  await api.delete(`/persons/${id}`);
}