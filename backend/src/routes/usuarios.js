const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

const router = express.Router();

const perfisPermitidos = ['administrador', 'gerente', 'operador'];

router.post('/', async (req, res) => {
    try {
        const { nome, email, senha, perfil = 'operador' } = req.body;

        if (
            typeof nome !== 'string' ||
            typeof email !== 'string' ||
            typeof senha !== 'string' ||
            !nome.trim() ||
            !email.trim() ||
            senha.length < 8
        ) {
            return res.status(422).json({
                erro: 'Informe nome, email e senha com pelo menos 8 caracteres.'
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return res.status(422).json({
                erro: 'Informe um email válido.'
            });
        }

        if (perfil !== 'operador') {
            return res.status(422).json({
                erro: 'O cadastro público permite somente o perfil operador.'
            });
        }

        const [existentes] = await pool.execute(
            'SELECT id FROM usuarios WHERE email = ? LIMIT 1',
            [email.trim().toLowerCase()]
        );

        if (existentes.length > 0) {
            return res.status(409).json({
                erro: 'Este email já está cadastrado.'
            });
        }

        const senhaHash = await bcrypt.hash(senha, 12);

        const [resultado] = await pool.execute(
            `INSERT INTO usuarios (nome, email, senha_hash, perfil)
             VALUES (?, ?, ?, ?)`,
            [nome.trim(), email.trim().toLowerCase(), senhaHash, 'operador']
        );

        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso.',
            usuario: {
                id: resultado.insertId,
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                perfil: 'operador'
            }
        });
    } catch (erro) {
        console.error('Erro ao cadastrar usuário:', erro.message);

        return res.status(500).json({
            erro: 'Não foi possível cadastrar o usuário.'
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const [usuarios] = await pool.execute(
            `SELECT id, nome, email, perfil, ativo, criado_em
             FROM usuarios
             ORDER BY id DESC`
        );

        return res.status(200).json({
            total: usuarios.length,
            usuarios
        });
    } catch (erro) {
        console.error('Erro ao consultar usuários:', erro.message);

        return res.status(500).json({
            erro: 'Não foi possível consultar os usuários.'
        });
    }
});

module.exports = router;
