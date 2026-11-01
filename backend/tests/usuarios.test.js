import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcryptjs';

const pool = require('../src/config/database');
const usuariosRoutes = require('../src/routes/usuarios');
const express = require('express');

const app = express();
app.use(express.json());
app.use('/api/usuarios', usuariosRoutes);

describe('API de usuários', () => {
    const emailTeste = `vitest-${Date.now()}@omnilog.local`;
    const emailDuplicado = `vitest-duplicado-${Date.now()}@omnilog.local`;

    beforeAll(async () => {
        await pool.execute(
            'INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?)',
            ['Usuario Duplicado', emailDuplicado, await bcrypt.hash('Teste12345', 12), 'operador']
        );
    });

    afterAll(async () => {
        await pool.execute(
            'DELETE FROM usuarios WHERE email IN (?, ?)',
            [emailTeste, emailDuplicado]
        );
        await pool.end();
    });

    it('cadastra usuário com senha protegida', async () => {
        const resposta = await request(app)
            .post('/api/usuarios')
            .send({
                nome: 'Usuario Automatizado',
                email: emailTeste,
                senha: 'Teste12345'
            });

        expect(resposta.status).toBe(201);
        expect(resposta.body.usuario).not.toHaveProperty('senha_hash');

        const [usuarios] = await pool.execute(
            'SELECT senha_hash FROM usuarios WHERE email = ?',
            [emailTeste]
        );

        expect(usuarios.length).toBe(1);
        expect(
            await bcrypt.compare('Teste12345', usuarios[0].senha_hash)
        ).toBe(true);
    });

    it('rejeita nome vazio', async () => {
        const resposta = await request(app)
            .post('/api/usuarios')
            .send({
                nome: '',
                email: 'nome-vazio@omnilog.local',
                senha: 'Teste12345'
            });

        expect(resposta.status).toBe(422);
    });

    it('rejeita email inválido', async () => {
        const resposta = await request(app)
            .post('/api/usuarios')
            .send({
                nome: 'Teste',
                email: 'email-invalido',
                senha: 'Teste12345'
            });

        expect(resposta.status).toBe(422);
    });

    it('rejeita senha curta', async () => {
        const resposta = await request(app)
            .post('/api/usuarios')
            .send({
                nome: 'Teste',
                email: 'senha-curta@omnilog.local',
                senha: '123'
            });

        expect(resposta.status).toBe(422);
    });

    it('rejeita email duplicado', async () => {
        const resposta = await request(app)
            .post('/api/usuarios')
            .send({
                nome: 'Duplicado',
                email: emailDuplicado,
                senha: 'Teste12345'
            });

        expect(resposta.status).toBe(409);
    });
});
