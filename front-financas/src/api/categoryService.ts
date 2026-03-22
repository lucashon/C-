import { api } from "./axios";

export interface Category {
  id: number;
  description: string;
  purpose: "Receita" | "Despesa" | "Ambas";
}

// LISTAR
export async function getCategories() {
  // Aqui eu busco todas as categorias que cadastrei (ex: Alimentação, Salário, etc.).
  // É com essa lista que eu preencho os campos de seleção nos formulários do sistema.
  const response = await api.get<Category[]>("/categories");
  return response.data;
}

// CRIAR
export async function createCategory(data: Omit<Category, "id">) {
  // Aqui eu crio uma nova categoria no sistema. 
  // Eu defino a descrição e se ela serve para 'Receita', 'Despesa' ou para 'Ambas' (como 'Outros').
  // A lógica de gerar o próximo ID e salvar no JSON acontece lá no meu código C#.
  const response = await api.post<Category>("/categories", data);
  return response.data;
}