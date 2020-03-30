const knex = require('knex'); //importa o knex
const configuration = require('../../knexfile'); //pega o arquivo de configuração

const connection = knex(configuration.development); //pega as configurações da conexão de desenvolvimento

module.exports = connection; // exporta essa configuração para ser usado por outros programas