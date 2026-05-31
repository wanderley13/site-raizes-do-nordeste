
const Index = {
    destaques: ["acaraje", "baião", "carne-sol", "tapioca", "bolo-rolo", "cuscuz", "cartola", "cajuina"],

    emojiCategoria: {
        salgados: "🥟",
        pratos: "🍛",
        doces: "🍰",
        bebidas: "🥤☕"
    },

    iniciar() {
        this.renderCategorias();
        this.renderDestaques();
        this.registrarLinksProtegidos();
        this.registrarBusca();
    },

    irParaCardapio(opcoes = {}) {
        if (opcoes.busca) sessionStorage.setItem("buscaCardapio", opcoes.busca);
        if (opcoes.categoria) sessionStorage.setItem("categoriaCardapio", opcoes.categoria);

        if (!Auth.estaLogado()) {
            window.location.href = "login.html?redirect=compras.html";
            return;
        }
        window.location.href = "compras.html";
    },

    registrarLinksProtegidos() {
        ["btn-pedir-agora", "btn-cta-final", "link-ver-tudo", "nav-cardapio"].forEach((id) => {
            document.getElementById(id)?.addEventListener("click", (e) => {
                e.preventDefault();
                this.irParaCardapio();
            });
        });
    },

    registrarBusca() {
        document.getElementById("form-busca-inicio")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const termo = document.getElementById("busca-inicio")?.value.trim() || "";
            this.irParaCardapio({ busca: termo });
        });
    },

    renderCategorias() {
        const container = document.getElementById("lista-categorias-home");
        if (!container) return;

        container.innerHTML = CATEGORIAS.filter((c) => c.id !== "todos")
            .map(
                (cat) => `
            <button type="button" class="cat-card" data-categoria="${cat.id}">
                <span class="cat-emoji">${this.emojiCategoria[cat.id] || "🍽️"}</span>
                <span>${cat.nome}</span>
            </button>`
            )
            .join("");

        container.querySelectorAll("[data-categoria]").forEach((btn) => {
            btn.addEventListener("click", () => {
                this.irParaCardapio({ categoria: btn.dataset.categoria });
            });
        });
    },

    renderDestaques() {
        const grid = document.getElementById("grid-destaques");
        if (!grid) return;

        grid.innerHTML = this.destaques
            .map(buscarProduto)
            .filter(Boolean)
            .map(
                (p) => `
            <article class="destaque-card">
                ${htmlImagemProduto(p, "produto-foto destaque-foto")}
                <div class="destaque-corpo">
                    <h3>${p.nome}</h3>
                    <p>${p.descricao}</p>
                    <div class="destaque-rodape">
                        <strong>${formatarPreco(p.preco)}</strong>
                        <button type="button" class="btn-adicionar-home" data-id="${p.id}">Adicionar</button>
                    </div>
                </div>
            </article>`
            )
            .join("");

        grid.querySelectorAll(".btn-adicionar-home").forEach((btn) => {
            btn.addEventListener("click", () => {
                sessionStorage.setItem("adicionarAposLogin", btn.dataset.id);
                if (!Auth.estaLogado()) {
                    window.location.href = "login.html?redirect=compras.html";
                    return;
                }
                window.location.href = "compras.html";
            });
        });
    }
};

document.addEventListener("DOMContentLoaded", () => Index.iniciar());
