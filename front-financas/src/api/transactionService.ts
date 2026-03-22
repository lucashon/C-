import { api } from "./axios";

export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: "Receita" | "Despesa";
  categoryId: number;
  personId: number;
}

// LISTAR
export async function getTransactions() {
  const response = await api.get<Transaction[]>("/transactions");
  return response.data;
}

// CRIAR
export async function createTransaction(
  data: Omit<Transaction, "id">
) {
  const response = await api.post("/transactions", data);
  return response.data;
}