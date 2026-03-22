import { api } from "./axios";

export interface Person {
  id: number;
  name: string;
  age: number;
}

// LISTAR
export async function getPersons() {
  const response = await api.get<Person[]>("/persons");
  return response.data;
}

// CRIAR
export async function createPerson(data: Omit<Person, "id">) {
  const response = await api.post<Person>("/persons", data);
  return response.data;
}

// ATUALIZAR
export async function updatePerson(id: number, data: Omit<Person, "id">) {
  const response = await api.put(`/persons/${id}`, data);
  return response.data;
}

// DELETAR
export async function deletePerson(id: number) {
  await api.delete(`/persons/${id}`);
}