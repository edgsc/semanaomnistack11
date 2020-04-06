const var_express = require('express');

const var_routes = var_express.Router();

/* é um pacote de criptografia que usaremos para gerar números aleatórios */
const var_crypto = require('crypto');

const var_conexao = require('./database/connection');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionLoginController = require('./controllers/SessionLoginController');


var_routes.post('/postusers', (request,response) => {
    /* assim, entrando com http://localhost:3333/postusers e metodo POST no insonia, junto com o trecho
    abaixo como JSON
                    {"name": "Diego Fernandes",
                    "idade": 25
                    }
    tem-se como resposta no terminal do VisualStudioCode: { name: 'Diego Fernandes', idade: 25 }
    */
    
    const parametros_do_body = request.body;
    console.log(parametros_do_body);
    
    return response.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Eduardo'
    });
});


/* encapsulamos [ou abstraímos] dentro do OngController a logica de criar ong que inicialmente criamos como .post('/criarongs') com
a funcao 'criarong' */
/* vamos também encapsular / abstrair o .get('/listarongs') para o ongcontroller com a funcao 'mostrarlistaong' */
/* o dele ficou, por usar outras variaveis, routes.post('/ongs', OngController.create); */
var_routes.post('/criarongsSimplificadoViaController', OngController.criarong);


var_routes.post('/criarongs', async (request,response) => {

    const { name, email, whatsapp, cidade, estadofederativo } = request.body;

    /*
    console.log(name);
    console.log(email);
    console.log(whatsapp);
    console.log(cidade);
    console.log(estadofederativo);*/
    
    const numero_identidade = var_crypto.randomBytes(4).toString('HEX');
    
    await var_conexao('tabela_ongs').insert({
        numero_identidade,
        name,
        email,
        whatsapp,
        cidade,
        estadofederativo,

    })
    
    /*obs: o metodo INSERT usado acima demora um pouco, por isso colocamos 
    um ASYNC antes de (request,response) na declaracao da rota
    e um AWAIT antes da var_conexao, para esperar o que tem dentro terminar para entao continuar
    */
    return response.json({ numero_identidade });
});




/*exportamos para tornar disponiveis para que o index.js possa acessa-las;
é dessa forma que exportamos uma variavel de dentro de um arquivo*/
module.exports = var_routes;

/* o dele ficou, por usar outros nomes de variaveis, routes.get('/ongs', OngController.index) */
var_routes.get('/listarongsViaOngController', OngController.mostrarlistaong);



var_routes.post('/criarcasos', IncidentController.criarIncidente);


/* criaremos agora uma rota para listar todas as ONGs do banco de dados */
var_routes.get('/listarongs', async (request, response) => {

    /*obs: poderiamos usar A MESMA rota para dois metodos diferentes, ou seja,
    poderiamos ter um var_routes.POST('/ongs') e também um var_routes.GET('/ongs')*/

    /* o codigo abaixo tem um await pois queremos aguardar o query (que vem em seguida) finalizar, lembrando de colocar async tbm */
    const ongs = await var_conexao('tabela_ongs').select('*');
    /*select(*) significa que queremos selecinar todos os campos de todos os registros dentro da tabela tabela_ongs*/

    return response.json(ongs); /*irá retornar um array */

})

var_routes.get('/listarcasos', IncidentController.mostrarcasos);

/* note que vamos reaproveitar para a rota DELETE o caminho /listarcasos, porém com um parâmetro (ROUTE PARAM) do caso a ser deletado */
var_routes.delete('/listarcasos/:idcasoparadeletar', IncidentController.deletarcaso);


/* ele chamou em vez de casosdaong de profile */
var_routes.get('/casosdaong', ProfileController.mostrarCasosDeOngEspecifica);

/* usaremos o método POST para fazer login, isso nao significa que obrigatoriamente iremos criar algo no Banco de Dados, mas pois
iremos criar uma sessão (dar login) */
/* ele nomeou de sessions, eu nomeei de sessionslogin */
var_routes.post('/sessionlogin', SessionLoginController.criarSessao);

/* casos da ong versao paginada */
var_routes.get('/casosdaongpaginado', ProfileController.mostrarCasosDeOngEspecificaPaginado);

//casos da ong versao paginada + dados completos da ong -> mostrarCasosDeOngEspecificaPaginadoOngDadosCompletos
var_routes.get('/casosdaongpaginadocomdadosong', ProfileController.mostrarCasosDeOngEspecificaPaginadoOngDadosCompletos);

//casos da ong versao paginada + dados filtrados / selecionados da ong -> mostrarCasosDeOngEspecificaPaginadoOngDadosCompletos
var_routes.get('/casosdaongpaginadodadosfiltradosong', ProfileController.mostrarCasosDeOngEspecificaPaginadoOngDadosFiltrados);