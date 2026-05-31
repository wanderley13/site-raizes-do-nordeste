
const CARDAPIO = [
    {
        id: "tapioca",
        nome: "Tapioca recheada",
        descricao: "Carne seca com queijo coalho",
        preco: 18.9,
        categoria: "salgados",
        emoji: "🫓",
        imagem: "http://www.youcanfind.com.br/upload/1455544703.png"
    },
    {
        id: "acaraje",
        nome: "Acarajé (2 un.)",
        descricao: "Vatapá, camarão e pimenta",
        preco: 24.0,
        categoria: "salgados",
        emoji: "🍤",
        imagem: "https://t4.ftcdn.net/jpg/03/76/14/29/240_F_376142924_BVcC6KsBRoiRYI2aevlaGX3ryLOYXlZZ.jpg"
    },
    {
        id: "pastel",
        nome: "Pastel de vento",
        descricao: "Carne de sol e queijo",
        preco: 12.5,
        categoria: "salgados",
        emoji: "🥟",
        imagem: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3319443:1672692668/Massa%20de%20pastel.webp?f=16x9&h=698&w=1280&$p$f$h$w=33a9242"
    },
    {
        id: "cuscuz",
        nome: "Cuscuz nordestino",
        descricao: "Com ovo, coalho e manteiga",
        preco: 16.0,
        categoria: "salgados",
        emoji: "🌽",
        imagem: "https://as2.ftcdn.net/jpg/05/87/31/45/1000_F_587314537_hXrXs8o1k9sCdESrnSkSdjrQWc7SfZi3.jpg"
    },

    {
        id: "baião",
        nome: "Baião de dois",
        descricao: "Arroz, feijão verde e queijo",
        preco: 32.9,
        categoria: "pratos",
        emoji: "🍛",
        imagem: "https://media.istockphoto.com/id/2155326622/pt/foto/bai%C3%A3o-de-dois-traditional-brazilian-food-with-rice-beans-sausage-and-rennet-cheese-close-up.jpg?s=612x612&w=0&k=20&c=B7_odultvgM7dr0LlYHDYLaoYiD9_vPIADyhSnzIvfQ="
    },
    {
        id: "carne-sol",
        nome: "Carne de sol",
        descricao: "Com macaxeira e manteiga",
        preco: 45.9,
        categoria: "pratos",
        emoji: "🥩",
        imagem: "https://media.istockphoto.com/id/1488419276/pt/foto/carne-de-sol-traditional-dish-from-the-brazilian-northeast.jpg?s=612x612&w=0&k=20&c=r9GJcmRiJfBTp01aLbxKLRS6LI6V5BLwkhs0QGX9JXQ="
    },
    {
        id: "buchada",
        nome: "Buchada de bode",
        descricao: "Prato tradicional do sertão",
        preco: 38.0,
        categoria: "pratos",
        emoji: "🍲",
        imagem: "https://t4.ftcdn.net/jpg/04/84/22/53/240_F_484225376_ghU3znMDXF9rYGFxGJTffmhifYvt4U6g.jpg"
    },
    {
        id: "moqueca",
        nome: "Moqueca capixaba",
        descricao: "Peixe, pimentões e azeite",
        preco: 52.0,
        categoria: "pratos",
        emoji: "🐟",
        imagem: "https://s2-g1.glbimg.com/7I4oBMdRh2XT86y8PofSBLlA7Mw=/0x0:1092x612/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/x/x/E764d5S9GGZenreOiApA/captura-de-tela-2023-09-29-as-17.42.28.png"
    },

    {
        id: "bolo-rolo",
        nome: "Bolo de rolo",
        descricao: "Fatia generosa com goiabada",
        preco: 14.0,
        categoria: "doces",
        emoji: "🍰",
        imagem: "https://s2-g1.glbimg.com/VdmsaPSM0PgsOwajQIo9oVNd1m8=/0x0:943x596/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/K/u/YWxf8eTEmeK1k9mETK1g/boloderolo3.jpg"
    },
    {
        id: "cartola",
        nome: "Cartola",
        descricao: "Banana, queijo e canela",
        preco: 19.9,
        categoria: "doces",
        emoji: "🍌",
        imagem: "https://cdn.casaeculinaria.com/wp-content/uploads/2023/04/12121046/Cartola-768x432.jpg"
    },
    {
        id: "pé-moleque",
        nome: "Pé-de-moleque",
        descricao: "Doce de amendoim crocante",
        preco: 8.5,
        categoria: "doces",
        emoji: "🥜",
        imagem: "https://img.cdndsgni.com/preview/10685357.jpg"
    },
    {
        id: "cocada",
        nome: "Cocada queimada",
        descricao: "Coco fresco e açúcar",
        preco: 7.0,
        categoria: "doces",
        emoji: "🥥",
        imagem: "https://s2-g1.glbimg.com/P8KVIRNvyNTB06irPEO0aJlXd1M=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/v/t/fhSXBMTAehMLZcBuTkwg/nc-cocada-queimada-2909242.jpg"
    },

    {
        id: "caldo-cana",
        nome: "Caldo de cana",
        descricao: "500 ml gelado ou natural",
        preco: 9.0,
        categoria: "bebidas",
        emoji: "🧃",
        imagem: "https://media.istockphoto.com/id/1267001589/pt/foto/sugarcane-juice-and-pastel-brazilian-food-caldo-de-cana.jpg?s=612x612&w=0&k=20&c=wlY90RbkVJ3rBaD-Tg9YUoOjjuj1eyppnHj1A7cp5-k="
    },
    {
        id: "cajuina",
        nome: "Cajuína",
        descricao: "Suco de caju 300 ml",
        preco: 11.0,
        categoria: "bebidas",
        emoji: "🍹",
        imagem: "https://dcdn-us.mitiendanube.com/stores/005/076/810/products/e9c7920621faa464cf65cd8d69de099f-e138a9c8d7882067fe17271889176476-1024-1024.webp"
    },
    {
        id: "agua-coco",
        nome: "Água de coco",
        descricao: "Natural, direto do coco",
        preco: 10.0,
        categoria: "bebidas",
        emoji: "🥥",
        imagem: "https://acdn-us.mitiendanube.com/stores/001/719/121/products/coco300ml1-8cd3fecf64e73b32c817454176185036-480-0.jpeg"
    },
    {
        id: "cafe",
        nome: "Café nordestino",
        descricao: "Café forte com leite",
        preco: 6.5,
        categoria: "bebidas",
        emoji: "☕",
        imagem: "https://www.pngarts.com/files/1/Coffee-PNG-Image-Background.png"
    }
];

const CATEGORIAS = [
    { id: "todos", nome: "Todos" },
    { id: "salgados", nome: "Salgados" },
    { id: "pratos", nome: "Pratos" },
    { id: "doces", nome: "Doces" },
    { id: "bebidas", nome: "Bebidas" }
];

const TAXA_ENTREGA = 5.9;

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function buscarProduto(id) {
    return CARDAPIO.find((p) => p.id === id);
}
