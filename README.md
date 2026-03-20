![Cypress](https://img.shields.io/badge/-Cypress-%2317202C?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

# SauceDemo Automation Suite (CI/CD Ready✅)
> Projeto de automação E2E de alta performance utilizando Cypress, Page Object Model (POM) e relatórios dinâmicos.
> 
> High-performance end-to-end automation project using Cypress, Page Object Model (POM), and dynamic reporting.

[Leia em Português<img src="https://flagcdn.com/w20/br.png" width="20">](#versão-em-português) | [Read in English<img src="https://flagcdn.com/w20/us.png" width="20">](#english-version)

---

### English version

This repository contains a Cypress automated test suite for the [SauceDemo](https://www.saucedemo.com/) website, focused on demonstrating QA engineering best practices, scalability, and code maintainability.

## ⭐ Interactive Report
If you simply wish to view the latest test execution results online you can do it here:
[View Live Report](https://Mysterion147.github.io/cypress-saucedemo-automation/cypress/reports-html/index.html)

## 🛠️ Technologies and Tools
* **Framework:** [Cypress](https://www.cypress.io/) (v15+)
* **Language:** JavaScript
* **Design Pattern:** Page Object Model (POM)
* **Reporting:** Mochawesome (HTML + JSON)
* **Data Management:** Fixtures (JSON)
* **Compatibility:** Universal scripts (Windows/Linux) via `rimraf`

## 🏗️ Project Architecture
The project utilizes separation of concerns to ensure tests are easy to read and maintain.

```text
cypress/
├── e2e/                     # Test scripts (.cy.js)
├── fixtures/                # Data sets (users.json, customers.json)
├── support/
│   ├── page_objects/        # POM Classes (Login, Inventory, Checkout)
│   └── commands.js          # Custom commands (cy.login)
├── reports/                 # Raw test data (JSON)
└── reports-html/            # Consolidated visual report (HTML)
```

## 🚀 How to Run

### 1. Installation
Clone the repository and install the dependencies:
```bash
git clone [https://github.com/Mysterion147/cypress-saucedemo-automation.git](https://github.com/Mysterion147/cypress-saucedemo-automation.git)
cd cypress-saucedemo-automation
npm install
```

### 2. Running Tests
* **Headless Mode with Automatic Reporting (Recommended):**
  ```bash
  npm run test:report
  ```
* **Interactive Mode (Cypress UI):**
  ```bash
  npx cypress open
  ```

## 📊 Execution Reports
The project uses a processing pipeline that clears previous runs, executes the tests, and generates a visual dashboard:

* **Report Location:** `cypress/reports-html/index.html`
* **Features:** Status filters (Pass/Fail), execution time, error details, and integrated screenshots.
<img width="1860" height="915" alt="image" src="https://github.com/user-attachments/assets/ff280a2c-200d-46d1-baae-f23efbd23087" />


## 🧪 Covered Test Scenarios
- **Authentication:** Login with different user profiles, error message validations and Logout funcionality.
- **Inventory:** Validation of dynamic sorting (A-Z, Z-A, Price) and navigation flows.
- **Full Checkout Flow:**
    - Dynamic item addition and data persistence.
    - **Audit Calculation:** Automated mathematical verification of Tax and Total.
    - Form errors validation and order success messages.

---

### Versão em Português

Este repositório contém uma suíte de testes automatizados com Cypress para o site [SauceDemo](https://www.saucedemo.com/), focada em demonstrar boas práticas de engenharia de QA, escalabilidade e manutenção de código.

## ⭐ Relatório Interativo
Se você simplesmente deseja visualizar o último relatório de execução de testes online acesse este link:
[View Live Report](https://Mysterion147.github.io/cypress-saucedemo-automation/cypress/reports-html/index.html)

## 🛠️ Tecnologias e Ferramentas
* **Framework:** [Cypress](https://www.cypress.io/) (v15+)
* **Linguagem:** JavaScript
* **Padrão de Projeto:** Page Object Model (POM)
* **Relatórios:** Mochawesome (HTML + JSON)
* **Gerenciamento de Dados:** Fixtures (JSON)
* **Compatibilidade:** Scripts universais (Windows/Linux) via `rimraf`

## 🏗️ Arquitetura do Projeto
O projeto utiliza a separação de responsabilidades para garantir que os testes sejam fáceis de ler e manter.



```text
cypress/
├── e2e/                     # Scripts de teste (.cy.js)
├── fixtures/                # Massas de dados (users.json, customers.json)
├── support/
│   ├── page_objects/        # Classes POM (Login, Inventory, Checkout)
│   └── commands.js          # Comandos customizados (cy.login)
├── reports/                 # Dados brutos dos testes (JSON)
└── reports-html/            # Relatório visual consolidado (HTML)
```

## 🚀 Como Executar

### 1. Instalação
Clone o repositório e instale as dependências:
```bash
git clone [https://github.com/seu-usuario/cypress-saucedemo-automation.git](https://github.com/seu-usuario/cypress-saucedemo-automation.git)
cd cypress-saucedemo-automation
npm install
```

### 2. Executando os Testes
* **Modo Headless com Relatório Automático (Recomendado):**
  ```bash
  npm run test:report
  ```
* **Modo Interativo (Interface do Cypress):**
  ```bash
  npx cypress open
  ```

## 📊 Relatórios de Execução
O projeto utiliza uma esteira de processamento que limpa execuções anteriores, roda os testes e gera um dashboard visual:

* **Localização do Relatório:** `cypress/reports-html/index.html`
* **Funcionalidades:** Filtros de status (Pass/Fail), tempo de execução, detalhes do erro e screenshots integrados.
<img width="1860" height="915" alt="image" src="https://github.com/user-attachments/assets/ff280a2c-200d-46d1-baae-f23efbd23087" />


## 🧪 Cenários de Teste Cobertos
- **Autenticação:** Login com diferentes perfis de usuário, validações de mensagens de erro e funcionalidade de logout.
- **Inventário:** Validação de ordenação dinâmica (A-Z, Z-A, Preço) e fluxos de navegação.
- **Fluxo de Checkout Completo:**
    - Adição dinâmica de itens e persistência de dados.
    - **Cálculo de Auditoria:** Verificação matemática automatizada de Taxa (Tax) e Total.
    - Validação de erros do formulário e mensagens de sucesso de pedido.

---
**Developed by João Pedro Maciel de Souza** *Software Development Engineer in Test (SDET) | QA Automation*
