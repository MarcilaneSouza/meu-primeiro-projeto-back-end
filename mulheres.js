const express = require('express');
const cors = require('cors');
const conectaBancoDeDados = require('./bancoDeDados');
const Mulher = require('./mulherModel');

const app = express();
app.use(express.json());
app.use(cors());

const porta = 3333;

conectaBancoDeDados();

// Rota para obter todas as mulheres
app.get('/mulheres', async (request, response) => {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find();
        response.json(mulheresVindasDoBancoDeDados);
    } catch (erro) {
        console.log(erro);
        response.status(500).json({ error: 'Erro ao buscar mulheres no banco de dados' });
    }
});

// Rota para criar uma nova mulher
app.post('/mulheres', async (request, response) => {
    const { nome, imagem, minibio, citacao } = request.body;
    const novaMulher = new Mulher({ nome, imagem, minibio, citacao });

    try {
        const mulherCriada = await novaMulher.save();
        response.status(201).json(mulherCriada);
    } catch (erro) {
        console.log(erro);
        response.status(500).json({ error: 'Erro ao criar nova mulher' });
    }
});

// Rota para corrigir informações de uma mulher existente
app.patch('/mulheres/:id', async (request, response) => {
    const { nome, imagem, minibio, citacao } = request.body;

    try {
        const mulherEncontrada = await Mulher.findById(request.params.id);

        if (!mulherEncontrada) {
            return response.status(404).json({ error: 'Mulher não encontrada' });
        }

        if (nome) {
            mulherEncontrada.nome = nome;
        }

        if (minibio) {
            mulherEncontrada.minibio = minibio;
        }

        if (imagem) {
            mulherEncontrada.imagem = imagem;
        }

        if (citacao) {
            mulherEncontrada.citacao = citacao;
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
        response.json(mulherAtualizadaNoBancoDeDados);
    } catch (erro) {
        console.log(erro);
        response.status(500).json({ error: 'Erro ao corrigir mulher' });
    }
});

// Rota para deletar uma mulher pelo ID
app.delete('/mulheres/:id', async (request, response) => {
    try {
        const mulherDeletada = await Mulher.findByIdAndDelete(request.params.id);

        if (!mulherDeletada) {
            return response.status(404).json({ error: 'Mulher não encontrada para deletar' });
        }

        response.json({ mensagem: 'Mulher deletada com sucesso!' });
    } catch (erro) {
        console.log(erro);
        response.status(500).json({ error: 'Erro ao deletar mulher' });
    }
});

// Função para mostrar a porta onde o servidor está rodando
function mostraPorta() {
    console.log(`Servidor criado e rodando na porta ${porta}`);
}

// Inicia o servidor na porta especificada
app.listen(porta, mostraPorta);
node