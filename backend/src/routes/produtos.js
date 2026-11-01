const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Listar produtos
router.get('/', async (req, res) => {
    try {
        const [produtos] = await pool.execute(
            `SELECT p.id, p.categoria_id, p.nome, p.descricao,
                    p.sku, p.preco, p.peso_kg, p.ativo, p.criado_em
             FROM produtos p
             WHERE p.ativo = TRUE
             ORDER BY p.id DESC`
        );

        return res.status(200).json({
            total: produtos.length,
            produtos
        });
    } catch (erro) {
        console.error('Erro ao consultar produtos:', erro.message);

        return res.status(500).json({
            erro: 'Não foi possível consultar os produtos.'
        });
    }
});

// Buscar produto por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^[1-9]\d*$/.test(id)) {
            return res.status(422).json({
                erro: 'Informe um ID válido.'
            });
        }

        const [produtos] = await pool.execute(
            `SELECT id, categoria_id, nome, descricao, sku,
                    preco, peso_kg, ativo, criado_em
             FROM produtos
             WHERE id = ? AND ativo = TRUE`,
            [id]
        );

        if (produtos.length === 0) {
            return res.status(404).json({
                erro: 'Produto não encontrado.'
            });
        }

        return res.status(200).json({
            produto: produtos[0]
        });
    } catch (erro) {
        console.error('Erro ao buscar produto:', erro.message);

        return res.status(500).json({
            erro: 'Não foi possível buscar o produto.'
        });
    }
});

// Cadastrar produto
router.post('/', async (req, res) => {
    try {
        const {
            categoria_id = null,
            nome,
            descricao = null,
            sku,
            preco,
            peso_kg = 0
        } = req.body;

        if (
            typeof nome !== 'string' ||
            !nome.trim() ||
            typeof sku !== 'string' ||
            !sku.trim() ||
            preco === undefined ||
            !Number.isFinite(Number(preco)) ||
            Number(preco) < 0 ||
            !Number.isFinite(Number(peso_kg)) ||
            Number(peso_kg) < 0
        ) {
            return res.status(422).json({
                erro: 'Informe nome, SKU, preço e peso válidos.'
            });
        }

        if (
            categoria_id !== null &&
            (!Number.isInteger(Number(categoria_id)) ||
                Number(categoria_id) <= 0)
        ) {
            return res.status(422).json({
                erro: 'Informe uma categoria válida.'
            });
        }

        const [existentes] = await pool.execute(
            'SELECT id FROM produtos WHERE sku = ? LIMIT 1',
            [sku.trim()]
        );

        if (existentes.length > 0) {
            return res.status(409).json({
                erro: 'Este SKU já está cadastrado.'
            });
        }

        const [resultado] = await pool.execute(
            `INSERT INTO produtos
             (categoria_id, nome, descricao, sku, preco, peso_kg)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                categoria_id,
                nome.trim(),
                descricao,
                sku.trim(),
                Number(preco),
                Number(peso_kg)
            ]
        );

        return res.status(201).json({
            mensagem: 'Produto cadastrado com sucesso.',
            produto: {
                id: resultado.insertId,
                categoria_id,
                nome: nome.trim(),
                descricao,
                sku: sku.trim(),
                preco: Number(preco),
                peso_kg: Number(peso_kg),
                ativo: true
            }
        });
    } catch (erro) {
        console.error('Erro ao cadastrar produto:', erro.message);

        return res.status(500).json({
            erro: 'Não foi possível cadastrar o produto.'
        });
    }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            categoria_id = null,
            nome,
            descricao = null,
            sku,
            preco,
            peso_kg = 0
        } = req.body;

        if (!/^[1-9]\d*$/.test(id)) {
            return res.status(422).json({
                erro: 'Informe um ID válido.'
            });
        }

        if (
            typeof nome !== 'string' ||
            !nome.trim() ||
            typeof sku !== 'string' ||
            !sku.trim() ||
            preco === undefined ||
            !Number.isFinite(Number(preco)) ||
            Number(preco) < 0 ||
            !Number.isFinite(Number(peso_kg)) ||
            Number(peso_kg) < 0
        ) {
            return res.status(422).json({
                erro: 'Informe nome, SKU, preço e peso válidos.'
            });
        }

        const [existentes] = await pool.execute(
            'SELECT id FROM produtos WHERE sku = ? AND id <> ? LIMIT 1',
            [sku.trim(), id]
        );

        if (existentes.length > 0) {
            return res.status(409).json({
                erro: 'Este SKU já pertence a outro produto.'
            });
        }

        const [resultado] = await pool.execute(
            `UPDATE produtos
             SET categoria_id = ?, nome = ?, descricao = ?,
                 sku = ?, preco = ?, peso_kg = ?
             WHERE id = ? AND ativo = TRUE`,
            [
                categoria_id,
                nome.trim(),
                descricao,
                sku.trim(),
                Number(preco),
                Number(peso_kg),
                id
            ]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: 'Produto não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Produto atualizado com sucesso.'
        });
    } catch (erro) {
        console.error('Erro ao atualizar produto:', erro.message);

        return res.status(500).json({
            erro: 'Não foi possível atualizar o produto.'
        });
    }
});

// Desativar produto
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^[1-9]\d*$/.test(id)) {
            return res.status(422).json({
                erro: 'Informe um ID válido.'
            });
        }

        const [resultado] = await pool.execute(
            'UPDATE produtos SET ativo = FALSE WHERE id = ? AND ativo = TRUE',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: 'Produto não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Produto desativado com sucesso.'
        });
    } catch (erro) {
        console.error('Erro ao desativar produto:', erro.message);

        return res.status(500).json({
            erro: 'Não foi possível desativar o produto.'
        });
    }
});

module.exports = router;
