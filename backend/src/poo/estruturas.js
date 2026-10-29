// OmniLog Hub — UC4
// Pilha (LIFO) e fila (FIFO).

class Pilha {
    constructor() {
        this.itens = [];
    }

    empilhar(item) {
        this.itens.push(item);
    }

    desempilhar() {
        if (this.estaVazia()) return null;
        return this.itens.pop();
    }

    topo() {
        if (this.estaVazia()) return null;
        return this.itens[this.itens.length - 1];
    }

    estaVazia() {
        return this.itens.length === 0;
    }

    tamanho() {
        return this.itens.length;
    }
}

class Fila {
    constructor() {
        this.itens = [];
    }

    adicionar(item) {
        this.itens.push(item);
    }

    remover() {
        if (this.estaVazia()) return null;
        return this.itens.shift();
    }

    primeiro() {
        if (this.estaVazia()) return null;
        return this.itens[0];
    }

    estaVazia() {
        return this.itens.length === 0;
    }

    tamanho() {
        return this.itens.length;
    }
}

module.exports = { Pilha, Fila };
