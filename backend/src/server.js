const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const usuariosRoutes = require('./routes/usuarios');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);

app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');

        res.status(200).json({
            status: 'ok',
            mensagem: 'API OmniLog Hub funcionando!',
            banco: 'MySQL conectado'
        });
    } catch (erro) {
        console.error('Erro no MySQL:', erro.message);

        res.status(500).json({
            status: 'erro',
            mensagem: 'Falha na conexão com o banco.'
        });
    }
});

app.use((erro, req, res, next) => {
    if (erro instanceof SyntaxError && erro.status === 400) {
        return res.status(400).json({
            erro: 'O JSON enviado é inválido.'
        });
    }

    console.error(erro.message);

    res.status(500).json({
        erro: 'Erro interno do servidor.'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`OmniLog Hub rodando em http://localhost:${PORT}`);
});
