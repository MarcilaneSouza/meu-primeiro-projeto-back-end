const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBancoDeDados() {  //async- assim podemos usar a palavra reservada await que libera o node para atender outros clientes enquanto o MongoDB não responde.
    try{
        console.log('Conexão com o banco de dados iniciou')

        await mongoose.connect(process.env.MONGO_URL)

        console.log('Conexão com o banco de dados feita com sucesso')

    } catch(erro) {
        console.log(erro)
    }

}

module.exports = conectaBancoDeDados