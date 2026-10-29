// Testes da UC4 — Programação Orientada a Objetos.
const assert = require("node:assert/strict");

const {
    Veiculo,
    Caminhao,
    Van,
    Moto
} = require("../src/poo/veiculos");

const {
    Pagamento,
    PagamentoPix,
    PagamentoCartao,
    PagamentoDinheiro
} = require("../src/poo/pagamentos");

const { Pilha, Fila } = require("../src/poo/estruturas");

// 1. Herança e cálculo de custo.
const caminhao = new Caminhao("ABC1234", 10000);
const van = new Van("DEF5678", 1500);
const moto = new Moto("GHI9012", 100);

assert.ok(caminhao instanceof Veiculo);
assert.equal(caminhao.calcularCusto(10), 45);
assert.equal(van.calcularCusto(10), 22);
assert.equal(moto.calcularCusto(10), 11);

// 2. Polimorfismo: cada veículo calcula um custo diferente.
const veiculos = [caminhao, van, moto];
assert.deepEqual(
    veiculos.map(veiculo => veiculo.calcularCusto(20)),
    [90, 44, 22]
);

// 3. Validação dos veículos.
assert.throws(() => new Van("", 100));
assert.throws(() => new Moto("XYZ1234", 0));
assert.throws(() => van.calcularCusto(-1));

// 4. Métodos de pagamento.
assert.equal(new PagamentoPix().pagar(50).status, "aprovado");
assert.equal(new PagamentoCartao().pagar(80).metodo, "Cartão");
assert.equal(new PagamentoDinheiro().pagar(25).valor, 25);
assert.throws(() => new PagamentoPix().pagar(-10));
assert.throws(() => new Pagamento().pagar(10));

// 5. Pilha: último que entra é o primeiro que sai.
const pilha = new Pilha();
assert.equal(pilha.desempilhar(), null);
pilha.empilhar("A");
pilha.empilhar("B");
assert.equal(pilha.topo(), "B");
assert.equal(pilha.desempilhar(), "B");
assert.equal(pilha.desempilhar(), "A");
assert.equal(pilha.estaVazia(), true);

// 6. Fila: primeiro que entra é o primeiro que sai.
const fila = new Fila();
assert.equal(fila.remover(), null);
fila.adicionar("Pedido 1");
fila.adicionar("Pedido 2");
assert.equal(fila.primeiro(), "Pedido 1");
assert.equal(fila.remover(), "Pedido 1");
assert.equal(fila.remover(), "Pedido 2");
assert.equal(fila.estaVazia(), true);

console.log("Todos os testes de POO passaram!");
