// Testes automatizados dos algoritmos da UC2.
const assert = require("node:assert/strict");
const { menorRota } = require("../rotas");
const { alocarCargas } = require("../alocacao-armazem");

// Teste 1: encontra a menor rota.
const matriz = [
    [0, 4, 2, null],
    [4, 0, 1, 5],
    [2, 1, 0, 8],
    [null, 5, 8, 0]
];

const rota = menorRota(matriz, 0, 3);
assert.deepEqual(rota.rota, [0, 2, 1, 3]);
assert.equal(rota.distancia, 8);

// Teste 2: destino sem ligação.
assert.deepEqual(
    menorRota([[0, null], [null, 0]], 0, 1),
    { distancia: null, rota: [] }
);

// Teste 3: rejeita índices inválidos.
assert.throws(() => menorRota(matriz, -1, 2));

// Teste 4: respeita o limite de peso.
const estoque = alocarCargas(
    { largura: 2, profundidade: 1, altura: 1, limitePeso: 30 },
    [{ id: "A", peso: 20 }, { id: "B", peso: 15 }]
);
assert.equal(estoque.alocacoes[0].alocada, true);
assert.equal(estoque.alocacoes[1].alocada, false);
assert.equal(estoque.pesoTotal, 20);

// Teste 5: cargas incompatíveis não ficam adjacentes.
const segura = alocarCargas(
    { largura: 2, profundidade: 1, altura: 1, limitePeso: 100 },
    [
        { id: "PERIGOSA", peso: 10, perigosa: true, incompativel: true },
        { id: "INCOMPATIVEL", peso: 10, incompativel: true }
    ]
);
assert.equal(segura.alocacoes[0].alocada, true);
assert.equal(segura.alocacoes[1].alocada, false);

// Teste 6: rejeita dimensões inválidas.
assert.throws(() => alocarCargas(
    { largura: 0, profundidade: 1, altura: 1, limitePeso: 100 }, []
));

console.log("Todos os 6 testes dos algoritmos passaram!");
