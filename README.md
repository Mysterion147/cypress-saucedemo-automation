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

## ⚙️ CI/CD & E2E Testing Automation
This project utilizes **GitHub Actions** to ensure UI quality and critical flow integrity through end-to-end (E2E) testing.

* **Continuous Integration (CI):** The pipeline is triggered on every push, performing Node.js environment setup, dependency installation via `npm ci`, and executing tests in *headless* mode.
* **Mochawesome Reporting:** After execution, the `test:report` script is triggered to consolidate results into a static HTML report.
* **Continuous Delivery (CD):** The final artifact is automatically delivered via **GitHub Pages**, allowing for result visualization without the need for local execution.

### 📊 E2E Execution Report
You can track the status of the latest execution and the details of each test scenario here:
[**View Live Cypress Report 📈**](https://mysterion147.github.io/cypress-saucedemo-automation/e2e-tests/)

## 🚀 Run Locally
To run the tests and generate the report on your machine:

1. **Install Dependencies:**
   ```bash
   npm install
2. **Abrir o Cypress (Interface Gráfica):**
   ```bash
   npx cypress open
3. **Rodar Testes e Gerar Relatório (CLI):**
   ```bash
   npm run test:report

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

## ⚙️ CI/CD & Automação de Testes E2E
Este projeto utiliza **GitHub Actions** para garantir a qualidade da interface e dos fluxos críticos através de testes de ponta a ponta (E2E).

* **Integração Contínua (CI):** O pipeline é disparado a cada push, realizando o setup do ambiente Node.js, instalação de dependências via `npm ci` e execução dos testes em modo *headless*.
* **Relatórios Mochawesome:** Após a execução, o script `test:report` é acionado para consolidar os resultados em um relatório HTML estático.
* **Continuous Delivery (CD):** O artefato final é entregue automaticamente via **GitHub Pages**, permitindo a visualização dos resultados sem a necessidade de execução local.

### 📊 Relatório de Execução E2E
Você pode acompanhar o status da última execução e os detalhes de cada cenário de teste aqui:
[**Visualizar Relatório Cypress 📈**](https://mysterion147.github.io/cypress-saucedemo-automation/e2e-tests/)

## 🚀 Executar Localmente
Para rodar os testes e gerar o relatório em sua máquina:

1. **Instalar Dependências:**
   ```bash
   npm install
2. **Abrir o Cypress (Interface Gráfica):**
   ```bash
   npx cypress open
3. **Rodar Testes e Gerar Relatório (CLI):**
   ```bash
   npm run test:report

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


## 🧪 Cenários de Teste Cobertos
- **Autenticação:** Login com diferentes perfis de usuário, validações de mensagens de erro e funcionalidade de logout.
- **Inventário:** Validação de ordenação dinâmica (A-Z, Z-A, Preço) e fluxos de navegação.
- **Fluxo de Checkout Completo:**
    - Adição dinâmica de itens e persistência de dados.
    - **Cálculo de Auditoria:** Verificação matemática automatizada de Taxa (Tax) e Total.
    - Validação de erros do formulário e mensagens de sucesso de pedido.

---
**Developed by João Pedro Maciel de Souza**
