const express = require('express');

const OngController = require('./controllers/OngsControler'); //controle de ongs
const IncidentController = require('./controllers/IncidentControllers') //controle de incidentes
const ProfileController = require('./controllers/ProfileController'); //controle das requisições da propria associação
const SessionController = require('./controllers/SessionController'); //controle de sessão(login)
const routes = express.Router();

routes.post('/sessions',SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.post('/incidents',IncidentController.create);
routes.get('/incidents',IncidentController.index);
routes.delete('/incidents/:id',IncidentController.delete);

module.exports = routes;

/**
 * métodos HTTP:
 * 
 * GET: Buscar uma informação no back-end(padrao)
 * POST: Criar uma informação no back-end
 * PUT: ALterar uma informação no backend
 * DELETE: Deletar uma informação no backend
 */
/**
 * Tipos de parâmetros:
 * 
 * Query Parms: Parâmetros nomeados enviados na rota após ':?'
 * geralmente servem para filtros (/users?page=2&nome=Diego&idade=25)
 * 
 * Route Parms: Parâmetros utilizados para identificar recursos (/users/1)
 * 
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recuross
 */