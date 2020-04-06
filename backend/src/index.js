
/*a variaver var_express importa o modulo Express, assim essa variavel contem todas funcionalidades
'disponiveis no modulo Express'*/
const var_express = require('express');

/*'a variaval var_app instancia a aplicacao, a qual vai conter as rotas e as funcionalidades'*/
const var_app = var_express();

/*o ./ é necessario pois não é um pacote, igual o express, é um arquivo; e se fosse para voltar uma pasta seria ../routes */
const var_routes = require('./routes');

const var_CORS = require('cors');


/* na verdade, pediu que o texto abaixo
var_app.use(var_routes);
fosse APÓS o
var_app.use(var_express.json())
então está mais ao final do código*/

/*'ela ira ouvir a porta 3333, assim, no navegador, acessar localhost:3333 ira acessar a aplicacao'
'nao foi usada a porta 80, padrao, por ser problematica em alguns SOs'

para rodar, executar no terminal do VisualStudioCode "node index.js" dentro da pasta G:\SemanaOmnistack\aulas\backend

se retornar no navegador (ao rodar localhost:3333) a msg "Cannot GET /" é pq não tem nada no app ainda
se retornar uma tela em branco, não está rodando o "node index.js", ie, nao esta ouvindo

rota = localhost:3333
recurso = /hello, por exemplo
*/

/*
Metodos HTTP:
    Metodo GET - quando queremos buscar / listar uma informacao do backend; listagem, dados
    obs: o browser SEMPRE executa o metodo get
    Metodo POST - para criar uma informacao no backend, ex: criar usuario
    Metodo PUT - alterar uma info no backend
    Metodo DELEtE - deletar uma info
    obs: tudo poderia ser feito via metodo GET, porem, para facilitar, é uma questao de semântica
    obs2: isso significa q mesmo usando o metodo app.post ou app.put, o NAVEGADOR iria usar GET, entao
    é necessario usar outro software, como o INSOMNIA, para testar outros metodos ou usar o GETPOSTMAN (sistemas 32 bits)


*/

/*
Tipos de Parâmetros usáveis em uma rota
    parametros QUERY- usado no recursdo da rota para FILTRAR dados, tipo
        localhost:3333/users?nome=Diego filtra so os DIEGOs
        localhost:3333/users?idade=25 filtra so aqueles com 25 anos
        localhost:3333/users?nome=Diego&idade=25 filtra so Diegos de 25 anos
        locahost:3333/users?page=2 apresenta a pagina 2
        localhost:3333/users?page=2&nome=Diego&idade=25 os DIEGOS, de 25 anos, da pagina 2
    
    parametros ROUTE - usados para identificar recursos
        ex: se declararmos no codigo  var_app.get('/users/:id', (request,response) => {
            entao tudo q vem apos a "/" posterior a users é o id do usuario
            assim, locahost:3333/users/1 retorna o usuario 1
            locahost:3333/users/2 retornaria o usuario 2

    parametro REQUEST BODY - corpo da requisicao, usado para criar ou alterar recursos
    obs: request guarda todas as informacoes que vem da requisicao do usuario
    response é a resposta devolvida para o usuari
*/
var_app.get('/hello', (request,response) => {
    return response.send("Hello, Super Mario World!");
});

/* Exemplo do QUERY params */

        /* iremos acessar todos parametros que vem do query atraves de
        const parametros_do_query = request.query;
        console.log(parametros_do_query);
        
        para "http://localhost:3333/users?name=Eduardo&idade=27"
        retornaria
        {name: 'Eduardo'}
        {idade: '27'}

        obs: o .query funciona para os parametros do QUERY
        já para os parâmetros do ROUTE deve-se usar o que é apresentado na próxima parte
        */

var_app.get('/users', (request,response) => {


const parametros_do_query = request.query;

console.log(parametros_do_query);

    return response.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Eduardo'
    });
});




/* Exemplo do ROUTE params */

var_app.get('/users/:id', (request,response) => {

    /* iremos acessar todos parametros que vem do query atraves de
    const parametros_do_query = request.query;
    console.log(parametros_do_query);

    obs: o .query funciona para os parametros do QUERY
    já para os parâmetros do ROUTE deve-se usar
    const parametros_do_route = request.params;
    console.log(parametros_do_route);

        para "http://localhost:3333/users/123"
        retornaria
        {id: '123'}
        note que, diferente do comando .query acima, nao nomeamos "id" dentro da rota

    */

const parametros_do_route = request.params;
console.log(parametros_do_route);

return response.json({
    evento: 'Semana Omnistack 11.0',
    aluno: 'Eduardo'
});
});




/* Exemplo do POST params */

