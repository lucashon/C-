import { api } from "./axios";

export interface Category {
  id: number;
  description: string;
  purpose: "Receita" | "Despesa" | "Ambas";
}

export async function getCategories() {
  const response = await api.get<Category[]>("/categories");
  return response.data;
}

export async function createCategory(data: Omit<Category, "id">) {
  const response = await api.post<Category>("/categories", data);
  return response.data;
}