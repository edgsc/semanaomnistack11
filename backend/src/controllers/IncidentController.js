/* importaremos a conexao com o banco de dados */
var var_conexao_do_IncidentController = require('../database/connection');


module.exports = {


        /*obs: usualmente se daria o nome de index para uma funcao de listagem, como a mostrarlistaong */
        /* ele nomeou como async index(request, response) { */
        async mostrarcasos (request, response) {
            /* ele nomeou como incidents em ez de lista de casos */
            const listadecasos = await var_conexao_do_IncidentController('tabela_casos').select('*');
            /* usamos select('*') pois queremos retornar todos os casos */
            return response.json(listadecasos);
        },



    async criarIncidente (request, response) {
        /* para cadastrar um incidente pediremos um titulo, descricao e valor */
                 const { incidente_titulo, descricao_do_caso, incidente_valor } = request.body;
                 const ong_identidade = request.headers.authorization;
                
                /* const { incidente_titulo, descricao_do_caso, incidente_valor, ong_identidade } = request.body; */
                
                /*
                await var_conexao_do_IncidentController('incidents').insert({
                    incidente_titulo,
                    descricao_do_caso,
                    incidente_valor,
                    ong_identidade,
                });
                */


                /*mas para obtermos o id do incidente, podemos fazer
                const result = await var_conexao_do_IncidentController('incidents').insert({
                    incidente_titulo,
                    descricao_do_caso,
                    incidente_valor,
                    ong_identidade,
                });

                const id = result[0];
                */



/*ou ainda, faremos desestruturado, da seguinte forma */
const [id] = await var_conexao_do_IncidentController('tabela_casos').insert({
    incidente_titulo,
    descricao_do_caso,
    incidente_valor,
    ong_identidade,
});
/* assim, a primeira chave ou valor desse array sera armazenada numa variavel chamada id */

/*e para retornarmos essa informacao usamos */
return response.json({ id });


/*note que mandamos com chaves junto para ir a informacao que estamos retornando, nao apenas return responde.json(id); */

        
                /* o id sera automatico e incremental */
        /*obs: por q nao precisamos pedir o id da ong? pois iremos nos basear na ong q estiver logada no sistema ao fazer o cadastro;
        essa informacao de Autenticacao / login vem do cabeçalho da requisicao (HEADERS) e nao do corpo (BODY)*/
        /* cabeçalho = contexto da nossa requisicao, tais como autenticacao, localizacao, ip etc */

    }, /* fim da criarIncidente */









    async deletarcaso(request, response) {
        /* ira obter o id atraves do ROUTE PARAM, conforme o caminho sera /listarcasos/:id_caso_paradeletar */
        const { idcasoparadeletar } = request.params;
        const ong_identidade_dentro_do_headers = request.headers.authorization;

/* buscamos o id ong_identidade para assegurar que a ong logada tem o mesmo id da ong cadastrada no Incidente a ser deletado*/

/* vamos buscar o incidente com o id_caso desejado */
const incidente_buscado = await var_conexao_do_IncidentController('tabela_casos')
/* no dele, .where ('id', id) */
.where ('id', idcasoparadeletar)
/*no dele, .select('ong_id') */
.select('ong_identidade')
/* retornaremos apenas o primeiro resultado, ate porque nao tera dois casos com mesmo id */
.first();

/* verificamos agora se os IDs diferem */
if (incidente_buscado.ong_identidade != ong_identidade_dentro_do_headers) {
    
    /* codigos de status code http: 200 = sucesso, 401 = nao autorizado, 204 = dar uma resposta para o front end q nao tem conteudo */
    /*alteramos o status e damos uma resposta em json */
    return response.status(401).json ({ error: 'Ong logada difere da ong cadastrada no caso'});
}

await var_conexao_do_IncidentController('tabela_casos').where('id', idcasoparadeletar).delete();
/* return response.status(204).json('Deletado com sucesso'); */
/* return response.json('Deletado com sucesso'); */

return response.json('Deletado com sucesso'),
response.status(204);


/*deletaria e nao retornaria nada */
/*  return response.status(204).send(); */




    }



}