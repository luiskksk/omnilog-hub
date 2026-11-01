import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';

const pool = require('../src/config/database');
const produtosRoutes = require('../src/routes/produtos');

const app = express();
app.use(express.json());
app.use('/api/produtos', produtosRoutes);

const skuTeste = `TESTE-${Date.now()}`;

describe('Testes da API de produtos', () => {
  let produtoId;

  afterAll(async () => {
    if (produtoId) {
      await pool.execute(
        'DELETE FROM produtos WHERE id = ?',
        [produtoId]
      );
    }

    await pool.end();
  });

  it('deve cadastrar um produto', async () => {
    const resposta = await request(app)
      .post('/api/produtos')
      .send({
        categoria_id: 2,
        nome: 'Produto de teste',
        descricao: 'Produto criado pelo teste automatizado',
        sku: skuTeste,
        preco: 100,
        peso_kg: 1
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body.produto.nome).toBe('Produto de teste');

    produtoId = resposta.body.produto.id;
  });

  it('deve listar os produtos', async () => {
    const resposta = await request(app).get('/api/produtos');

    expect(resposta.status).toBe(200);
    expect(resposta.body.total).toBeGreaterThan(0);
  });

  it('deve buscar um produto pelo ID', async () => {
    const resposta = await request(app)
      .get(`/api/produtos/${produtoId}`);

    expect(resposta.status).toBe(200);
    expect(resposta.body.produto.id).toBe(produtoId);
  });

  it('deve impedir SKU duplicado', async () => {
    const resposta = await request(app)
      .post('/api/produtos')
      .send({
        categoria_id: 2,
        nome: 'Produto duplicado',
        sku: skuTeste,
        preco: 50,
        peso_kg: 1
      });

    expect(resposta.status).toBe(409);
  });

  it('deve retornar 404 para produto inexistente', async () => {
    const resposta = await request(app).get('/api/produtos/999999');

    expect(resposta.status).toBe(404);
  });

  it('deve atualizar um produto', async () => {
    const resposta = await request(app)
      .put(`/api/produtos/${produtoId}`)
      .send({
        categoria_id: 2,
        nome: 'Produto atualizado',
        descricao: 'Descrição atualizada',
        sku: skuTeste,
        preco: 150,
        peso_kg: 1.5
      });

    expect(resposta.status).toBe(200);
  });

  it('deve desativar um produto', async () => {
    const resposta = await request(app)
      .delete(`/api/produtos/${produtoId}`);

    expect(resposta.status).toBe(200);
  });

  it('não deve encontrar um produto desativado', async () => {
    const resposta = await request(app)
      .get(`/api/produtos/${produtoId}`);

    expect(resposta.status).toBe(404);
  });
});
