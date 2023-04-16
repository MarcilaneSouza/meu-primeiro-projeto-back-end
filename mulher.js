const express = require("express")
const router = express.Router() // metodo-função router

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Marcilane',
        imagem: 'https://github.com/MarcilaneSouza.png',
        minibio: 'Desenvolvedora Backend'

    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta) 