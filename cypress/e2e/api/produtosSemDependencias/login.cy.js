describe('Login', () => {
    /*
        Antes do teste, carrega os dados do arquivo usuarios.json contém 
        que contem os dados do usuário a ser logado.
    */
    beforeEach(() => {
        cy.fixture('usuarios').as('usuarioFixture');
    });

    /*
        Realizar o login de um usuário, e espera que o login seja realizado com sucesso.
    */
    it('Login com sucesso', function () {
        return cy.obterToken(this.usuarioFixture.usuarioCadastradoParaSemDependencia).then((res) => {
            this.usuarioFixture.usuarioCadastradoParaSemDependencia.token = res.body.authorization;
            return cy.writeFile('cypress/fixtures/usuarios.json', this.usuarioFixture);
        });
    });
});