/**
 Página de compras — monta cardápio, carrinho lateral e checkout.
 Só funciona se o usuário estiver logado (Auth.exigirLogin).
 */
const Compras = {
    categoriaAtiva: "todos",
    termoBusca: "",
    carrinhoAberto: false,

    iniciar() {
        if (!Auth.exigirLogin()) return;

        const veioComItem = this.aplicarFiltrosSalvos();
        this.renderCategorias();
        this.renderCardapio();
        this.atualizarCarrinho();
        this.registrarEventos();

        if (veioComItem) {
            this.abrirCarrinho();
        }
    },

    aplicarFiltrosSalvos() {
        const busca = sessionStorage.getItem("buscaCardapio");
        const cat = sessionStorage.getItem("categoriaCardapio");
        const addId = sessionStorage.getItem("adicionarAposLogin");

        if (busca) {
            this.termoBusca = busca;
            const input = document.getElementById("busca-cardapio");
            if (input) input.value = busca;
            sessionStorage.removeItem("buscaCardapio");
        }

        if (cat) {
            this.categoriaAtiva = cat;
            sessionStorage.removeItem("categoriaCardapio");
        }

        if (addId) {
            Carrinho.adicionar(addId);
            sessionStorage.removeItem("adicionarAposLogin");
            return true;
        }
        return false;
    },

    registrarEventos() {
        document.getElementById("btn-carrinho-topo")?.addEventListener("click", () => this.abrirCarrinho());
        document.getElementById("btn-fechar-carrinho")?.addEventListener("click", () => this.fecharCarrinho());
        document.getElementById("overlay-carrinho")?.addEventListener("click", () => this.fecharCarrinho());
        document.getElementById("btn-finalizar")?.addEventListener("click", () => this.finalizarPedido());
        document.getElementById("btn-limpar-carrinho")?.addEventListener("click", () => {
            if (confirm("Limpar todo o carrinho?")) {
                Carrinho.limpar();
                this.atualizarCarrinho();
            }
        });
        document.getElementById("btn-fechar-sucesso")?.addEventListener("click", () => {
            document.getElementById("modal-sucesso").hidden = true;
        });

        document.getElementById("busca-cardapio")?.addEventListener("input", (e) => {
            this.termoBusca = e.target.value.toLowerCase();
            this.renderCardapio();
        });
    },

    renderCategorias() {
        const container = document.getElementById("filtro-categorias");
        if (!container) return;

        container.innerHTML = CATEGORIAS.map(
            (cat) => `
            <button type="button" class="pill-categoria ${cat.id === this.categoriaAtiva ? "ativa" : ""}"
                data-categoria="${cat.id}">${cat.nome}</button>
        `
        ).join("");

        container.querySelectorAll("[data-categoria]").forEach((btn) => {
            btn.addEventListener("click", () => {
                this.categoriaAtiva = btn.dataset.categoria;
                container.querySelectorAll(".pill-categoria").forEach((b) => b.classList.remove("ativa"));
                btn.classList.add("ativa");
                this.renderCardapio();
            });
        });
    },

    produtosFiltrados() {
        return CARDAPIO.filter((p) => {
            const okCategoria = this.categoriaAtiva === "todos" || p.categoria === this.categoriaAtiva;
            const okBusca =
                !this.termoBusca ||
                p.nome.toLowerCase().includes(this.termoBusca) ||
                p.descricao.toLowerCase().includes(this.termoBusca);
            return okCategoria && okBusca;
        });
    },

    renderCardapio() {
        const lista = document.getElementById("lista-produtos");
        const vazio = document.getElementById("cardapio-vazio");
        const produtos = this.produtosFiltrados();

        if (!lista) return;

        if (produtos.length === 0) {
            lista.innerHTML = "";
            if (vazio) vazio.hidden = false;
            return;
        }

        if (vazio) vazio.hidden = true;

        lista.innerHTML = produtos
            .map(
                (p) => `
            <article class="produto-card" data-id="${p.id}">
                ${htmlImagemProduto(p, "produto-foto")}
                <div class="produto-info">
                    <h3>${p.nome}</h3>
                    <p>${p.descricao}</p>
                    <div class="produto-rodape">
                        <strong>${formatarPreco(p.preco)}</strong>
                        <button type="button" class="btn-adicionar" data-adicionar="${p.id}">
                            Adicionar
                        </button>
                    </div>
                </div>
            </article>
        `
            )
            .join("");

        lista.querySelectorAll("[data-adicionar]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.adicionar;
                Carrinho.adicionar(id);
                this.atualizarCarrinho();
                this.abrirCarrinho();
                btn.textContent = "Adicionado ✓";
                setTimeout(() => {
                    btn.textContent = "Adicionar";
                }, 900);
            });
        });
    },

    abrirCarrinho() {
        this.carrinhoAberto = true;
        document.getElementById("painel-carrinho")?.classList.add("aberto");
        document.getElementById("overlay-carrinho")?.classList.add("visivel");
        document.body.classList.add("sem-scroll");
    },

    fecharCarrinho() {
        this.carrinhoAberto = false;
        document.getElementById("painel-carrinho")?.classList.remove("aberto");
        document.getElementById("overlay-carrinho")?.classList.remove("visivel");
        document.body.classList.remove("sem-scroll");
    },

    atualizarBadge() {
        const qtd = Carrinho.quantidadeTotal();
        const badge = document.getElementById("badge-carrinho");
        if (!badge) return;
        badge.textContent = qtd;
        badge.hidden = qtd === 0;
    },

    atualizarCarrinho() {
        this.atualizarBadge();
        const container = document.getElementById("itens-carrinho");
        const resumo = document.getElementById("resumo-valores");
        const btnFinalizar = document.getElementById("btn-finalizar");
        const itens = Carrinho.detalhes();

        if (!container) return;

        if (itens.length === 0) {
            container.innerHTML = `<p class="carrinho-vazio">Seu carrinho está vazio. Adicione pratos típicos!</p>`;
            if (resumo) resumo.innerHTML = "";
            if (btnFinalizar) btnFinalizar.disabled = true;
            return;
        }

        if (btnFinalizar) btnFinalizar.disabled = false;

        container.innerHTML = itens
            .map(
                (item) => `
            <div class="item-carrinho" data-id="${item.id}">
                ${htmlImagemCarrinho(item)}
                <div class="item-dados">
                    <strong>${item.nome}</strong>
                    <span>${formatarPreco(item.preco)}</span>
                </div>
                <div class="item-qtd">
                    <button type="button" class="btn-qtd" data-menos="${item.id}" aria-label="Menos">−</button>
                    <span>${item.quantidade}</span>
                    <button type="button" class="btn-qtd" data-mais="${item.id}" aria-label="Mais">+</button>
                </div>
                <strong class="item-subtotal">${formatarPreco(item.subtotal)}</strong>
            </div>
        `
            )
            .join("");

        container.querySelectorAll("[data-mais]").forEach((btn) => {
            btn.addEventListener("click", () => {
                Carrinho.alterarQuantidade(btn.dataset.mais, 1);
                this.atualizarCarrinho();
            });
        });

        container.querySelectorAll("[data-menos]").forEach((btn) => {
            btn.addEventListener("click", () => {
                Carrinho.alterarQuantidade(btn.dataset.menos, -1);
                this.atualizarCarrinho();
            });
        });

        if (resumo) {
            const sub = Carrinho.subtotal();
            const total = Carrinho.totalComEntrega();
            resumo.innerHTML = `
                <div class="linha-resumo"><span>Subtotal</span><span>${formatarPreco(sub)}</span></div>
                <div class="linha-resumo"><span>Entrega</span><span>${formatarPreco(TAXA_ENTREGA)}</span></div>
                <div class="linha-resumo total"><span>Total</span><span>${formatarPreco(total)}</span></div>
            `;
        }
    },

    finalizarPedido() {
        const endereco = document.getElementById("endereco-entrega")?.value.trim();
        const pagamento = document.getElementById("forma-pagamento")?.value;
        const msg = document.getElementById("msg-checkout");

        if (Carrinho.detalhes().length === 0) {
            this.mostrarMsg(msg, "Adicione itens ao carrinho.", "erro");
            return;
        }

        if (!endereco) {
            this.mostrarMsg(msg, "Informe o endereço de entrega.", "erro");
            return;
        }

        const lgpd = document.getElementById("lgpd-checkout");
        if (!lgpd || !lgpd.checked) {
            this.mostrarMsg(
                msg,
                "Você precisa concordar com o uso dos seus dados (LGPD) para continuar com o pagamento.",
                "erro"
            );
            lgpd?.focus();
            return;
        }

        const pedido = Pedidos.registrar({ endereco, pagamento, lgpdAceito: true });
        this.atualizarCarrinho();
        this.fecharCarrinho();

        const modal = document.getElementById("modal-sucesso");
        const texto = document.getElementById("texto-sucesso");
        if (modal && texto) {
            texto.textContent = `Pedido #${pedido.id} confirmado! Total: ${formatarPreco(pedido.total)}. Entrega em até 45 min.`;
            modal.hidden = false;
        }

        if (msg) msg.hidden = true;

        const lgpdCheck = document.getElementById("lgpd-checkout");
        if (lgpdCheck) lgpdCheck.checked = false;
    },

    mostrarMsg(el, texto, tipo) {
        if (!el) return;
        el.textContent = texto;
        el.className = `msg-checkout msg-checkout--${tipo}`;
        el.hidden = false;
    }
};

document.addEventListener("DOMContentLoaded", () => Compras.iniciar());