/* dentro do Insomnia, sera enviado como dados (JSON) o trecho abaixo
    {"name": "Diego Fernandes",
    "idade": 25
    }
*/
var_app.use(var_express.json())

var_app.use(var_routes);


/* o trecho acima informa ao nosso app ou ao Express que usaremos o formato .JSON  para
 o corpo das requisicoes
 isso faz o EXPRESS transformar o JSON em um objeto do javascript, algo entendível pelo app */



var_app.post('/postusers', (request, response) => {
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





/* para nao precisarmos salvar e reiniciar o app a cada atualizacao, vamos instalar o nodemon
via o codigo abaixo
npm install nodemon -D
obs: o parametro -D significa q, dentro do package.json (o arquivo que lista nossas dependencias)
iremos instalar não como dependencia do app, mas como dependencia do desenvolvimento
assim, quando tivermos o app pronto, nao vai ser necessario ficar monitorando o codigo

sempre ao iniciar o servidor, rodar "npm start" para ele ficar monitorando, pois definimos o script
start dentro de package.json como
    "scripts": {
    "start": "nodemon index.js"
    },
*/




var_app.get('/', (request,response) => {
    return response.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Eduardoss'
    });
});

var_app.listen(3333);


/* Sobre Banco de Dados
Existem bancos de dados relacionais SQL e não-relacionais NoSQL
por exemplo
SQL: MySQL, SQLite, PostgreSQL, Microsoft SQL Server
NoSQL: MongoDB, CouchDB
obs: SQL é o mais usado, por permitir maior controle da estrutura do banco
obs2: NoSQL é muito livre, alguns usuarios poderiam ter nome e outros nao, alguns idade, etc
obs3: SQLite nao exige instalar nada, é um arquivo dentro do app de extensao .sqlite
obs4: podemos mudar para outro SQL sem qualquer alteracao pois SQL é uma linguagem universal
obs5: diferente do NoSQL, que cada banco de dados tem sua linguagem
*/

/*Para comunicar com BD tem 3 opcoes
-via Driver: instalar o driver do BD, ou seja, o pacote oficial do BD para o Node
    DRIVER: SELECT * FROM users
-via QUERY BUILDER: table('users').select('*').where(), ou seja, usando linguagem javascript
    a vantagem é que trocar de SQL nao precisaria alterar se for QUERY BUILDER
    usaremos como QUERY BUILDER a ferramenta KNEX  "SQL Query Builder for Javascript"
    que é a mais utilizada no NODE
        instalaremos rodando no terminal "npm install knex"
        obs: como usaremos o sqlite3, rodamos também "npm install sqlite3" conforme o github do KNEX
        Vamos agora executar o pacote do knex com
            "npx knex init", que ira criar o arquivo ./knexfile.js, onde ficara as configuracoes de
            acesso ao banco de dados para cada um dos ambientes da aplicacao
                ex: um banco de dados para DESENVOLVIMENTO, outro para PRODUCAO (ONLINE, para os clientes usarem)
                e o de STAGING (producao para o time de desenvolvimento; ele simula a PRODUCAO para o time de desenv
                para testar o app online)


        */


/* ENTIDADES e FUNCIONALIDADES
tudo que tem no banco de dados é uma ENTIDADE; ex: no caso do app BeTheHero, as ONGs sao uma entidade; assim comos os Casos que pedem
doação tbm são entidades;
A entidade ONG pode ter as seguitnes Funcionalidades: fazer login, fazer cadastro de ONG, fazer logout, fazer cadastro de caso, deletar
casos, listar casos especificos de uma ong, listar todos os casos, fazer contato via email  */

/* MIGRATION para criar as tabelas de dados
O Knex tem uma ferramenta chamada migration, que permite CRIAR tabelas e saber as VERSOES (controle do historico), quando foi
criado ou editado por outro; migrations facilita incorporar dados a uma tabela

seguindo o site do knexjs.org, vamos criar a primeira migracao usando o Migration CLI
npx knex migrate:make migration_name
rodaremos como
npx knex migrate:make create_ongs
esse codigo é para criar a tabela ongs
npx knex migrate:make create_casos para criar a tabela de casos / incidentes das ongs
*/

/* apos criarmos a migration, executamos
npx knex migrate:latest
isso irá gerar o arquivo db.sqlite, conforme definimos esse nome em knexfile.js*/

//instalaremos um modulo de seguranca CORS para determinar quem podera acessar nossa aplicacao
//la em cima importamos o CORS com const var_CORS = require('cors');

app.use(var_CORS());

/* obs: futuramente, limitariamos o endereco que pode acessar a aplicacao, ex:
app.use(var_CORS({
    origin: 'http://meuapp.com'
})); 

mas deixando apenas app.use(var_CORS())  permitimos que qualquer aplicacao frontend possa acessar nossa aplicacao backend */