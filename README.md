# Senior-QA-Automation
Teste Técnico

Pré-requesitos:
  É necessário ter o Node.js instalado.
  https://nodejs.org/en/download

  Instalação
    Clone o repositório e instale as dependências:
      git clone <URL_DO_REPOSITORIO>
      cd <nome-da-pasta>
      npm init -y
      npm install --save-dev
  
  Executando os Testes
    Para abrir o painel do Cypress, execute:
      npm run cy:open

  Siga os passos abaixo:
    Clique em Continue no painel do Cypress.
    Selecione a opção E2E Testing.
    Escolha o navegador de sua preferência.
    Clique em Start E2E Testing.
    Escolha e execute o teste desejado.
    Escolha o teste que queira rodar, clique nele.

  Estrutura dos Testes
    Testes de UI
      Telas testadas:
      Tela de Login: 6 cenários testados (erros e sucesso).
      Tela Inicial do Administrador: 6 cenários testados.
      
  Para os testes de login com sucesso e tela inicial do administrador, é necessário um usuário previamente cadastrado. 
  Por isso, a criação do usuário é tratada antes do teste.

  Testes de API
    Endpoints testados:
    POST /produtos: 16 testes realizados.
    GET /produtos: 12 testes realizados.

  Dependencias
  Para testar a criação de produtos é necessário:
    Criar um usuário.
    Realizar login.
    Obter o token.
    Criar o produto.

  Para os testes de busca por produtos:
  Um produto deve já existir na basen então é necessário:
    Criar um usuário.
    Realizar login.
    Obter o token.
    Criar o produto.
    Buscar pelo produto.

  Organização dos testes de produto:
  Pasta produtosSemDependencias
    Os testes devem ser executados manualmente em ordem:
    Buscar Produto: Criar Usuário > Login > Criar Produto > Buscar Produto.
    Criar Produto: Criar Usuário > Login > Criar Produto.

  Pasta ProdutosComDependencias
    Os testes são executados automaticamente com todas as dependências incluídas.

  Erros esperados:
    Os únicos erros que podem ocorrer são tentativas de cadastrar:
      Um produto já existente.
      Um usuário já existente.

  Técnicas e Padrões Utilizados
    Pairwise Testing: Utilizei nos testes de API, por conta que se fosse testar todos os cenários, dariam mais de 200 testes por endpoint
    Page Object Model (POM): Utilizei nos testes de UI.
    Fixtures: Utilizei em UI e API.
    Commands: Utilizei em UI e API.

Bons testes.

    

