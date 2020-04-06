
exports.up = function(knex) {
    /*metodo up é sempre responsavel pela criacao da tabela, é o que vai acontecer quando executar essa migration */
        /* para criar uma nova tabela, fazemos
      criamos a tabela_ongs (uma tabela) e uma funcao que recebe uma tabela como parametro */
      return  knex.schema.createTable('tabela_casos', function(table) {
      /* table.string('id').primary(), no caso da ong usamos como ID uma string, para evitar que fosse facil uma ong descobrir o id de
      outra, pois seria 1, 2, 3... etc,
      mas para os CASOS, podemos usar uma ID com increments */
      table.increments();
      table.string('incidente_titulo').notNullable(); /* titulo do incidente */
      table.string('descricao_do_caso').notNullable(); /* descricao do incidente */
      table.decimal('incidente_valor').notNullable(); /* valor que pode conter decimais */

    /* relacionamento */   
    table.string('ong_identidade').notNullable(); /* ong que criou aquele incidente */

    /* chave estrangeira: o ong_id deve ser um valor cadastrado na tabela tabela_ong */
    table.foreign('ong_identidade').references('numero_identidade').inTable('tabela_ongs');
      });
    };
    



    exports.down = function(knex) {
    /* o metodo down é: no caso de um problema, O QUE DEVE SER FEITO? precisamos deletar essa tabela em caso de erro */
    return knex.schema.dropTable('tabela_casos');
    };
    