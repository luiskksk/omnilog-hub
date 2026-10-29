// OmniLog Hub — UC2
// Alocação simplificada de cargas em posições de um armazém 3D.
// Cada posição recebe no máximo uma carga.
// Cargas perigosas não podem ficar adjacentes a cargas incompatíveis.

function alocarCargas(armazem, cargas) {
    const { largura, profundidade, altura, limitePeso } = armazem;

    for (const valor of [largura, profundidade, altura]) {
        if (!Number.isInteger(valor) || valor <= 0) {
            throw new Error("As dimensões devem ser inteiros positivos.");
        }
    }

    if (typeof limitePeso !== "number" ||
        !Number.isFinite(limitePeso) || limitePeso <= 0) {
        throw new Error("O limite de peso deve ser positivo.");
    }

    if (!Array.isArray(cargas)) {
        throw new Error("As cargas devem ser fornecidas em uma lista.");
    }

    const ocupadas = new Map();
    const alocacoes = [];
    let pesoTotal = 0;

    function chave(x, y, z) {
        return `${x},${y},${z}`;
    }

    function vizinhos(x, y, z) {
        return [
            [x + 1, y, z], [x - 1, y, z],
            [x, y + 1, z], [x, y - 1, z],
            [x, y, z + 1], [x, y, z - 1]
        ];
    }

    for (const carga of cargas) {
        if (!carga.id ||
            typeof carga.peso !== "number" ||
            !Number.isFinite(carga.peso) ||
            carga.peso <= 0) {
            throw new Error("Cada carga precisa de ID e peso positivo.");
        }

        if (alocacoes.some(item => item.id === carga.id)) {
            throw new Error(`ID de carga duplicado: ${carga.id}`);
        }

        if (pesoTotal + carga.peso > limitePeso) {
            alocacoes.push({
                id: carga.id,
                alocada: false,
                motivo: "Limite de peso do armazém excedido."
            });
            continue;
        }

        let posicao = null;

        for (let z = 0; z < altura && !posicao; z++) {
            for (let y = 0; y < profundidade && !posicao; y++) {
                for (let x = 0; x < largura && !posicao; x++) {
                    if (ocupadas.has(chave(x, y, z))) {
                        continue;
                    }

                    const incompatível = vizinhos(x, y, z).some(
                        ([nx, ny, nz]) => {
                            const vizinha = ocupadas.get(chave(nx, ny, nz));

                            return vizinha &&
                                ((carga.perigosa && vizinha.incompativel) ||
                                 (carga.incompativel && vizinha.perigosa));
                        }
                    );

                    if (!incompatível) {
                        posicao = { x, y, z };
                    }
                }
            }
        }

        if (!posicao) {
            alocacoes.push({
                id: carga.id,
                alocada: false,
                motivo: "Não há posição segura disponível."
            });
            continue;
        }

        ocupadas.set(chave(posicao.x, posicao.y, posicao.z), carga);
        pesoTotal += carga.peso;

        alocacoes.push({
            id: carga.id,
            alocada: true,
            posicao,
            peso: carga.peso
        });
    }

    return { alocacoes, pesoTotal };
}

// Exemplo com dados fictícios.
if (require.main === module) {
    const resultado = alocarCargas(
        { largura: 2, profundidade: 2, altura: 2, limitePeso: 100 },
        [
            { id: "P1", peso: 20 },
            { id: "P2", peso: 15, perigosa: true, incompativel: true },
            { id: "P3", peso: 10, incompativel: true },
            { id: "P4", peso: 70 }
        ]
    );

    console.log(JSON.stringify(resultado, null, 2));
}

module.exports = { alocarCargas };
