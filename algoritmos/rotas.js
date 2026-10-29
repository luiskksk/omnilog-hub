// OmniLog Hub — UC2
// Algoritmo de menor rota usando a matriz de distâncias.
// Valores null representam locais sem ligação direta.

function menorRota(matriz, origem, destino) {
    const total = matriz.length;

    if (total === 0 || origem < 0 || destino < 0 ||
        origem >= total || destino >= total ||
        origem !== Math.floor(origem) ||
        destino !== Math.floor(destino)) {
        throw new Error("Origem ou destino inválido.");
    }

    if (matriz.some(linha =>
        !Array.isArray(linha) || linha.length !== total
    )) {
        throw new Error("A matriz deve ser quadrada.");
    }

    for (let i = 0; i < total; i++) {
        for (let j = 0; j < total; j++) {
            const distancia = matriz[i][j];

            if (distancia !== null &&
                (typeof distancia !== "number" ||
                 !Number.isFinite(distancia) ||
                 distancia < 0)) {
                throw new Error("Distâncias devem ser números não negativos ou null.");
            }
        }
    }

    const distancias = Array(total).fill(Infinity);
    const anteriores = Array(total).fill(null);
    const visitados = Array(total).fill(false);

    distancias[origem] = 0;

    for (let passo = 0; passo < total; passo++) {
        let atual = -1;

        for (let i = 0; i < total; i++) {
            if (!visitados[i] &&
                (atual === -1 || distancias[i] < distancias[atual])) {
                atual = i;
            }
        }

        if (atual === -1 || distancias[atual] === Infinity) {
            break;
        }

        if (atual === destino) {
            break;
        }

        visitados[atual] = true;

        for (let vizinho = 0; vizinho < total; vizinho++) {
            const distancia = matriz[atual][vizinho];

            if (distancia !== null && !visitados[vizinho]) {
                const novaDistancia = distancias[atual] + distancia;

                if (novaDistancia < distancias[vizinho]) {
                    distancias[vizinho] = novaDistancia;
                    anteriores[vizinho] = atual;
                }
            }
        }
    }

    if (distancias[destino] === Infinity) {
        return { distancia: null, rota: [] };
    }

    const rota = [];
    let atual = destino;

    while (atual !== null) {
        rota.unshift(atual);
        atual = anteriores[atual];
    }

    return {
        distancia: distancias[destino],
        rota
    };
}

// Exemplo: locais A, B, C e D.
// As distâncias são fictícias e representam quilômetros.
const matriz = [
    [0, 4, 2, null],
    [4, 0, 1, 5],
    [2, 1, 0, 8],
    [null, 5, 8, 0]
];

if (require.main === module) {
    const resultado = menorRota(matriz, 0, 3);

    console.log("Menor rota:", resultado.rota.join(" -> "));
    console.log("Distância total:", resultado.distancia, "km");
}

module.exports = { menorRota };
