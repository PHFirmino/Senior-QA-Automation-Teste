describe('Usuario POST', () => {
    /*
        Antes do teste, carrega os dados do arquivo usuarios.json contém 
        que contem os dados do usuário a ser cadastrado.
    */
    beforeEach(() => {
        cy.fixture('usuarios').as('usuarioFixture');
    });

    /*
        Realizar o cadastro de um usuário, e espera que o usuário seja cadastrado com sucesso.
    */
    it('Cadastrar um usuario com sucesso', function () {
        return cy.criarUsuario(this.usuarioFixture.usuarioCadastradoParaSemDependencia).then(() => {
            return cy.writeFile('cypress/fixtures/usuarios.json', this.usuarioFixture);
        });
    });
});