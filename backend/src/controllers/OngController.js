/* o controller OngController basicamente ira exportar os metodos */

/*iremos importar em routes.js o OngController com
const OngController = require('./controllers/OngController'); */

/* ele chamou a variavel de conexao de connection e eu de var_conexao_do_OngController */
const var_conexao_do_OngController = require('../database/connection');

/* ele chamou a variavel de crypto e eu de var_crypto_do_OngController */
const var_crypto_do_OngController = require('crypto');

module.exports = { 

    /*obs: usualmente se daria o nome de index para uma funcao de listagem, como a mostrarlistaong */
    /* ele nomeou como async index(request, response) { */
    async mostrarlistaong (request, response) {

        const ongs = await var_conexao_do_OngController('tabela_ongs').select('*');
        /*select(*) significa que queremos selecinar todos os campos de todos os registros dentro da tabela tabela_ongs*/
        return response.json(ongs); /*irá retornar um array */
    
    },


/* ele chamou a funcao de create e eu de criarong */
    async criarong(request, response) {
/*obs: todo esse codigo foi copiado do routes.js da funcao inicial var_routes.post('/criarongs') */        
        const { name, email, whatsapp, cidade, estadofederativo } = request.body;

    const numero_identidade = var_crypto_do_OngController.randomBytes(4).toString('HEX');
    
    await var_conexao_do_OngController('tabela_ongs').insert({
        numero_identidade,
        name,
        email,
        whatsapp,
        cidade,
        estadofederativo,

    })
    
    /*obs: o metodo INSERT usado acima demora um pouco, por isso colocamos 
    um ASYNC antes de (request,response) na declaracao da rota e um AWAIT antes da var_conexao, para esperar o que tem dentro terminar para entao continuar
    */
    return response.json({ numero_identidade });
    }



}