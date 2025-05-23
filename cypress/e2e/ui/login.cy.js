import LoginPage from '../../pages/loginPage.js';

describe('Login página', () => {
    before(() => {
        /*
            Neste arquivo executa as dependências e os testes.
        
            Cria o usuário e obtém o token antes de executar os testes
            Isso garante que o usuário esteja criado
        */
        return cy.fixture('usuarios').then((usuarios) => {
            return cy.criarUsuario(usuarios.usuarioCadastradoParaUiLogin);
        });
    });
    beforeEach(() => {
        /*
            Visita o site antes de cada teste
            Carrega os dados do arquivo usuarios.json que contém os dados do usuário a ser logado
            Carrega os dados do arquivo mensagens.json que contém as mensagens de erro
        */
        cy.visit('/login');
        cy.fixture('mensagens').as('mensagensFixture');
        cy.fixture('usuarios').as('usuariosFixture')
    });

    /*
        Cenário 1: Tentativa de login com os campos Email e Senha vazios

        Condição de Teste:
        - Não é necessário um usuário registrado, pois o teste verifica apenas a validação de campos obrigatórios.

        Pré-Condição:
        - Acesso ao site: https://front.serverest.dev/login
        - O formulário de login deve estar carregado.

        Passo a Passo:
        1. Verificar se o formulário de login está presente na tela.
        2. Verificar se o botão "Entrar" está visível.
        3. Clicar no botão "Entrar" com os campos Email e Senha vazios.
        4. Verificar se são exibidas mensagens de erros.

        Resultado Esperado:
        - Mensagem de erro "Email é obrigatório" deve ser exibida.
        - Mensagem de erro "Password é obrigatório" deve ser exibida.

        Motivo:
        - É essencial garantir que o sistema valide os campos obrigatórios antes de permitir o envio do formulário.

        Criticidade:
        - Crítico. A ausência de validações poderia permitir requisições inválidas ao backend e comprometer a experiência do usuário.
    */
    it('Clicando no botão Entrar com os campos Email e Senha vazios', function () {
        //Verifico se o Formulário de login existe
        LoginPage.existeFormulario();

        //Veririfico se o botão Entrar existe e está visível, depois clico nele        
        LoginPage.clicarBotaoEntrar().then(() => {

            //Depois de clicar no botão, verifico se os modais de erros aparecem
            const { emailObrigatorioPosicaoZeroSpan : { mensagem: emailMsg, parametro: emailParam }, senhaObrigatorioPosicaoUmSpan: { mensagem: passMsg, parametro: passParam }} = this.mensagensFixture.login;
            LoginPage.verificarAlerta(emailMsg, emailParam);
            LoginPage.verificarAlerta(passMsg, passParam);

        });
    });
    /*
        Cenário 2: Tentativa de login com Email inválido e campo de Senha vazio

        Condição de Teste:
        - Não é necessário um usuário registrado, pois o foco está na validação de dados do formulário.

        Pré-Condição:
        - Acesso ao site: https://front.serverest.dev/login
        - O formulário de login deve estar carregado.

        Passo a Passo:
        1. Verificar se o formulário de login está presente na tela.
        2. Preencher o campo "Email" com um valor inválido (ex.: "daosdjadoj@gmail").
        3. Verificar se o botão "Entrar" está visível e clicar nele.
        4. Verificar se são exibidas mensagens de erros.

        Resultado Esperado:
        - Mensagem de erro "Email deve ser um email válido" deve ser exibida.
        - Mensagem de erro "Password é obrigatório" deve ser exibida.

        Motivo:
        - Validar que o sistema identifica entradas inválidas no campo de email e a ausência da senha.

        Criticidade:
        - Alta. Validações de email e senha são essenciais para a integridade e segurança do login.
    */
    it('Clicando no botão Entrar com o campo Email preenchido com email inválido e campo Senha vazio', function () {
        //Verifico se o Formulário de login existe
        LoginPage.existeFormulario();

        //Verifico se o campo de Email existe e está visível, depois preencho com um email inválido
        const { email: emailPreencher } = this.usuariosFixture.usuarioErros.usuarioEmailIncorreto;
        LoginPage.preencherEmail(emailPreencher);
        
        //Verifico se o botão Entrar existe e está visível, depois clico nele
        LoginPage.clicarBotaoEntrar().then(() => {

            //Depois de clicar no botão, verifico se os modais de erros aparecem
            const { emailInvalidoPosicaoZeroSpan: { mensagem: emailMsg, parametro: emailParam }, senhaObrigatorioPosicaoUmSpan: { mensagem: passMsg, parametro: passParam }} = this.mensagensFixture.login;
            LoginPage.verificarAlerta(emailMsg, emailParam);
            LoginPage.verificarAlerta(passMsg, passParam);

        });
    });
    /*
        Cenário 3: Tentativa de login com Email inexistente e campo de Senha vazio

        Condição de Teste:
        - Não é necessário um usuário registrado, pois o foco do teste está apenas na validação de campos obrigatórios.

        Pré-Condição:
        - Acesso ao site: https://front.serverest.dev/login
        - O formulário de login deve estar carregado.

        Passo a Passo:
        1. Verificar se o formulário de login está presente na tela.
        2. Preencher o campo "Email" com um email que não está cadastrado no sistema (ex.: "daosdjadoj@gmail.com").
        3. Clicar no botão "Entrar".
        4. Verificar se é exibida mensagem de erro.

        Resultado Esperado:
        - A mensagem de erro "Password é obrigatório" deve ser exibida.
        - Nenhuma validação de email deve falhar, já que o formato está correto.

        Motivo:
        - Garantir que o campo de senha seja sempre exigido, independentemente do email informado (válido ou não).

        Criticidade:
        - Média. Embora não envolva autenticação real, é importante que a interface exiba informações obrigatórias corretamente.
    */
    it('Clicando no botão Entrar com o campo Email preenchido com email inexistente e campo Senha vazio', function () {
        //Verifico se o Formulário de login existe
        LoginPage.existeFormulario();
        
        //Verifico se o campo de Email existe e está visível, depois preencho com um email inexistente
        const { email: emailPreencher } = this.usuariosFixture.usuarioErros.usuarioEmailInexistente;
        LoginPage.preencherEmail(emailPreencher);
        
        //Veririfico se o botão Entrar existe e está visível, depois clico nele
        LoginPage.clicarBotaoEntrar().then(() => {

            //Depois de clicar no botão, verifico se os modais de erros aparecem
            const { senhaObrigatorioPosicaoZeroSpan: { mensagem: passMsg, parametro: passParam }} = this.mensagensFixture.login;
            LoginPage.verificarAlerta(passMsg, passParam);
        
        });
    });
    /*
        Cenário 4: Tentativa de login com campo de Senha preenchido e campo de Email vazio

        Condição de Teste:
        - Nenhuma conta de usuário precisa estar cadastrada, pois o objetivo do teste é validar o preenchimento obrigatório dos campos.

        Pré-Condição:
        - Acesso ao site: https://front.serverest.dev/login
        - O formulário de login deve estar carregado.

        Passo a Passo:
        1. Verificar se o formulário de login está presente na tela.
        2. Preencher o campo "Senha" com uma senha qualquer (ex.: "123").
        3. Clicar no botão "Entrar".
        4. Verificar se é exibida mensagem de erro.

        Resultado Esperado:
        - A mensagem de erro "Email é obrigatório" deve ser exibida na tela.
        - Nenhuma outra validação deve ser exibida, pois o campo de senha foi preenchido corretamente.

        Motivo:
        - Esse teste assegura que o sistema bloqueie o envio do formulário quando o campo "Email" estiver vazio, evitando requisições inválidas.

        Criticidade:
        - Alta. O campo de email é essencial para autenticação; o sistema precisa validar obrigatoriamente sua presença.
    */
    it('Clicando no botão Entrar com o campo Senha preenchido e campo Email vazio', function () {
        //Verifico se o Formulário de login existe
        LoginPage.existeFormulario();
        
        //Verifico se o campo de Senha existe e está visível, depois preencho com uma senha
        const { senha: senhaPreencher } = this.usuariosFixture.usuarioErros.usuarioSenhaQualquer;
        LoginPage.preencherSenha(senhaPreencher)

         //Veririfico se o botão Entrar existe e está visível, depois clico nele        
        LoginPage.clicarBotaoEntrar().then(() => {

            //Depois de clicar no botão, verifico se os modais de erros aparecem
            const { emailObrigatorioPosicaoZeroSpan: { mensagem: emailMsg, parametro: emailParam }} = this.mensagensFixture.login;
            LoginPage.verificarAlerta(emailMsg, emailParam);

        });
    });
    /*
        Cenário 5: Tentativa de login com email e senha inválidos (usuário inexistente)

        Condição de Teste:
        - Nenhum usuário com o email e senha informados deve estar cadastrado no sistema.

        Pré-Condição:
        - Acesso ao site: https://front.serverest.dev/login
        - O formulário de login deve estar carregado.

        Passo a Passo:
        1. Verificar se o formulário de login está visível na tela.
        2. Preencher o campo "Email" com um email inexistente (ex.: "daosdjadoj@gmail.com").
        3. Preencher o campo "Senha" com uma senha qualquer (ex.: "123").
        4. Clicar no botão "Entrar".
        5. Verificar se é exibida mensagem de erro.

        Resultado Esperado:
        - O sistema deve exibir uma mensagem de erro indicando que os dados estão incorretos: "Email e/ou senha inválidos".
        - O usuário **não** deve ser autenticado nem redirecionado.

        Motivo:
        - Esse teste valida o comportamento do sistema diante da tentativa com credenciais inválidas, o que ajuda a evitar acessos indevidos.

        Criticidade:
        - Alta. Este é um cenário essencial de segurança e validação de credenciais.
    */
    it('Preenchendo dados inexistente', function () {
        //Verifico se o Formulário de login existe
        LoginPage.existeFormulario();

        //Verifico se o campo de Email existe e está visível e preencho com um email inexistente
        const { email: emailPreencher } = this.usuariosFixture.usuarioErros.usuarioEmailInexistente;
        LoginPage.preencherEmail(emailPreencher);

        //Verifico se o campo de Senha existe e está visível e preencho com uma senha
        const { senha: senhaPreencher } = this.usuariosFixture.usuarioErros.usuarioSenhaQualquer;
        LoginPage.preencherSenha(senhaPreencher);

        //Veririfico se o botão Entrar existe e clico nele
        LoginPage.clicarBotaoEntrar().then(() => {

            //Depois de clicar no botão, verifico se os modais de erros aparecem
            const { emailOuSenhaInvalidoPosicaoZeroSpan: { mensagem: emailMsg, parametro: emailParam }} = this.mensagensFixture.login;
            LoginPage.verificarAlerta(emailMsg, emailParam);

        });
    });
    /*
        Cenário 6: Login com dados válidos

        Condição de Teste:
        - O usuário com email e senha deve estar previamente registrado no sistema.

        Pré-Condição:
        - Acesso ao site: https://front.serverest.dev/login
        - O formulário de login deve estar carregado.

        Passo a Passo:
        1. Verificar se o formulário de login está visível na tela.
        2. Preencher o campo "Email" com um email registrado.
        3. Preencher o campo "Senha" com a senha correta.
        4. Clicar no botão "Entrar".
        5. Verificar se a URL mudou, ou seja, se o usuário foi redirecionado para fora da tela de login.

        Resultado Esperado:
        - O usuário deve ser autenticado com sucesso e redirecionado para a página inicial do sistema.

        Motivo:
        - Este teste valida o fluxo principal de entrada no sistema, garantindo que o login com dados corretos funcione como esperado.

        Criticidade:
        - Crítico. O login é a principal porta de entrada da aplicação e deve funcionar corretamente.
    */
    it('Preenchendo dados válidos', function () {
        const { email: emailPreencher } = this.usuariosFixture.usuarioCadastradoParaUiLogin;
        const { senha: senhaPreencher } = this.usuariosFixture.usuarioCadastradoParaUiLogin;
        /*
            No comando realizarLogin, o usuário é autenticado com sucesso e redirecionado para a página inicial.
        */
        cy.realizarLogin(senhaPreencher, emailPreencher);
    });
});