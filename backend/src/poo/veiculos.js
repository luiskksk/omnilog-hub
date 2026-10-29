// OmniLog Hub — UC4
// Herança e polimorfismo aplicados aos veículos.

class Veiculo {
    constructor(placa, capacidadeKg) {
        if (!placa || typeof placa !== "string") {
            throw new Error("A placa é obrigatória.");
        }

        if (typeof capacidadeKg !== "number" ||
            !Number.isFinite(capacidadeKg) ||
            capacidadeKg <= 0) {
            throw new Error("A capacidade deve ser positiva.");
        }

        this.placa = placa;
        this.capacidadeKg = capacidadeKg;
    }

    calcularCusto(distanciaKm) {
        throw new Error("O método deve ser implementado pela classe filha.");
    }

    descrever() {
        return `${this.constructor.name} - Placa: ${this.placa}`;
    }
}

class Caminhao extends Veiculo {
    calcularCusto(distanciaKm) {
        validarDistancia(distanciaKm);
        return distanciaKm * 4.50;
    }
}

class Van extends Veiculo {
    calcularCusto(distanciaKm) {
        validarDistancia(distanciaKm);
        return distanciaKm * 2.20;
    }
}

class Moto extends Veiculo {
    calcularCusto(distanciaKm) {
        validarDistancia(distanciaKm);
        return distanciaKm * 1.10;
    }
}

function validarDistancia(distanciaKm) {
    if (typeof distanciaKm !== "number" ||
        !Number.isFinite(distanciaKm) ||
        distanciaKm < 0) {
        throw new Error("A distância deve ser um número não negativo.");
    }
}

module.exports = { Veiculo, Caminhao, Van, Moto };
