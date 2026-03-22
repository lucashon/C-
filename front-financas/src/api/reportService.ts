import { api } from "./axios";

export interface ReportData {
  pessoas: {
    id: number;
    name: string;
    age: number;
    totalReceita: number;
    totalDespesa: number;
    saldo: number;
  }[];
  totalGeral: {
    receita: number;
    despesa: number;
    saldo: number;
  };
}

export const getReport = async (): Promise<ReportData> => {
  // Aqui eu busco os dados processados do meu Dashboard,
  // Essa rota é especial porque o meu backend já faz toda a lógica de soma e subtração lá,
  // Aqui eu só recebo o resultado final com os saldos individuais e o total geral da casa.
  const response = await api.get("/reports/persons");
  return response.data;
};