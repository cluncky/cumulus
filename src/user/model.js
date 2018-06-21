const ns = '[user][model]';
const DBase = require('../utils/dbase');
const { TABLE_NAME } = require('./constants');

class UserModel extends DBase {

}

let backend = new UserModel(TABLE_NAME);

const init = async () =>  {
    const fn = `${ns}[init]`;
    const { knex } = require('../utils/db');
    const uuid = require('node-uuid');

    console.log(fn, 'begin');

    await knex.schema.dropTableIfExists(TABLE_NAME);

    await knex.schema.createTable(TABLE_NAME, function(table) {
        table.uuid('id').primary().unique().index().defaultTo(uuid.v4());
        
        table.string('name');
    
        table.string('lng');
        table.string('lat');
    
        table.timestamp('created_on').defaultTo(knex.fn.now());
    });
}

module.exports = {
    UserModel: backend,
    init
};