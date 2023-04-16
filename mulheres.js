const express = require("express")
const router = express(express.Router)

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'Marcilane Souza',
        Imagem: 'https://github.com/MarcilaneSouza.png',
        minibio: 'Desenvolvedora Backend'
    },
    {
        nome: 'Marcilane Souza',
        Imagem: 'https://github.com/MarcilaneSouza.png',
        minibio: 'Desenvolvedora Backend'
    },
    {
        nome: 'Marcilane Souza',
        Imagem: 'https://github.com/MarcilaneSouza.png',
        minibio: 'Desenvolvedora Backend'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta) 