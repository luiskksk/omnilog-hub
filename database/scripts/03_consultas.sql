USE omnilog_hub;

-- Consulta 1: produtos, categoria e preço
SELECT p.id, p.nome, p.sku, c.nome AS categoria, p.preco
FROM produtos p
LEFT JOIN categorias c ON c.id = p.categoria_id
ORDER BY p.nome;

-- Consulta 2: estoque por armazém e produto
SELECT a.nome AS armazem, p.nome AS produto, e.quantidade
FROM estoque e
JOIN armazens a ON a.id = e.armazem_id
JOIN produtos p ON p.id = e.produto_id
ORDER BY a.nome, p.nome;

-- Consulta 3: valor total de pedidos por cliente
SELECT c.id, c.nome, COUNT(p.id) AS total_pedidos,
       COALESCE(SUM(p.valor_total), 0) AS valor_total
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
GROUP BY c.id, c.nome
ORDER BY valor_total DESC;

-- Consulta 4: produtos abaixo de um limite de estoque
SELECT p.nome, a.nome AS armazem, e.quantidade
FROM estoque e
JOIN produtos p ON p.id = e.produto_id
JOIN armazens a ON a.id = e.armazem_id
WHERE e.quantidade < 10
ORDER BY e.quantidade ASC;

-- Consulta 5: pedidos com cliente, itens e produtos
SELECT pe.id AS pedido_id, c.nome AS cliente,
       p.nome AS produto, ip.quantidade,
       ip.preco_unitario,
       ip.quantidade * ip.preco_unitario AS subtotal,
       pe.status
FROM pedidos pe
JOIN clientes c ON c.id = pe.cliente_id
JOIN itens_pedido ip ON ip.pedido_id = pe.id
JOIN produtos p ON p.id = ip.produto_id
ORDER BY pe.id, p.nome;

-- Consulta 6: pedidos acima da média de valores
SELECT id, cliente_id, valor_total, status
FROM pedidos
WHERE valor_total > (
    SELECT AVG(valor_total) FROM pedidos
)
ORDER BY valor_total DESC;

-- Consulta 7: entregas e seus eventos de acompanhamento
SELECT en.id AS entrega_id, en.status AS status_atual,
       ev.status AS status_evento, ev.descricao,
       ev.localizacao, ev.ocorrido_em
FROM entregas en
LEFT JOIN eventos_entrega ev ON ev.entrega_id = en.id
ORDER BY en.id, ev.ocorrido_em;

-- Consulta 8: classificação dos produtos por preço
SELECT nome, preco,
       DENSE_RANK() OVER (ORDER BY preco DESC) AS posicao_preco
FROM produtos;

-- Consulta 9: movimentações de estoque com responsável
SELECT m.id, p.nome AS produto, a.nome AS armazem,
       u.nome AS responsavel, m.tipo, m.quantidade,
       m.motivo, m.criado_em
FROM movimentacoes_estoque m
JOIN produtos p ON p.id = m.produto_id
JOIN armazens a ON a.id = m.armazem_id
LEFT JOIN usuarios u ON u.id = m.usuario_id
ORDER BY m.criado_em DESC;

-- Consulta 10: resumo de entregas por status
SELECT status, COUNT(*) AS total_entregas
FROM entregas
GROUP BY status
ORDER BY total_entregas DESC;
