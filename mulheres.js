const express = require("express")  //Aqui estou iniciando o express
const router = express.Router() //Aqui estou configurando a primeira parte da rota

const conectaBancoDeDados = require('./bancoDeDados')  // Aqui estou ligando bancoDeDados
conectaBancoDeDados() // Estou chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')
const app = express() //Aqui estou iniciando o app
app.use(express.json())
const porta = 3333 //Aqui estou criando a porta

// GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    }catch (erro) {
        console.log(erro)
    } 
}


//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

// PATCH
async function corrigeMulher (request, response) {
    try {
    const mulherEncontrada = await mulher.findById(request.params.id)

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    } 

    if(request.body.imagem) {
        mulherEncontrada = request.body.imagem
    }

    if (request.body.citacao){
        mulherEncontrada = request.body.citacao
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
    response.json(mulherAtualizadaNoBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }
}

//DELETE
function deletaMulher (request, response) {
    function todasMenosEla(mulher) {
        if(mulher.id !== request.params.id) {
            return mulher
        }

    }

        const mulheresQueFicam = mulheres.filter(todasMenosEla)

        response.json(mulheresQueFicam)
}

app.use(router.get('/mulheres', mostraMulheres)) //configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configurei rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurei rota PATCH /mulheres
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei rota DELETE /mulheres

// PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.listen(porta, mostraPorta)  // servidor ouvindo a porta