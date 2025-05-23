describe('Tela Inicial Administrador', () => {
    before(() => {
        /*
            Neste arquivo executa as dependências e os testes.
        
            Cria o usuário e obtém o token antes de executar os testes
            Isso garante que o usuário esteja criado
        */
        return cy.fixture('usuarios').then((usuarios) => {
            return cy.criarUsuario(usuarios.usuarioCadastradoParaVerNomeNoMenu);
        });
    });
    beforeEach(() => {
        /*
            Visita o site antes de cada teste
            Carrega os dados do arquivo usuarios.json que contém os dados do usuário a ser logado
            Carrega os dados do arquivo mensagens.json que contém as mensagens de erro
        */
        cy.visit('/login');
        cy.fixture('usuarios').as('usuariosFixture')
    });
    /*
        Cenário 1: Verificar nome no menu do usuário logado ambiente de Admin

        Condição de Teste:
        - Necessário um usuário previamente registrado no sistema com papel de Administrador.

        Pré-Condição:
        - Acesso ao site: https://front.serverest.dev/login
        - O usuário deve estar com credenciais válidas cadastradas.
        - O usuário deve estar autenticado com sucesso antes da verificação.

        Passo a Passo:
        1. Realizar login com um usuário válido com perfil de Administrador.
        2. Verificar se o redirecionamento ocorreu para a página inicial do Admin.
        3. Verificar se o nome do usuário aparece no cabeçalho da página.

        Resultado Esperado:
        - O sistema deve redirecionar para: https://front.serverest.dev/admin/home.
        - O nome do usuário logado deve estar visível no cabeçalho da tela inicial.

        Motivo:
        - Garante que a autenticação e o redirecionamento estejam funcionando corretamente.
        - Confirma que as informações do usuário estão sendo exibidas corretamente após o login.

        Criticidade:
        - Média. O erro não impede o funcionamento geral da aplicação nem bloqueia fluxos críticos.
    */
    it('Verificar nome no menu do usuário logado ambiente de Admin', function () {
        const { email: emailPreencher } = this.usuariosFixture.usuarioCadastradoParaVerNomeNoMenu;
        const { senha: senhaPreencher } = this.usuariosFixture.usuarioCadastradoParaVerNomeNoMenu;
        /*
            No comando realizarLogin, o usuário é autenticado com sucesso e redirecionado para a página inicial.
        */
        cy.realizarLogin(senhaPreencher, emailPreencher).then(() => {
            cy.url().should('eq', 'https://front.serverest.dev/admin/home');
            cy.get('.jumbotron > h1').should('contain', this.usuariosFixture.usuarioCadastradoParaVerNomeNoMenu.nome);
        });
    });
    /*
        Cenário 2: Verificar quantidade de cards exibidos na tela inicial

        Condição de Teste:
        - Necessário um usuário previamente registrado no sistema com papel válido.

        Pré-Condição:
        - Acesso ao site: https://front.serverest.dev/login
        - O usuário deve estar com credenciais válidas cadastradas.
        - O usuário deve estar autenticado com sucesso antes da verificação.

        Passo a Passo:
        1. Realizar login com um usuário válido.
        2. Verificar se o redirecionamento ocorreu para a página inicial.
        3. Verificar se a quantidade de cards exibidos na tela inicial é igual a 5.

        Resultado Esperado:
        - O sistema deve exibir exatamente 5 cards dentro da seção principal da página inicial.

        Motivo:
        - Confirma que os elementos visuais esperados (cards) estão sendo renderizados corretamente.

        Criticidade:
        - Menor. Um erro na quantidade de cards exibidos não compromete o funcionamento geral da aplicação,
        mas pode indicar falhas no carregamento de dados ou na lógica de exibição da interface.
    */
    it('Vericar quantidade de cards na tela inicial', function () {
        const { email: emailPreencher } = this.usuariosFixture.usuarioCadastradoParaVerNomeNoMenu;
        const { senha: senhaPreencher } = this.usuariosFixture.usuarioCadastradoParaVerNomeNoMenu;
        /*
            No comando realizarLogin, o usuário é autenticado com sucesso e redirecionado para a página inicial.
        */
        cy.realizarLogin(senhaPreencher, emailPreencher).then(() => {
            cy.get('.jumbotron').find('p').eq(1).within(() => {
                cy.get('.card').should('have.length', '5');
            });
        });
    })
});