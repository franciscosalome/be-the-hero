const connection = require('../database/connection'); //importa o arquivo de conexão criado(connection.js)
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response){//Atenção: o async nesta linha torna a função assincrona, para que o código espere o bloco abaixo, onde está identificado com await, para continuar só após o trecho tiver sido executado
        const {name, email, whatsapp, city, uf} = request.body; //Pega o JSON do post (lado do client)
    
        const id = crypto.randomBytes(4).toString('HEX'); //cria 4 bytes de caracteres hexadecimais aleatorios
        
        await connection('ongs').insert({ //o await complementa o async ali acima.
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        }) //método para inserir dados na tabela (como se fosse o insert do SQL)
        return response.json({id});
    }
};
