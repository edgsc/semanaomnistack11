
exports.up = function(knex) {
    /*metodo up é sempre responsavel pela criacao da tabela, é o que vai acontecer quando executar essa migration */
        /* para criar uma nova tabela, fazemos
      criamos a tabela_ongs (uma tabela) e uma funcao que recebe uma tabela como parametro */
      return  knex.schema.createTable('tabela_ongs', function(table) {
      table.string('numero_identidade').primary(), /* precisamos informar o nome de cada um dos campos; o primeiro campo sera uma string com nome ID
      e será a chave primária do banco de dados */
      table.string('name').notNullable(); /* impedimentos que o campo nome seja nulo */
      table.string('email').notNullable(); /* impedimentos que o campo nome seja nulo */
      table.string('whatsapp').notNullable(); /* impedimentos que o campo nome seja nulo */
      table.string('cidade').notNullable(); /* impedimentos que o campo nome seja nulo */
      table.string('estadofederativo', 2).notNullable(); /* impedimentos que o campo nome seja nulo, e definimos TAMANHO 2 */
      });
    };
    
    exports.down = function(knex) {
    /* o metodo down é: no caso de um problema, O QUE DEVE SER FEITO? precisamos deletar essa tabela em caso de erro */
    return knex.schema.dropTable('tabela_ongs');
    };
    