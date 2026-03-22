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
  // Aqui eu busco a lista completa de todas as transações (gastos e ganhos) que salvei no banco
  const response = await api.get<Transaction[]>("/transactions");
  return response.data;
}

// CRIAR
export async function createTransaction(
  data: Omit<Transaction, "id">
) {
  // Aqui eu envio para o meu backend os dados de uma nova transação que o usuário preencheu
  // Não envio o ID, pois o meu C# gera ele automaticamente lá no servidor
  const response = await api.post("/transactions", data);
  return response.data;
}