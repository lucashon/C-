import axios from "axios";

// Configuração centralizada do Axios:
// Aqui eu criei uma instância padrão da API para não precisar repetir o endereço do servidor
// em todos os arquivos de serviço (PersonService, TransactionService, etc.).
export const api = axios.create({
  // Aqui eu defini a URL base onde o meu backend em .NET está rodando.
  // Se eu precisar mudar o servidor um dia, eu só altero aqui e o sistema todo se atualiza.
  baseURL: "http://localhost:5035/api",
});

// Essa instância 'api' agora vai ser exportada para ser usada em toda a comunicação
// entre o meu Frontend (React) e o meu Backend (C#).