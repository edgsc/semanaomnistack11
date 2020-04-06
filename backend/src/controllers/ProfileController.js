var var_conexao_ProfillerController = require('../database/connection');

module.exports = {

    async mostrarCasosDeOngEspecifica (request, response) {
        /*obter ong logada */
        const ong_logada_headers = request.headers.authorization;
        /*filtrar ong logada na tabela de casos, tabela_casos [incidents no dele] */
        const casos_filtrados_ong_especifica = await var_conexao_ProfillerController('tabela_casos')
            /*no dele, 'ong_id' */
            .where('ong_identidade', ong_logada_headers)
            .select('*');

        return response.json(casos_filtrados_ong_especifica);
        /* */
    },


    async mostrarCasosDeOngEspecificaPaginado (request, response) {
        /* buscar o parametro pagina usando QUERY PARAMS */
        /* const { pagina } = request.body; */

        /* se nao existir quando o usuario digitar o caminho, usamos por padrao que o valor é 1 */
        const { pagina = 1 } = request.query;
    
        /* é interessante termos um contador de quantos casos há registrados */
        /* como nao queremos um array, colocamos entre colchetes ( [contador_casos]) ou fazemos na posicao zero (contador_casos[0]) */
        /* exercicio: testar com o consolte.log qual seria o retorno para contador_casos, [contador_casos], contador_casos[0] */
        const [contador_casos] = await var_conexao_ProfillerController('tabela_casos').count();
        console.log(contador_casos);
        
        /* resposta: contador_casos -> retorna [ { 'count(*)': 11 } ]
        /* resposta: [contador_casos] -> retorna { 'count(*)': 11 }
        /* resposta: contador_casos = ..... count(0) -> retorna [ { 'count(*)': 11 } ]
        /* count (ASTERISCO) significa q ele contou todos os campos da tabela, poderiamos ter especificado dentro de count qual campo contar */

        /*obter ong logada */
        const ong_logada_headers = request.headers.authorization;
        /*filtrar ong logada na tabela de casos, tabela_casos [incidents no dele] */
        const casos_filtrados_ong_especifica = await var_conexao_ProfillerController('tabela_casos')
            /*no dele, 'ong_id' */
            .where('ong_identidade', ong_logada_headers)
    /*limitamos para 5 registros */
            .limit(5)
    /* e vamos pular os registros correspondendo a numero de paginas puladas */
    /* para pagina=1, offset = 0, comecara do 1o registro; para pagina=2, offset = 5, comecara do 6o registro etc */
            .offset((pagina - 1)*5)
            .select('*')

        /* geralmente retornamos uma contagem para o HEADERS e nao para o BODY da requisicao, faremos isso abaixo */
        //response.header('ContadorCasosTotais', count['count(*)']);
        response.header('ContadorCasosTotais', contador_casos['count(*)']);

        return response.json(casos_filtrados_ong_especifica);
        /* */
    },


    async mostrarCasosDeOngEspecificaPaginadoOngDadosCompletos (request, response) {
        /* buscar o parametro pagina usando QUERY PARAMS */
        /* const { pagina } = request.body; */
        /* se nao existir quando o usuario digitar o caminho, usamos por padrao que o valor é 1 */
        const { pagina = 1 } = request.query;
    
        /* é interessante termos um contador de quantos casos há registrados */
        /* como nao queremos um array, colocamos entre colchetes ( [contador_casos]) ou fazemos na posicao zero (contador_casos[0]) */
        /* exercicio: testar com o consolte.log qual seria o retorno para contador_casos, [contador_casos], contador_casos[0] */
        const [contador_casos] = await var_conexao_ProfillerController('tabela_casos').count();
        console.log(contador_casos);
        
        /* resposta: contador_casos -> retorna [ { 'count(*)': 11 } ]
        /* resposta: [contador_casos] -> retorna { 'count(*)': 11 }
        /* resposta: contador_casos = ..... count(0) -> retorna [ { 'count(*)': 11 } ]
        /* count (ASTERISCO) significa q ele contou todos os campos da tabela, poderiamos ter especificado dentro de count qual campo contar */

        /*obter ong logada */
        const ong_logada_headers = request.headers.authorization;
        /*filtrar ong logada na tabela de casos, tabela_casos [incidents no dele] */
        const casos_filtrados_ong_especifica = await var_conexao_ProfillerController('tabela_casos')

        /*vamos usar um metodo mto usado em SQL, o JOIN, para unir dados de 2 tabelas, tipo procv */
        /*queremos apenas das ongs cujo id da tabela_ongs seja igual ao cadastrado no caso da tabela_casos */
        .join('tabela_ongs', 'numero_identidade', '=', 'tabela_casos.ong_identidade')

            /*no dele, 'ong_id' */
            .where('ong_identidade', ong_logada_headers)
    /*limitamos para 5 registros */
            .limit(5)
    /* e vamos pular os registros correspondendo a numero de paginas puladas */
    /* para pagina=1, offset = 0, comecara do 1o registro; para pagina=2, offset = 5, comecara do 6o registro etc */
            .offset((pagina - 1)*5)
            .select('*')

        /* geralmente retornamos uma contagem para o HEADERS e nao para o BODY da requisicao, faremos isso abaixo */
        //response.header('ContadorCasosTotais', count['count(*)']);
        response.header('ContadorCasosTotais', contador_casos['count(*)']);

        return response.json(casos_filtrados_ong_especifica);
        /* */
    },




    async mostrarCasosDeOngEspecificaPaginadoOngDadosFiltrados (request, response) {
        /* buscar o parametro pagina usando QUERY PARAMS */
        /* const { pagina } = request.body; */
        /* se nao existir quando o usuario digitar o caminho, usamos por padrao que o valor é 1 */
        const { pagina = 1 } = request.query;
    
        /* é interessante termos um contador de quantos casos há registrados */
        /* como nao queremos um array, colocamos entre colchetes ( [contador_casos]) ou fazemos na posicao zero (contador_casos[0]) */
        /* exercicio: testar com o consolte.log qual seria o retorno para contador_casos, [contador_casos], contador_casos[0] */
        const [contador_casos] = await var_conexao_ProfillerController('tabela_casos').count();
        console.log(contador_casos);
        
        /* resposta: contador_casos -> retorna [ { 'count(*)': 11 } ]
        /* resposta: [contador_casos] -> retorna { 'count(*)': 11 }
        /* resposta: contador_casos = ..... count(0) -> retorna [ { 'count(*)': 11 } ]
        /* count (ASTERISCO) significa q ele contou todos os campos da tabela, poderiamos ter especificado dentro de count qual campo contar */

        /*obter ong logada */
        const ong_logada_headers = request.headers.authorization;
        /*filtrar ong logada na tabela de casos, tabela_casos [incidents no dele] */
        const casos_filtrados_ong_especifica = await var_conexao_ProfillerController('tabela_casos')

        /*vamos usar um metodo mto usado em SQL, o JOIN, para unir dados de 2 tabelas, tipo procv */
        /*queremos apenas das ongs cujo id da tabela_ongs seja igual ao cadastrado no caso da tabela_casos */
        .join('tabela_ongs', 'numero_identidade', '=', 'tabela_casos.ong_identidade')

            /*no dele, 'ong_id' */
            .where('ong_identidade', ong_logada_headers)
    /*limitamos para 5 registros */
            .limit(5)
    /* e vamos pular os registros correspondendo a numero de paginas puladas */
    /* para pagina=1, offset = 0, comecara do 1o registro; para pagina=2, offset = 5, comecara do 6o registro etc */
            .offset((pagina - 1)*5)
            .select([
            'tabela_casos.*',
            'tabela_ongs.name',
            //'tabela_ongs.email',
            'tabela_ongs.whatsapp',
            'tabela_ongs.cidade',
            //'tabela_ongs.estadofederativo'
            ])

        /* geralmente retornamos uma contagem para o HEADERS e nao para o BODY da requisicao, faremos isso abaixo */
        //response.header('ContadorCasosTotais', count['count(*)']);
        response.header('ContadorCasosTotais', contador_casos['count(*)']);

        return response.json(casos_filtrados_ong_especifica);
        /* */
    }

}