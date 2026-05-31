/**
 Carrinho — salva itens no localStorage por usuário logado 
 Ex de Formato: [{ id, quantidade }, resto]
 */
const Carrinho = {
    chave() {
        const usuario = Auth.getUsuario();
        return usuario ? `carrinho_${usuario}` : null;
    },

    ler() {
        const chave = this.chave();
        if (!chave) return [];
        return JSON.parse(localStorage.getItem(chave)) || [];
    },

    salvar(itens) {
        const chave = this.chave();
        if (!chave) return;
        localStorage.setItem(chave, JSON.stringify(itens));
    },

    limpar() {
        this.salvar([]);
    },

    quantidadeTotal() {
        return this.ler().reduce((soma, item) => soma + item.quantidade, 0);
    },

    adicionar(idProduto) {
        const itens = this.ler();
        const existente = itens.find((i) => i.id === idProduto);

        if (existente) {
            existente.quantidade += 1;
        } else {
            itens.push({ id: idProduto, quantidade: 1 });
        }

        this.salvar(itens);
        return this.quantidadeTotal();
    },

    alterarQuantidade(idProduto, delta) {
        let itens = this.ler();
        const item = itens.find((i) => i.id === idProduto);
        if (!item) return this.quantidadeTotal();

        item.quantidade += delta;

        if (item.quantidade <= 0) {
            itens = itens.filter((i) => i.id !== idProduto);
        }

        this.salvar(itens);
        return this.quantidadeTotal();
    },

    /** Retorna itens com dados completos do cardápio e subtotal por linha. */
    detalhes() {
        return this.ler()
            .map((item) => {
                const produto = buscarProduto(item.id);
                if (!produto) return null;
                return {
                    ...produto,
                    quantidade: item.quantidade,
                    subtotal: produto.preco * item.quantidade
                };
            })
            .filter(Boolean);
    },

    subtotal() {
        return this.detalhes().reduce((soma, item) => soma + item.subtotal, 0);
    },

    totalComEntrega() {
        const sub = this.subtotal();
        return sub > 0 ? sub + TAXA_ENTREGA : 0;
    }
};

/**
 * Pedidos — histórico salvo por usuário.
 */
const Pedidos = {
    chave() {
        return `pedidos_${Auth.getUsuario()}`;
    },

    ler() {
        return JSON.parse(localStorage.getItem(this.chave())) || [];
    },

    salvar(lista) {
        localStorage.setItem(this.chave(), JSON.stringify(lista));
    },

    registrar(dados) {
        const pedido = {
            id: Date.now(),
            data: new Date().toLocaleString("pt-BR"),
            itens: Carrinho.detalhes(),
            subtotal: Carrinho.subtotal(),
            entrega: TAXA_ENTREGA,
            total: Carrinho.totalComEntrega(),
            endereco: dados.endereco,
            pagamento: dados.pagamento,
            lgpdAceito: dados.lgpdAceito === true
        };

        const lista = this.ler();
        lista.unshift(pedido);
        this.salvar(lista);
        Carrinho.limpar();
        return pedido;
    }
};
