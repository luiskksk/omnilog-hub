-- OmniLog Hub — Dados iniciais para testes
USE omnilog_hub;

INSERT IGNORE INTO categorias (nome, descricao) VALUES
('Eletrônicos', 'Equipamentos e acessórios eletrônicos'),
('Informática', 'Computadores e periféricos'),
('Acessórios', 'Acessórios em geral');

INSERT IGNORE INTO armazens (nome, endereco, capacidade_kg) VALUES
('Armazém Central', 'Rua das Indústrias, 100', 10000.00),
('Armazém Secundário', 'Avenida Logística, 250', 5000.00);

INSERT IGNORE INTO produtos
(categoria_id, nome, descricao, sku, preco, peso_kg)
SELECT id, 'Teclado USB', 'Teclado para computador', 'TEC-001', 89.90, 0.600
FROM categorias WHERE nome = 'Informática';

INSERT IGNORE INTO produtos
(categoria_id, nome, descricao, sku, preco, peso_kg)
SELECT id, 'Mouse USB', 'Mouse para computador', 'MOU-001', 49.90, 0.150
FROM categorias WHERE nome = 'Informática';

INSERT IGNORE INTO produtos
(categoria_id, nome, descricao, sku, preco, peso_kg)
SELECT id, 'Fone de ouvido', 'Fone de ouvido com fio', 'FON-001', 59.90, 0.250
FROM categorias WHERE nome = 'Acessórios';

INSERT IGNORE INTO estoque (armazem_id, produto_id, quantidade)
SELECT a.id, p.id,
    CASE p.sku
        WHEN 'TEC-001' THEN 40
        WHEN 'MOU-001' THEN 70
        WHEN 'FON-001' THEN 30
    END
FROM armazens a
CROSS JOIN produtos p
WHERE a.nome = 'Armazém Central'
  AND p.sku IN ('TEC-001', 'MOU-001', 'FON-001');

-- Consultas para conferir os dados
SELECT * FROM categorias;
SELECT * FROM armazens;
SELECT * FROM produtos;
SELECT * FROM estoque;
