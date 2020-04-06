/* em vez de SessionLoginController.js ele chamou apenas de SessionController.js */
/* é uma rota usada para criar uma sessão (login), logout é finalizar a sessão */

/* conexao com o banco de dados */
var var_conexao_SessionLoginController = require('../database/connection');

module.exports = {

    async criarSessao (request, response) {
        /* verificar se a ong existe, isto é, tentar encontrar no banco de dados */

        /* obter do BODY a ong_id */
        /* const { ong_id_informada_para_login } = request.body; */
        const { ong_id_para_login } = request.body;
        /* no dele, tabela = ongs em vez de tabela_ongs */
        /* nomeei numero_identidade e ele apenas id na tabela_ongs */
        const ong_encontrada_tabela = await var_conexao_SessionLoginController('tabela_ongs')
            .where('numero_identidade', ong_id_para_login)
            .select('name')
            /* usamos first pois queremos um unico resultado, e nao um array */
            .first();

    /* caso a ong nao exista */
        if (!ong_encontrada_tabela) {
            /* retornaremos o status 400 = bad request */
            return response.status(400).json({ error: 'No ONG found with this ID - Nao ha ONG com esse ID'});
            }
        
        return response.json(ong_encontrada_tabela);
    }

}