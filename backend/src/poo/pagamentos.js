// OmniLog Hub — UC4
// Estratégias diferentes para processar pagamentos.

class Pagamento {
    pagar(valor) {
        throw new Error("Método pagar deve ser implementado.");
    }
}

class PagamentoPix extends Pagamento {
    pagar(valor) {
        validarValor(valor);
        return {
            metodo: "PIX",
            valor,
            status: "aprovado",
            mensagem: "Pagamento PIX simulado com sucesso."
        };
    }
}

class PagamentoCartao extends Pagamento {
    pagar(valor) {
        validarValor(valor);
        return {
            metodo: "Cartão",
            valor,
            status: "aprovado",
            mensagem: "Pagamento com cartão simulado com sucesso."
        };
    }
}

class PagamentoDinheiro extends Pagamento {
    pagar(valor) {
        validarValor(valor);
        return {
            metodo: "Dinheiro",
            valor,
            status: "aprovado",
            mensagem: "Pagamento em dinheiro registrado."
        };
    }
}

function validarValor(valor) {
    if (typeof valor !== "number" ||
        !Number.isFinite(valor) ||
        valor <= 0) {
        throw new Error("O valor deve ser positivo.");
    }
}

module.exports = {
    Pagamento,
    PagamentoPix,
    PagamentoCartao,
    PagamentoDinheiro
};
