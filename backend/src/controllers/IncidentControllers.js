const connection = require('../database/connection')
module.exports = {
    async index(request,response){
        const { page=1} = request.query; //método de paginação. busca um queryparm chamado 'page'. caso não venha na requisição, o padrão é 1

        const [count] = await connection('incidents').count(); //conta quanto casos existem. O colchete no [count] serve para retornar apenas um resultado (caso retorne um array)
        //console.log(count)
        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id') //é o método join do SQL, aqui está JOIN ONGS ON ONGS.ID = INCIDENTS.ONG_ID. Serve para buscar não só o incidente, mas os contatos e dados da ONG
        .limit(5) //limita o resultado da busca a 5 por vez
        .offset((page -1 )*5) //de acordo o o 'page' buscado acima, ele vai buscar o primeiro, ou segundo, ou terceiro blocos... assim por diante dependendo do queryparm
        .select(['incidents.*', //seleciona todos os dados do incidente, foi necessário para o id da ong não sobrepor ao id do incidente
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total-Count',count['count(*)']); //retorna o numerro total de incidentes no cabeçalho da resposta da requisição
        
        return response.json(incidents);
    },   

    async create(request,response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization; //esta variável pega o valor do Header criado dentro do Insmonia, ao invés de pagar valor do body
    
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id })
    }
    ,
    async delete(request, response){
        const {id} = request.params; //busca o id do incident a ser deletado
        const ong_id = request.headers.authorization; //esta variável pega o valor do Header criado dentro do Insmonia, ao invés de pagar valor do body

        const incident = await connection('incidents') //busca o id da ong que abriu o incidente
        .where('id',id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id){ //verifica se a ong que está tentando excluir é a mesma que criou o incident
            return response.status(401).json({error:'Operation not allowed'}) //response status(buscar no google)
        }else{
            await connection('incidents').where('id',id).delete();
            return response.status(204).send();
        }
    }
};