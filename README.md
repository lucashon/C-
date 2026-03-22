# | Financial Control System

<p align="center">
  <img src="https://img.shields.io/badge/Full--Stack-Project-blueviolet?style=for-the-badge" alt="Fullstack">
  <img src="https://img.shields.io/badge/.NET-8.0-512bd4?style=for-the-badge&logo=dotnet" alt=".NET">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TS">
</p>

---

## Sobre o Projeto:
Aplicação **Full-stack** moderna para gerenciamento de finanças domésticas. O sistema permite o controle rigoroso de transações, vinculando moradores às suas respectivas receitas e despesas com cálculos automáticos de saldo em tempo real.

### Diferenciais
- **Tema Obsidian**: Interface Dark mode elegante e intuitiva.
- **Arquitetura desacoplada**: Backend C# robusto e Frontend React veloz.
- **Zero Database Setup**: Utiliza persistência JSON para facilitar o teste imediato.

---

## Tecnologias e Ferramentas

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

- ** Gestão de Pessoas**: CRUD completo com **exclusão em cascata** (deletar uma pessoa remove suas transações).
- ** Restrição de Idade**: Menores de 18 anos são impedidos de registrar **Receitas**, permitindo apenas **Despesas**.
- ** Dashboard**: Consolidação automática de dados (Total Receita, Total Despesa e Saldo Líquido).
- ** Compatibilidade**: Validação de categorias para garantir que tipos de transação coincidam.

## Funcionalidades & Regras de Negócio: 

### Gestão de Pessoas
- **CRUD Completo**: Interface intuitiva para criar, listar, **editar (PUT)** e deletar registros.
- ** Exclusão em Cascata**: Sistema de segurança que remove automaticamente todas as transações vinculadas ao excluir uma pessoa.
- ** Validação de Entrada**: Nome obrigatório com limitação técnica de 200 caracteres para integridade do banco.

### Dashboard Inteligente
- ** Visão Individual**: Listagem detalhada com cálculos automáticos de Receitas, Despesas e Saldo por morador.
- ** Consolidado Geral**: Painel superior com o balanço total da residência (Receita Total - Despesa Total).
- ** Feedback Visual**: UI dinâmica com indicadores de cores (Verde para Saldo Positivo | Vermelho para Saldo Negativo).

### Regras de Validação (Business Logic)
> [!TIP]
> O sistema implementa regras rigorosas para garantir a consistência financeira.

- ** Proteção de Menores**: Usuários com idade inferior a 18 anos são restritos apenas a lançamentos de **Despesas**.
- ** Integridade Monetária**: Bloqueio de valores negativos; todas as transações devem possuir valor real positivo.
- ** Vínculo de Categoria**: Inteligência que valida se a categoria selecionada é compatível com o tipo da transação (Receita/Despesa).

---


🔧 1. Backend (API)
Abra o terminal na pasta raiz e execute:

Bash
cd FinancasApi
dotnet restore
dotnet run
Documentação Swagger: http://localhost:5035/swagger

2. Frontend (Web)
Em um novo terminal, execute:

Bash
cd front-financas
npm install
npm run dev
Aplicação Web: http://localhost:5173

Integração & API :
O frontend utiliza Axios para comunicação assíncrona com a API na porta 5035.

Para ajustes de ambiente, verifique o arquivo: src/api/axios.ts

<p align="center">
<b>Desenvolvido com dedicação por Lucas Honorio</b> 
</p>


## 📂 Estrutura de Pastas
```bash
├── 📁 FinancasApi             # Servidor C# .NET
│   ├── 📁 Controllers         # Rotas da API
│   ├── 📁 Models              # Modelagem de dados
│   └── 📄 database.json       # Persistência local
└── 📁 front-financas          # Cliente React
    ├── 📁 src/api             # Integração Axios
    └── 📁 src/pages           # Telas (Dashboard, Persons, etc.)
