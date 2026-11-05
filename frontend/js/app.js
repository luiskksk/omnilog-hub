const API = 'http://localhost:3000/api';

const lista = document.getElementById('lista-produtos');
const pesquisa = document.getElementById('pesquisa');

let produtos = [];

async function verificarAPI() {
    const status = document.getElementById('status-api');
    const resumo = document.getElementById('status-resumo');
    const bolinha = document.querySelector('.bolinha');

    try {
        const resposta = await fetch(`${API}/health`);

        if (!resposta.ok) {
            throw new Error('API indisponível');
        }

        status.textContent = 'Sistema conectado';
        resumo.textContent = 'Online';
        bolinha.style.background = '#22c55e';
    } catch (erro) {
        status.textContent = 'Sistema desconectado';
        resumo.textContent = 'Offline';
        bolinha.style.background = '#ef4444';
    }
}

async function carregarProdutos() {
    try {
        const resposta = await fetch(`${API}/produtos`);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar produtos');
        }

        const dados = await resposta.json();

        produtos = dados.produtos || [];

        document.getElementById('total-produtos').textContent =
            dados.total ?? produtos.length;

        mostrarProdutos(produtos);
    } catch (erro) {
        lista.innerHTML = '<p>Não foi possível carregar os produtos. Verifique se o servidor está ligado.</p>';
    }
}

function mostrarProdutos(listaProdutos) {
    if (listaProdutos.length === 0) {
        lista.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    lista.innerHTML = listaProdutos.map(produto => `
        <article class="produto">
            <h3>${escapar(produto.nome)}</h3>
            <p>SKU: ${escapar(produto.sku)}</p>
            <p>Peso: ${produto.peso_kg ?? 'Não informado'} kg</p>
            <p class="preco">
                R$ ${Number(produto.preco).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                })}
            </p>
        </article>
    `).join('');
}

function escapar(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, caractere => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[caractere]);
}

pesquisa.addEventListener('input', () => {
    const termo = pesquisa.value.toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.sku.toLowerCase().includes(termo)
    );

    mostrarProdutos(filtrados);
});

verificarAPI();
carregarProdutos();
