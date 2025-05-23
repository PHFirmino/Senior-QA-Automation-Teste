class Login{
    constructor() {
        this.formulario = 'form';
        this.emailInput = 'input[data-testid="email"]';
        this.senhaInput = 'input[data-testid="senha"]';
        this.entrarButton = 'button[data-testid="entrar"]';
        this.alerta = '.alert';
    }

    // Verifica se o formulário de login existe na página
    existeFormulario() {
        cy.get(this.formulario).should('exist');
    }

    //Verifica se o input de email existe na página, se é visível e o preenche com o email fornecido
    preencherEmail(email) {
        cy.get(this.emailInput).should('exist').and('be.visible').type(email);    
    }

    //Verifica se o input de senha existe na página, se é visível e o preenche com a senha fornecida
    preencherSenha(senha) {
        cy.get(this.senhaInput).should('exist').and('be.visible').type(senha);
    }

    //Verifica se o botão de entrar existe na página, se é visível e clica nele
    clicarBotaoEntrar() {
        return cy.get(this.entrarButton).should('exist').click();
    }
    
    //Verifica se o alerta existe na página, se é visível e preenche com a mensagem fornecida
    verificarAlerta(mensagem, index) {
        cy.get('.alert').eq(index).find('span')
            .should('exist').and('be.visible').and('contain', mensagem);
    }
}

module.exports = new Login();