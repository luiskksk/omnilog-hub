-- OmniLog Hub
-- UC3: Banco de Dados
-- Compatibilidade: MySQL 8.0+

CREATE DATABASE IF NOT EXISTS omnilog_hub
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE omnilog_hub;

-- 1. Usuários do sistema
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil VARCHAR(30) NOT NULL DEFAULT 'operador',
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_usuario_perfil
        CHECK (perfil IN ('administrador', 'gerente', 'operador'))
);

-- 2. Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(160) UNIQUE,
    telefone VARCHAR(25),
    documento VARCHAR(20) UNIQUE,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Armazéns
CREATE TABLE IF NOT EXISTS armazens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    capacidade_kg DECIMAL(12,2) NOT NULL DEFAULT 0,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT chk_armazem_capacidade CHECK (capacidade_kg >= 0)
);

-- 4. Funcionários
CREATE TABLE IF NOT EXISTS funcionarios (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED NOT NULL UNIQUE,
    armazem_id BIGINT UNSIGNED,
    cargo VARCHAR(80) NOT NULL,
    data_admissao DATE,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_func_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_func_armazem
        FOREIGN KEY (armazem_id) REFERENCES armazens(id)
        ON DELETE SET NULL
);

-- 5. Categorias de produtos
CREATE TABLE IF NOT EXISTS categorias (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255)
);

-- 6. Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    categoria_id BIGINT UNSIGNED,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    sku VARCHAR(60) NOT NULL UNIQUE,
    preco DECIMAL(12,2) NOT NULL,
    peso_kg DECIMAL(10,3) NOT NULL DEFAULT 0,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_produto_preco CHECK (preco >= 0),
    CONSTRAINT chk_produto_peso CHECK (peso_kg >= 0),
    CONSTRAINT fk_produto_categoria
        FOREIGN KEY (categoria_id) REFERENCES categorias(id)
        ON DELETE SET NULL
);

-- 7. Estoque por produto e armazém
CREATE TABLE IF NOT EXISTS estoque (
    armazem_id BIGINT UNSIGNED NOT NULL,
    produto_id BIGINT UNSIGNED NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (armazem_id, produto_id),
    CONSTRAINT chk_estoque_quantidade CHECK (quantidade >= 0),
    CONSTRAINT fk_estoque_armazem
        FOREIGN KEY (armazem_id) REFERENCES armazens(id),
    CONSTRAINT fk_estoque_produto
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- 8. Movimentações de estoque
CREATE TABLE IF NOT EXISTS movimentacoes_estoque (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    armazem_id BIGINT UNSIGNED NOT NULL,
    produto_id BIGINT UNSIGNED NOT NULL,
    usuario_id BIGINT UNSIGNED,
    tipo VARCHAR(10) NOT NULL,
    quantidade INT NOT NULL,
    motivo VARCHAR(255),
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_mov_tipo CHECK (tipo IN ('entrada', 'saida')),
    CONSTRAINT chk_mov_quantidade CHECK (quantidade > 0),
    CONSTRAINT fk_mov_estoque
        FOREIGN KEY (armazem_id, produto_id)
        REFERENCES estoque(armazem_id, produto_id),
    CONSTRAINT fk_mov_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE SET NULL
);

-- 9. Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT UNSIGNED NOT NULL,
    usuario_id BIGINT UNSIGNED,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente',
    valor_total DECIMAL(12,2) NOT NULL DEFAULT 0,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_pedido_status
        CHECK (status IN (
            'pendente', 'confirmado', 'separacao',
            'enviado', 'entregue', 'cancelado'
        )),
    CONSTRAINT chk_pedido_total CHECK (valor_total >= 0),
    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    CONSTRAINT fk_pedido_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE SET NULL
);

-- 10. Itens dos pedidos
CREATE TABLE IF NOT EXISTS itens_pedido (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT UNSIGNED NOT NULL,
    produto_id BIGINT UNSIGNED NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(12,2) NOT NULL,
    CONSTRAINT chk_item_quantidade CHECK (quantidade > 0),
    CONSTRAINT chk_item_preco CHECK (preco_unitario >= 0),
    CONSTRAINT fk_item_pedido
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_item_produto
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- 11. Pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT UNSIGNED NOT NULL,
    valor DECIMAL(12,2) NOT NULL,
    metodo VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente',
    pago_em DATETIME,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_pagamento_valor CHECK (valor > 0),
    CONSTRAINT chk_pagamento_status
        CHECK (status IN ('pendente', 'aprovado', 'recusado', 'estornado')),
    CONSTRAINT fk_pagamento_pedido
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

-- 12. Transportadoras
CREATE TABLE IF NOT EXISTS transportadoras (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    documento VARCHAR(30) UNIQUE,
    telefone VARCHAR(25),
    email VARCHAR(160)
);

-- 13. Veículos
CREATE TABLE IF NOT EXISTS veiculos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    transportadora_id BIGINT UNSIGNED,
    placa VARCHAR(10) NOT NULL UNIQUE,
    modelo VARCHAR(100) NOT NULL,
    capacidade_kg DECIMAL(12,2) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT chk_veiculo_capacidade CHECK (capacidade_kg > 0),
    CONSTRAINT fk_veiculo_transportadora
        FOREIGN KEY (transportadora_id) REFERENCES transportadoras(id)
        ON DELETE SET NULL
);

-- 14. Entregas
CREATE TABLE IF NOT EXISTS entregas (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT UNSIGNED NOT NULL UNIQUE,
    transportadora_id BIGINT UNSIGNED,
    veiculo_id BIGINT UNSIGNED,
    endereco_destino VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'aguardando',
    previsao_entrega DATE,
    entregue_em DATETIME,
    CONSTRAINT chk_entrega_status
        CHECK (status IN (
            'aguardando', 'preparando', 'em_transito',
            'entregue', 'atrasada', 'cancelada'
        )),
    CONSTRAINT fk_entrega_pedido
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    CONSTRAINT fk_entrega_transportadora
        FOREIGN KEY (transportadora_id) REFERENCES transportadoras(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_entrega_veiculo
        FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
        ON DELETE SET NULL
);

-- 15. Eventos de acompanhamento das entregas
CREATE TABLE IF NOT EXISTS eventos_entrega (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    entrega_id BIGINT UNSIGNED NOT NULL,
    usuario_id BIGINT UNSIGNED,
    status VARCHAR(30) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    localizacao VARCHAR(180),
    ocorrido_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_evento_entrega
        FOREIGN KEY (entrega_id) REFERENCES entregas(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_evento_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE SET NULL
);

-- Índices para consultas frequentes
CREATE INDEX idx_produtos_nome ON produtos(nome);
CREATE INDEX idx_pedidos_cliente_data ON pedidos(cliente_id, criado_em);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_movimentacoes_data
    ON movimentacoes_estoque(criado_em);
CREATE INDEX idx_entregas_status ON entregas(status);
CREATE INDEX idx_eventos_entrega_data
    ON eventos_entrega(entrega_id, ocorrido_em);

-- Conferência das tabelas
SHOW TABLES;
