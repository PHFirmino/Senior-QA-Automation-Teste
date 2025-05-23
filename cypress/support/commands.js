import LoginPage from '../pages/loginPage.js';



// Comando para criar usuário
Cypress.Commands.add('criarUsuario', (usuario, failOnStatusCode = false) => {
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios', 
      body: {
                nome: usuario.nome,
                email: usuario.email,
                password: usuario.senha,
                administrador: usuario.administrador,
            },
      failOnStatusCode
    });
});

// Comando para obter token
Cypress.Commands.add('obterToken', (usuario) => {
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login', 
      body: {
        email: usuario.email,
        password: usuario.senha
      }
    }).then((res) => {
      Cypress.env('token', res.body.authorization);
    });
});

// Comando para criar produto
Cypress.Commands.add('criarProduto', (produto, failOnStatusCode = false) => {
  return cy.fixture('usuarios').then((usuarios) => {
      return cy.request({
          method: 'POST',
          url: 'https://serverest.dev/produtos',
          headers: {
          Authorization: Cypress.env('token') || usuarios.usuarioCadastradoParaSemDependencia.token
        },
        body: produto,
        failOnStatusCode
    }).then((res) => {
        Cypress.env('idProduto', res.body._id);
    });
  });
});

// Comando para procurar produto
Cypress.Commands.add('buscarProdutoComParametros', (produto, failOnStatusCode = false) => {
    return cy.request({
        method: 'GET',
        url: 'https://serverest.dev/produtos',
        qs: produto,
        failOnStatusCode
    });
});

//Comando para realizar o login
Cypress.Commands.add('realizarLogin', (senha, email) => {
    //Verifico se o Formulário de login existe
    LoginPage.existeFormulario();

    //Verifico se o campo de Email existe e está visível e preencho com um email existente
    LoginPage.preencherEmail(email);

    //Verifico se o campo de Senha existe e está visível e preencho com uma senha
    LoginPage.preencherSenha(senha);

    //Verifico se o botão Entrar existe e clico nele
    LoginPage.clicarBotaoEntrar().then(() => {
    
      //Depois de clicar no botão, verifico se o usuário saiu da tela de login
      cy.url().should('not.eq', 'https://front.serverest.dev/login');

    });
});