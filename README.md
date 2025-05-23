# Teste Técnico - QA-Automation

## Pré-requisitos
- Node.js instalado na máquina.

## Instalação
Clone o repositório e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
npm init -y
npm install --save-dev
```

## Executando os Testes
Para abrir o painel do Cypress e executar os testes:

```bash
npm run cy:open
```

### Passos no Cypress:
1. Clique em **Continue**.
2. Selecione **E2E Testing**.
3. Escolha o navegador desejado.
4. Clique em **Start E2E Testing**.
5. Selecione e execute o teste desejado.

## Estrutura dos Testes

### Testes de UI

**Telas testadas:**

- **Tela de Login:** 6 cenários (erros e sucesso).
- **Tela Inicial do Administrador:** 6 cenários.

> Observação: Para testes de login bem-sucedido e acesso à tela inicial do administrador, é necessário que o usuário esteja previamente cadastrado. A criação do usuário é realizada automaticamente antes da execução desses testes.

### Testes de API

**Endpoints testados:**

- `POST /produtos`: 16 testes realizados.
- `GET /produtos`: 12 testes realizados.

**Dependências para criação de produtos:**
- Criar usuário.
- Realizar login.
- Obter token.
- Criar produto.

**Dependências para busca de produtos:**
- Criar usuário.
- Realizar login.
- Obter token.
- Criar produto.
- Buscar produto.

## Organização dos Testes de Produto

### `produtosSemDependencias/`
Testes devem ser executados manualmente na seguinte ordem:
- **Buscar Produto:** Criar Usuário → Login → Criar Produto → Buscar Produto.
- **Criar Produto:** Criar Usuário → Login → Criar Produto.

### `produtosComDependencias/`
Testes com dependências incluídas são executados automaticamente.

> Erros Esperados:
- Tentativa de cadastro de produto já existente.
- Tentativa de cadastro de usuário já existente.

## Técnicas e Padrões Utilizados
- **Pairwise Testing:** Aplicado nos testes de API para reduzir a quantidade de cenários necessários (mais de 200 combinações foram otimizadas).
- **Page Object Model (POM):** Utilizado nos testes de UI.
- **Fixtures:** Utilizadas em testes de UI e API para centralizar dados de entrada.
- **Custom Commands:** Criados para reutilização de fluxos comuns em testes de UI e API.
