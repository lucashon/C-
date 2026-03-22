# 💰 Obsidian | Financial Control System

<p align="center">
  <img src="https://img.shields.io/badge/Full--Stack-Project-blueviolet?style=for-the-badge" alt="Fullstack">
  <img src="https://img.shields.io/badge/.NET-8.0-512bd4?style=for-the-badge&logo=dotnet" alt=".NET">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TS">
</p>

---

## 📝 Sobre o Projeto
Aplicação **Full-stack** moderna para gerenciamento de finanças domésticas. O sistema permite o controle rigoroso de transações, vinculando moradores às suas respectivas receitas e despesas com cálculos automáticos de saldo em tempo real.

### ✨ Diferenciais
- **Tema Obsidian**: Interface Dark mode elegante e intuitiva.
- **Arquitetura desacoplada**: Backend C# robusto e Frontend React veloz.
- **Zero Database Setup**: Utiliza persistência JSON para facilitar o teste imediato.

---

## 🚀 Tecnologias e Ferramentas

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Backend** | `.NET 8 / C#` | API RESTful com roteamento avançado. |
| **Frontend** | `React + Vite` | SPA (Single Page Application) de alta performance. |
| **Linguagem** | `TypeScript` | Tipagem estática para evitar erros em runtime. |
| **API Client** | `Axios` | Gerenciamento de requisições assíncronas. |
| **Docs** | `Swagger` | Documentação interativa dos endpoints. |

---

## ⚙️ Regras de Negócio Implementadas

> [!IMPORTANT]
> O sistema foi projetado seguindo diretrizes reais de validação financeira.

- **👤 Gestão de Pessoas**: CRUD completo com **exclusão em cascata** (deletar uma pessoa remove suas transações).
- **🔞 Restrição de Idade**: Menores de 18 anos são impedidos de registrar **Receitas**, permitindo apenas **Despesas**.
- **📊 Dashboard**: Consolidação automática de dados (Total Receita, Total Despesa e Saldo Líquido).
- **🏷️ Compatibilidade**: Validação de categorias para garantir que tipos de transação coincidam.

---

## 📂 Estrutura de Pastas

```bash
├── 📁 FinancasApi             # Servidor C# .NET
│   ├── 📁 Controllers         # Rotas da API
│   ├── 📁 Models              # Modelagem de dados
│   └── 📄 database.json       # Persistência local
└── 📁 front-financas          # Cliente React
    ├── 📁 src/api             # Integração Axios
    └── 📁 src/pages           # Telas (Dashboard, Persons, etc.)


Funcionalidades & Regras de Negócio
 Gestão de Pessoas
CRUD Completo: Criar, listar, editar (PUT) e deletar.

Cascata: Ao deletar uma pessoa, todas as suas transações são removidas automaticamente.

Validação: Nome obrigatório com limite de 200 caracteres.

 Dashboard Inteligente
Totais por Pessoa: Listagem detalhada de Receitas, Despesas e Saldo individual.

Consolidado Geral: Cálculo automático de Receita Total, Despesa Total e Saldo Líquido da residência.

Feedback Visual: Cores dinâmicas para saldos positivos (receita) e negativos (despesa).

 Regras de Validação
 Menores de idade: Usuários com idade < 18 anos são restritos apenas a lançamentos de Despesas.

 Valores: Transações permitem apenas valores positivos.

 Compatibilidade: A categoria escolhida deve ser compatível com o tipo da transação (Receita/Despesa).

 Como rodar o projeto
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

 Integração
O frontend está configurado para consumir a API via Axios na porta 5035. Caso precise alterar o endereço da API, verifique o arquivo src/api/axios.ts.

Desenvolvido por Lucas Honorio 
