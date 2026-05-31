
const PASTA_IMAGENS_PADRAO = "assets/pratos/";


function caminhoImagem(produto) {
    if (!produto) return null;
    if (produto.imagem === false) return null;

    if (produto.imagem && String(produto.imagem).trim()) {
        return produto.imagem.trim();
    }

    return `${PASTA_IMAGENS_PADRAO}${produto.id}.jpg`;
}


function htmlImagemProduto(produto, classe = "produto-foto") {
    const src = caminhoImagem(produto);

    if (!src) {
        return `<div class="${classe} produto-foto--so-emoji" aria-hidden="true">${produto.emoji}</div>`;
    }

    return `
        <div class="${classe}" data-produto-id="${produto.id}">
            <img src="${src}" alt="${produto.nome}" loading="lazy"
                 onerror="this.parentElement.classList.add('sem-imagem')">
            <span class="produto-foto-emoji" aria-hidden="true">${produto.emoji}</span>
        </div>
    `;
}

function htmlImagemCarrinho(produto) {
    return htmlImagemProduto(produto, "item-foto");
}
