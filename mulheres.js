const express = require("express")  //Aqui estou iniciando o express
const router = express.Router() //Aqui estou configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid')


const app = express() //Aqui estou iniciando o app
app.use(express.json())
const porta = 3333 //Aqui estou criando a porta

//Aqui estou criando lista inicial de mulheres
const mulheres = [
    {
        id: '1',
        nome: 'Marcilane Souza',
        Imagem: 'https://github.com/MarcilaneSouza.png',
        minibio: 'Desenvolvedora Backend'
    },
    {
        id: '2',
        nome: 'Marcilane Souza',
        Imagem: 'https://github.com/MarcilaneSouza.png',
        minibio: 'Desenvolvedora Backend'
    },
    {
        id: '3',
        nome: 'Marcilane Souza',
        Imagem: 'https://github.com/MarcilaneSouza.png',
        minibio: 'Desenvolvedora Backend'
    }
]

// GET
function mostraMulheres(request, response) {
    response.json(mulheres)
}

//POST
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }
    mulheres.push(novaMulher)

    response.json(mulheres)
}

// PATCH
function corrigeMulher (request, response) {
    function encontraMulher(mulher) {
        if (mulher.id === request.params.id) {
            return mulher
        }

}
    
    const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    } 

    if(request.body.imagem) {
        mulherEncontrada = request.body.imagem
    }

    response.json(mulheres)
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