/* começamos importando o knex e as configuracoes do banco de dados disponiveis no knexfile.js
obs: usamos ../../ pois precisamos voltar 2 pastas*/
const knex = require('knex');
const configuracao_importada = require('../../knexfile');

const var_conexao = knex(configuracao_importada.development)
/* obs: passamos o .developmente, nao o .production ou .staging, pois o escolhemos para desenvolvimento */

/* e desse arquivo iremos exportar nossa conexao com o banco de dados */
module.exports = var_conexao;

/* e importaremos dentro dos arquivos que precisam se comunicar com o banco de dados, ou seja,
dentro de routes.js colocaremos
const var_conexao = require('./database/connection');
*/
