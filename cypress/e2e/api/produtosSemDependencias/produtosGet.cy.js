describe('Produtos GET', () => {
    /*
        Neste arquivo executa apenas os testes, sem as depências criadas.
    */
    beforeEach(() => {
        /* 
            Carrega os dados do arquivo produtos.json e mensagens.json
            que contém os dados do produto a ser buscado e as mensagens esperadas.
        */
        cy.fixture('produtos').as('produtosFixture');
        cy.fixture('mensagens').as('mensagensFixture');
    });

    /*
        Realiza a busca por um produto utilizando todos os parâmetros válidos e espera um retorno com um 
        único item correspondente e com os dados corretos.
    */
    it('Buscar produto com todos os parâmetros válidos', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoCorretoParaSemDepencia.nome,
            preco: this.produtosFixture.produtoCorretoParaSemDepencia.preco,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao,
            quantidade: this.produtosFixture.produtoCorretoParaSemDepencia.quantidade
        };

        return cy.buscarProdutoComParametros(params).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosGet.produtoSucesso.statusCode);
            expect(res.body).to.have.property('produtos');
            expect(res.body).to.have.property('quantidade', 1);
            expect(res.body.produtos).to.be.an('array');
            expect(res.body.produtos).to.have.length(1);
            expect(res.body.produtos[0]).to.have.property('_id', this.produtosFixture.produtoCorretoParaSemDepencia.id);
            expect(res.body.produtos[0]).to.have.property('nome', this.produtosFixture.produtoCorretoParaSemDepencia.nome);
            expect(res.body.produtos[0]).to.have.property('preco', this.produtosFixture.produtoCorretoParaSemDepencia.preco);
            expect(res.body.produtos[0]).to.have.property('descricao', this.produtosFixture.produtoCorretoParaSemDepencia.descricao);
            expect(res.body.produtos[0]).to.have.property('quantidade', this.produtosFixture.produtoCorretoParaSemDepencia.quantidade);
        });
    });
    /*
        Realiza a busca por um produto utilizando um id inválido e espera um retorno com
        quantidade igual a 0 e um array vazio.
    */
    it('Buscar por um produto passando todos os parâmetros, id Inexistente', function () {
        const params = {
            _id: this.produtosFixture.produtoIncorreto.id,
            nome: this.produtosFixture.produtoCorretoParaSemDepencia.nome,
            preco: this.produtosFixture.produtoCorretoParaSemDepencia.preco,
            quantidade: this.produtosFixture.produtoCorretoParaSemDepencia.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao
        };

        return cy.buscarProdutoComParametros(params).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosGet.produtoSucesso.statusCode);
            expect(res.body).to.have.property('quantidade', 0);
            expect(res.body.produtos).to.be.an('array').that.is.empty;
        });
    });
    /*
        Realiza a busca por um produto utilizando todos os parâmetros, com o nome Inexistente
        e espera um retorno com quantidade igual a 0 e um array vazio.
    */
    it('Buscar por um produto passando todos os parâmetros, nome Inexistente', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoIncorreto.nome,
            preco: this.produtosFixture.produtoCorretoParaSemDepencia.preco,
            quantidade: this.produtosFixture.produtoCorretoParaSemDepencia.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao
        };

        return cy.buscarProdutoComParametros(params).then((res) => {
            expect(res.status).to.eq(this.mensagensFixture.produtosGet.produtoSucesso.statusCode);
            expect(res.body).to.have.property('quantidade', 0);
            expect(res.body.produtos).to.be.an('array').that.is.empty;
        });
    });
    /*
        Realiza a busca por um produto utilizando todos os parâmetros, com o preço String
        e espera um retorno com a mensagem de erro "preco deve ser um número".
    */
    it('Buscar por um produto passando todos os parâmetros, preço String', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoCorretoParaSemDepencia.nome,
            preco: this.produtosFixture.produtoIncorreto.precoString,
            quantidade: this.produtosFixture.produtoCorretoParaSemDepencia.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao
        };

        return cy.buscarProdutoComParametros(params, false).then((response) => {
            expect(response.status).to.eq(this.mensagensFixture.produtosGet.precoDeveSerUmNumero.statusCode);
            expect(response.body).to.have.property('preco', this.mensagensFixture.produtosGet.precoDeveSerUmNumero.mensagem);
        });
    });
    /*
        Realiza a busca por um produto utilizando todos os parâmetros, com o preço Não Inteiro
        e espera um retorno com a mensagem de erro "preco deve ser um inteiro".
    */
    it('Buscar por um produto passando todos os parâmetros, preço Não Inteiro', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoCorretoParaSemDepencia.nome,
            preco: this.produtosFixture.produtoIncorreto.precoNaoInteiro,
            quantidade: this.produtosFixture.produtoCorretoParaSemDepencia.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao
        };

        return cy.buscarProdutoComParametros(params, false).then((response) => {
            expect(response.status).to.eq(this.mensagensFixture.produtosGet.precoDeveSerUmInteiro.statusCode);
            expect(response.body).to.have.property('preco', this.mensagensFixture.produtosGet.precoDeveSerUmInteiro.mensagem);
        });
    });
    /*
        Realiza a busca por um produto utilizando todos os parâmetros, com o preço Zero
        e espera um retorno com a mensagem de erro "preco deve ser um número positivo".
    */
    it('Buscar por um produto passando todos os parâmetros, preço Zero', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoIncorreto.nome,
            preco: this.produtosFixture.produtoIncorreto.precoValorZero,
            quantidade: this.produtosFixture.produtoIncorreto.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao
        };

        return cy.buscarProdutoComParametros(params, false).then((response) => {
            expect(response.status).to.eq(this.mensagensFixture.produtosGet.precoDeveSerUmNumeroPositivo.statusCode);
            expect(response.body).to.have.property('preco', this.mensagensFixture.produtosGet.precoDeveSerUmNumeroPositivo.mensagem);
        });
    });

    /*
        Realiza a busca por um produto utilizando todos os parâmetros, com o preço Inexistente
        e espera um retorno com quantidade igual a 0 e um array vazio.
    */
    it('Buscar por um produto passando todos os parâmetros, preço Inexistente', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoCorretoParaSemDepencia.nome,
            preco: this.produtosFixture.produtoIncorreto.preco,
            quantidade: this.produtosFixture.produtoCorretoParaSemDepencia.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao
        };

        return cy.buscarProdutoComParametros(params).then((response) => {
            expect(response.status).to.eq(this.mensagensFixture.produtosGet.produtoSucesso.statusCode);
            expect(response.body).to.have.property('quantidade', 0);
            expect(response.body.produtos).to.be.an('array').that.is.empty;
        });
    });
    /*
        Realiza a busca por um produto utilizando todos os parâmetros, com a descrição Inexistente
        e espera um retorno com quantidade igual a 0 e um array vazio.
    */
    it('Buscar por um produto passando todos os parâmetros, descrição Inexistente', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoCorretoParaSemDepencia.nome,
            preco: this.produtosFixture.produtoCorretoParaSemDepencia.preco,
            quantidade: this.produtosFixture.produtoCorretoParaSemDepencia.quantidade,
            descricao: this.produtosFixture.produtoIncorreto.descricao
        };

        return cy.buscarProdutoComParametros(params).then((response) => {
            expect(response.status).to.eq(this.mensagensFixture.produtosGet.produtoSucesso.statusCode);
            expect(response.body).to.have.property('quantidade', 0);
            expect(response.body.produtos).to.be.an('array').that.is.empty;
        });
    });
    /*
    Realiza a busca por um produto utilizando todos os parâmetros, com o quantidade String
        e espera um retorno com a mensagem de erro "quantidade deve ser um número".
    */
    it('Buscar por um produto passando todos os parâmetros, quantidade String', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoCorretoParaSemDepencia.nome,
            preco: this.produtosFixture.produtoCorretoParaSemDepencia.preco,
            quantidade: this.produtosFixture.produtoIncorreto.quantidadeString,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao
        };

        return cy.buscarProdutoComParametros(params, false).then((response) => {
            expect(response.status).to.eq(this.mensagensFixture.produtosGet.quantidadeDeveSerUmNumero.statusCode);
            expect(response.body).to.have.property('quantidade', this.mensagensFixture.produtosGet.quantidadeDeveSerUmNumero.mensagem);
        });
    });

    /*
        Realiza a busca por um produto utilizando todos os parâmetros, com o quantidade Não Inteiro
        e espera um retorno com a mensagem de erro "quantidade deve ser um inteiro".
    */
    it('Buscar por um produto passando todos os parâmetros, quantidade Não Inteiro', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoCorretoParaSemDepencia.nome,
            preco: this.produtosFixture.produtoCorretoParaSemDepencia.preco,
            quantidade: this.produtosFixture.produtoIncorreto.quantidadeNaoInteiro,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao
        };

        return cy.buscarProdutoComParametros(params, false).then((response) => {
            expect(response.status).to.eq(this.mensagensFixture.produtosGet.quantidadeDeveSerUmInteiro.statusCode);
            expect(response.body).to.have.property('quantidade', this.mensagensFixture.produtosGet.quantidadeDeveSerUmInteiro.mensagem);
        });
    });

    /*
        Realiza a busca por um produto utilizando todos os parâmetros, com o quantidade Menor Que Zero
        e espera um retorno com a mensagem de erro "quantidade deve ser maior ou igual a 0".
    */
    it('Buscar por um produto passando todos os parâmetros, quantidade Menor Que Zero', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoCorretoParaSemDepencia.nome,
            preco: this.produtosFixture.produtoCorretoParaSemDepencia.preco,
            quantidade: this.produtosFixture.produtoIncorreto.quantidadeMenorQueZero,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao
        };

        return cy.buscarProdutoComParametros(params, false).then((response) => {
            expect(response.status).to.eq(this.mensagensFixture.produtosGet.quantidadeDeveSerMaiorOuIgualAZero.statusCode);
            expect(response.body).to.have.property('quantidade', this.mensagensFixture.produtosGet.quantidadeDeveSerMaiorOuIgualAZero.mensagem);
        });
    });

    /*
        Realiza a busca por um produto utilizando todos os parâmetros, com o quantidade Inexistente
        e espera um retorno com quantidade igual a 0 e um array vazio.
    */
    it('Buscar por um produto passando todos os parâmetros, quantidade Inexistente', function () {
        const params = {
            _id: this.produtosFixture.produtoCorretoParaSemDepencia.id,
            nome: this.produtosFixture.produtoCorretoParaSemDepencia.nome,
            preco: this.produtosFixture.produtoCorretoParaSemDepencia.preco,
            quantidade: this.produtosFixture.produtoIncorreto.quantidade,
            descricao: this.produtosFixture.produtoCorretoParaSemDepencia.descricao
        };

        return cy.buscarProdutoComParametros(params).then((response) => {
            expect(response.status).to.eq(this.mensagensFixture.produtosGet.produtoSucesso.statusCode);
            expect(response.body).to.have.property('quantidade', 0);
            expect(response.body.produtos).to.be.an('array').that.is.empty;
        });
    });
});
