const ns = '[user][model]';
const DBase = require('../utils/dbase');
const { TABLE_NAME } = require('./constants');

class ShoppingItemModel extends DBase {

}

let backend = new ShoppingItemModel(TABLE_NAME);

const init = async () =>  {
    const fn = `${ns}[init]`;
    const { knex } = require('../utils/db');

    console.log(fn, 'begin');

    await knex.schema.dropTableIfExists(TABLE_NAME);

    await knex.schema.createTable(TABLE_NAME, function(table) {
        table.uuid('id');
        table.unique('id');
        table.index('id');
        
        table.string('userId');
    
        table.string('name');
    
        table.timestamp('created_on').defaultTo(knex.fn.now());
    });
}

module.exports = {
    ShoppingListModel: backend,
    init
};