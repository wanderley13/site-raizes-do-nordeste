/**
Muito desse codigo em js pedi ajuda do "cursor" mas fiz algumas alterações
Autenticação — usado em todas as páginas.
Guarda o usuário logado em localStorage ("usuarioLogado").
 */
const Auth = {
    getUsuario() {
        return localStorage.getItem("usuarioLogado");
    },

    estaLogado() {
        return Boolean(this.getUsuario());
    },

    /** Redireciona para login se não estiver logado. Retorna false nesse caso. */
    exigirLogin(paginaLogin = "login.html") {
        if (this.estaLogado()) return true;

        const volta = encodeURIComponent(window.location.pathname.split("/").pop() || "compras.html");
        window.location.href = `${paginaLogin}?redirect=${volta}`;
        return false;
    },

    logout() {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    },

    /** Atualiza links Login/Cadastro/Usuário no menu do header. */
    atualizarMenu() {
        const usuario = this.getUsuario();
        const login = document.getElementById("menu-login");
        const cadastro = document.getElementById("menu-cadastro");
        const menuUsuario = document.getElementById("menu-usuario");
        const menuCompras = document.getElementById("menu-compras");

        /* Link Cardápio sempre visível na home */
        if (menuCompras) {
            menuCompras.style.display = "";
        }

        if (!login || !cadastro || !menuUsuario) return;

        if (usuario) {
            login.style.display = "none";
            cadastro.style.display = "none";
            menuUsuario.style.display = "flex";
            menuUsuario.innerHTML = `
                <div class="icone-usuario" aria-hidden="true">${usuario.charAt(0).toUpperCase()}</div>
                <span class="nome-usuario">Olá, ${usuario}</span>
                <button type="button" class="btn-sair" data-auth-logout>Sair</button>
            `;
            menuUsuario.querySelector("[data-auth-logout]")?.addEventListener("click", () => this.logout());
        } else {
            login.style.display = "";
            cadastro.style.display = "";
            menuUsuario.style.display = "none";
        }
    },

    /** Depois do login, volta para a página que o usuário queria. */
    redirecionarAposLogin(padrao = "index.html") {
        const params = new URLSearchParams(window.location.search);
        const destino = params.get("redirect");
        window.location.href = destino && !destino.includes("://") ? destino : padrao;
    },

    mostrarMensagem(id, texto, tipo) {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = texto;
        el.className = "mensagem mensagem--" + tipo;
        el.hidden = false;
    },

    fazerCadastro() {
        const usuario = document.getElementById("cad-user")?.value.trim();
        const senha = document.getElementById("cad-pass")?.value;
        const lgpd = document.getElementById("lgpd-cadastro");

        if (!usuario || !senha) {
            this.mostrarMensagem("msg-cadastro", "Preencha usuário e senha.", "erro");
            return;
        }

        if (lgpd && !lgpd.checked) {
            this.mostrarMensagem(
                "msg-cadastro",
                "É necessário concordar com o uso dos seus dados (LGPD) para se cadastrar.",
                "erro"
            );
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        if (usuarios.find((u) => u.usuario === usuario)) {
            this.mostrarMensagem("msg-cadastro", "Este usuário já existe. Faça login.", "erro");
            return;
        }

        usuarios.push({ usuario, senha });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        window.location.href = "login.html";
    },

    fazerLogin() {
        const usuario = document.getElementById("login-user")?.value.trim();
        const senha = document.getElementById("login-pass")?.value;

        if (!usuario || !senha) {
            this.mostrarMensagem("msg-login", "Preencha usuário e senha.", "erro");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const user = usuarios.find((u) => u.usuario === usuario && u.senha === senha);

        if (user) {
            localStorage.setItem("usuarioLogado", usuario);
            this.redirecionarAposLogin("index.html");
        } else {
            this.mostrarMensagem("msg-login", "Usuário ou senha inválidos.", "erro");
        }
    }
};

function initMenuMobile() {
    const btn = document.getElementById("btn-menu");
    const nav = document.getElementById("nav-principal");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
        const aberto = nav.classList.toggle("aberto");
        btn.setAttribute("aria-expanded", aberto ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("aberto");
            btn.setAttribute("aria-expanded", "false");
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    Auth.atualizarMenu();
    initMenuMobile();

    document.getElementById("btn-login")?.addEventListener("click", () => Auth.fazerLogin());
    document.getElementById("btn-cadastro")?.addEventListener("click", () => Auth.fazerCadastro());

    document.getElementById("form-login")?.addEventListener("submit", (e) => {
        e.preventDefault();
        Auth.fazerLogin();
    });

    document.getElementById("form-cadastro")?.addEventListener("submit", (e) => {
        e.preventDefault();
        Auth.fazerCadastro();
    });
});
