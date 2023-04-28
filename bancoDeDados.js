const mongoose = require('mongoose')

async function conectaBancoDeDados(){  //async- assim podemos usar a palavra reservada await que libera o node para atender outros clientes enquanto o MongoDB não responde.
    try{
        console.log('conexão com o banco de dados iniciou')

    await mongoose.connect('mongodb+srv://marcilane29:4oWlOK2nwcct4iQc@clustermulheres.o0xyt0m.mongodb.net/?retryWrites=true&w=majority')

    console.log('conexão com o banco de dados feita com sucesso')

    }catch(erro) {
        console.log(erro)
    }

}

module.exports = conectaBancoDeDados