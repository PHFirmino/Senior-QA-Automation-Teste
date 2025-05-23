describe('Produtos POST com dependências', () => {
    before(() => {
        /*
            Neste arquivo executa as dependências e os testes.
        
            Cria o usuário e obtém o token antes de executar os testes
            Isso garante que o usuário esteja criado e o token esteja disponível para os testes
        */
        return cy.fixture('usuarios').then((usuarios) => {
            return cy.criarUsuario(usuarios.usuarioCadastradoParaComDependenciaPost).then(() => {
                return cy.obterToken(usuarios.usuarioCadastradoParaComDependenciaPost);
            });
        });
    });
    beforeEach(() => {
        // Carrega os dados do arquivo produtos.json
        cy.fixture('produtos').as('produtosFixture');
        cy.fixture('mensagens').as('mensagensFixture');
    });

    /*
        Realiza o cadastro de um produto com sucesso e espera que o produto seja criado.
    */
    it('Cadastrar um produto com sucesso', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoCorretoParaComDependenciaPost.preco,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao,
            quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.cadastroRealizadoComSucesso.statusCode);
            expect(res.body).to.have.property('message', this.mensagensFixture.produtosPost.cadastroRealizadoComSucesso.mensagem);
            expect(res.body).to.have.property('_id');
        });
    });

    /*
        Realiza o cadastro de um produto com um nome Já Existente e espera que o retorno de erro seja,
        "já existe produto com esse nome", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com um nome Existente', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoCorretoParaComDependenciaPost.preco,
            quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.jaExisteProdutoComEsseNome.statusCode);
            expect(res.body).to.have.property('message', this.mensagensFixture.produtosPost.jaExisteProdutoComEsseNome.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com um nome Vazio e espera que o retorno de erro seja,
        "não pode ficar em branco", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com nome Vazio', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoVazio.nome,
            preco: this.produtosFixture.produtoCorretoParaComDependenciaPost.preco,
            quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.nomeNaoPodeFicarEmBranco.statusCode);
            expect(res.body).to.have.property('nome', this.mensagensFixture.produtosPost.nomeNaoPodeFicarEmBranco.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com descrição Vazio e espera que o retorno de erro seja,
        "descricao não pode ficar em branco", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com descrição Vazio', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoCorretoParaComDependenciaPost.preco,
            quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade,
            descricao: this.produtosFixture.produtoVazio.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.descricaoNaoPodeFicarEmBranco.statusCode);
            expect(res.body).to.have.property('descricao', this.mensagensFixture.produtosPost.descricaoNaoPodeFicarEmBranco.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com um preço Vazio e espera que o retorno de erro seja,
        "preco deve ser um número", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com preco Vazio', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoVazio.preco,
            quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.precoDeveSerUmNumero.statusCode);
            expect(res.body).to.have.property('preco', this.mensagensFixture.produtosPost.precoDeveSerUmNumero.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com um preço String e espera que o retorno de erro seja,
        "preco deve ser um número", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com preco String', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoIncorreto.precoString,
            quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.precoDeveSerUmNumero.statusCode);
            expect(res.body).to.have.property('preco', this.mensagensFixture.produtosPost.precoDeveSerUmNumero.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com um preço Não Inteiro e espera que o retorno de erro seja,
        "preco deve ser um inteiro", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com preço Não Inteiro', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoIncorreto.precoNaoInteiro,
            quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.precoDeveSerUmInteiro.statusCode);
            expect(res.body).to.have.property('preco', this.mensagensFixture.produtosPost.precoDeveSerUmInteiro.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com um preco Zero e espera que o retorno de erro seja,
        "preco deve ser um número positivo", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com preço Zero', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoIncorreto.precoValorZero,
            quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.precoDeveSerUmNumeroPositivo.statusCode);
            expect(res.body).to.have.property('preco', this.mensagensFixture.produtosPost.precoDeveSerUmNumeroPositivo.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com quantidade Vazio e espera que o retorno de erro seja,
        "quantidade deve ser um número", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com quantidade Vazio', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoCorretoParaComDependenciaPost.preco,
            quantidade: this.produtosFixture.produtoVazio.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.quantidadeDeveSerUmNumero.statusCode);
            expect(res.body).to.have.property('quantidade', this.mensagensFixture.produtosPost.quantidadeDeveSerUmNumero.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com quantidade String e espera que o retorno de erro seja,
        "quantidade deve ser um número", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com quantidade String', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoCorretoParaComDependenciaPost.preco,
            quantidade: this.produtosFixture.produtoIncorreto.quantidadeString,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.quantidadeDeveSerUmNumero.statusCode);
            expect(res.body).to.have.property('quantidade', this.mensagensFixture.produtosPost.quantidadeDeveSerUmNumero.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com quantidade Não Inteiro e espera que o retorno de erro seja,
        "quantidade deve ser um inteiro", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com quantidade Não Inteiro', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoCorretoParaComDependenciaPost.preco,
            quantidade: this.produtosFixture.produtoIncorreto.quantidadeNaoInteiro,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.quantidadeDeveSerUmInteiro.statusCode);
            expect(res.body).to.have.property('quantidade', this.mensagensFixture.produtosPost.quantidadeDeveSerUmInteiro.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com quantidade Menor Que Zero e espera que o retorno de erro seja,
        "quantidade deve ser maior ou igual a zero", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com quantidade Menor Que Zero', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoCorretoParaComDependenciaPost.preco,
            quantidade: this.produtosFixture.produtoIncorreto.quantidadeMenorQueZero,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.quantidadeDeveSerMaiorOuIgualAZero.statusCode);
            expect(res.body).to.have.property('quantidade', this.mensagensFixture.produtosPost.quantidadeDeveSerMaiorOuIgualAZero.mensagem);
        });
    });

    /*
        Realiza o cadastro de um produto com preço Valor Alto e espera que o retorno de erro seja,
        "preco não pode ser maior que 9007199254740991", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com um preço Valor Alto', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoIncorreto.precoValorAlto,
            quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.precoValorAlto.statusCode);
            expect(res.body).to.have.property('preco', this.mensagensFixture.produtosPost.precoValorAlto.mensagem);
        });
    });

    /*
        Realizo um cadastro de um produto com paramêtros vazios e espero que o retorno de erros sejam,
        "... deve ser obrigatório", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto sem os campos no Paramêtro', function () {
        const paramsCriarProduto = {};
        cy.criarProduto(paramsCriarProduto).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.semParametros.statusCode);
            expect(res.body).to.have.property('nome', this.mensagensFixture.produtosPost.nomeObrigatorio.mensagem);
            expect(res.body).to.have.property('preco', this.mensagensFixture.produtosPost.precoObrigatorio.mensagem);
            expect(res.body).to.have.property('descricao', this.mensagensFixture.produtosPost.descricaoObrigatorio.mensagem);
            expect(res.body).to.have.property('quantidade', this.mensagensFixture.produtosPost.quantidadeObrigatorio.mensagem);
        });
    });

    /*
        Realizo um cadstro de um produto com um token inválido e espero que o retorno de erro seja,
        "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto sem token', function () {
        const paramsCriarProduto = {
            nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
            preco: this.produtosFixture.produtoCorretoParaComDependenciaPost.preco,
            quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
        };
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/produtos',
            body: paramsCriarProduto,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosPost.tokenDeveSerInformado.statusCode);
            expect(res.body.message).to.eq(this.mensagensFixture.produtosPost.tokenDeveSerInformado.mensagem);
        });
    });
    
    /*
        Realizo um cadastro de um produto sem ser Administrador espero que o retorno de erro seja,
        "Rota exclusiva para administradores", portanto o cadastro não deve ser realizado.
    */
    it('Cadastrar um produto com um usuário que não é Administrador', function () {
        return cy.fixture('usuarios').then((usuarios) => {
            return cy.criarUsuario(usuarios.usuarioNaoAdministrador).then(() => {
                return cy.obterToken(usuarios.usuarioNaoAdministrador).then((res) => {
                    const paramsCriarProduto = {
                        nome: this.produtosFixture.produtoCorretoParaComDependenciaPost.nome,
                        preco: this.produtosFixture.produtoCorretoParaComDependenciaPost.preco,
                        quantidade: this.produtosFixture.produtoCorretoParaComDependenciaPost.quantidade,
                        descricao: this.produtosFixture.produtoCorretoParaComDependenciaPost.descricao
                    };
                    cy.request({
                        method: 'POST',
                        url: 'https://serverest.dev/produtos',
                        body: paramsCriarProduto,
                        failOnStatusCode: false,
                        headers: {
                            Authorization: res.body.authorization
                        }
                    }).then((res) => {
                        expect(res.status).to.eq(this.mensagensFixture.produtosPost.rotaExclusiva.statusCode);
                        expect(res.body.message).to.eq(this.mensagensFixture.produtosPost.rotaExclusiva.mensagem);
                    });
                });
            });
        });
    });
});