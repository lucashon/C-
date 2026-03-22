Sistema de Controle de Gastos Residenciais
Aplicação Full-stack moderna para gerenciamento de finanças domésticas. O sistema permite o controle rigoroso de transações, vinculando moradores às suas respectivas receitas e despesas com cálculos automáticos de saldo em tempo real.

🚀 Tecnologias Utilizadas
Backend
C# / .NET 8: Framework principal.

ASP.NET Core Web API: Arquitetura de rotas.

System.Text.Json: Persistência de dados em arquivo JSON (Banco de dados leve).

Swagger/OpenAPI: Documentação e testes de endpoints.

Frontend
React 18: Biblioteca UI.

TypeScript: Tipagem estática para maior segurança.

Axios: Consumo da API REST.

Vite: Ferramenta de build ultra-rápida.

CSS3: Estilização customizada (Tema Dark/Obsidian).
# 💰 Obsidian | Sistema de Controle de Gastos Residenciais

Aplicação Full-stack moderna para gerenciamento de finanças domésticas. O sistema permite o controle rigoroso de transações, vinculando moradores às suas respectivas receitas e despesas com cálculos automáticos de saldo em tempo real.

---

## 🚀 Tecnologias Utilizadas

### **Backend**
- **C# / .NET 8**: Framework principal.
- **ASP.NET Core Web API**: Arquitetura de rotas RESTful.
- **System.Text.Json**: Persistência de dados em arquivo JSON (Banco de dados leve).
- **Swagger/OpenAPI**: Documentação e testes de endpoints.

### **Frontend**
- **React 18**: Biblioteca de interface.
- **TypeScript**: Tipagem estática para robustez do código.
- **Axios**: Cliente HTTP para consumo da API.
- **Vite**: Ferramenta de build e desenvolvimento.
- **CSS3**: Estilização customizada com tema Dark/Obsidian.

---

## 📂 Estrutura do Projeto

```bash
├── /FinancasApi             # Backend 
│   ├── Controllers/         # Endpoints 
│   ├── Data/                # Lógica de persistência (JsonDb)
│   ├── Models/              # Classes de Entidade (Person, Transaction, Category)
│   └── database.json        # Armazenamento dos dados em JSON
│
└── /front-financas          # Frontend 
    ├── src/
    │   ├── api/             # Services 
    │   ├── pages/           # Views 
    │   ├── components/      # Layout, Sidebar e UI
    │   └── routes/          # Gerenciamento de rotas 
    └── public/              # Ativos estáticos 



⚙️ Funcionalidades & Regras de Negócio
👤 Gestão de Pessoas
CRUD Completo: Criar, listar, editar (PUT) e deletar.

Cascata: Ao deletar uma pessoa, todas as suas transações são removidas automaticamente.

Validação: Nome obrigatório com limite de 200 caracteres.

📊 Dashboard Inteligente
Totais por Pessoa: Listagem detalhada de Receitas, Despesas e Saldo individual.

Consolidado Geral: Cálculo automático de Receita Total, Despesa Total e Saldo Líquido da residência.

Feedback Visual: Cores dinâmicas para saldos positivos (receita) e negativos (despesa).

🧠 Regras de Validação
🔞 Menores de idade: Usuários com idade < 18 anos são restritos apenas a lançamentos de Despesas.

💰 Valores: Transações permitem apenas valores positivos.

🏷️ Compatibilidade: A categoria escolhida deve ser compatível com o tipo da transação (Receita/Despesa).

▶️ Como rodar o projeto
1. Backend (API)
Bash
cd FinancasApi
dotnet restore
dotnet run
Acesse a documentação: http://localhost:5035/swagger

2. Frontend (Web)
Bash
cd front-financas
npm install
npm run dev
Acesse a aplicação: http://localhost:5173

🔗 Integração
O frontend está configurado para consumir a API via Axios na porta 5035. Caso precise alterar o endereço da API, verifique o arquivo src/api/axios.ts.

Desenvolvido por Lucas Honorio 