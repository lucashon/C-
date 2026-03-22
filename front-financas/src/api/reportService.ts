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
  const response = await api.get("/reports/persons");
  return response.data;
};