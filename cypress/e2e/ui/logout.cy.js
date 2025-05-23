describe('Logout', () => {
    before(() => {
        cy.fixture('usuarios').then((usuarios) => {
            return cy.criarUsuario(usuarios.usuarioCadastradoParaLogout);
        });
    });

    beforeEach(() => {
        cy.visit('/login');
        cy.fixture('usuarios').as('usuariosFixture');
    });
    /*
        Cenário 1: Logout com sucesso

        Condição de Teste:
        - O usuário deve estar previamente cadastrado no sistema.
        - O login do usuário deve ser realizado com sucesso.

        Pré-Condição:
        - Acesso ao site: https://front.serverest.dev/login
        - O formulário de login deve estar carregado.
        - O usuário deve ser autenticado com sucesso.

        Passo a Passo:
        1. Realizar login com um usuário válido.
        2. Verificar se o botão de logout está visível.
        3. Clicar no botão de logout localizado na navegação.
        4. Verificar se o redirecionamento para a página de login ocorreu.

        Resultado Esperado:
        - O sistema deve redirecionar o usuário para a tela de login: "https://front.serverest.dev/login".

        Motivo:
        - Esse teste valida o comportamento correto do fluxo de logout, garantindo que o usuário saiu do ambiente.

        Criticidade:
        - Crítica. O logout é importante para garantir que o usuário saia do ambiente com segurança.   
     */
    it('Logout com sucesso', function () {
        const { email: emailPreencher } = this.usuariosFixture.usuarioCadastradoParaLogout;
        const { senha: senhaPreencher } = this.usuariosFixture.usuarioCadastradoParaLogout;

        /*
            No comando realizarLogin, o usuário é autenticado com sucesso e redirecionado para a página inicial.
        */
        cy.realizarLogin(senhaPreencher, emailPreencher).then(() => {

            cy.get('nav').find('form > button').click();
            cy.url().should('eq', 'https://front.serverest.dev/login');
        });
    });
})