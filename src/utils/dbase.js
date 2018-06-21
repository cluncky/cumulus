const ns = '[utils][dbase]';
const { knex } = require('./db');

class DBase {
    constructor(table) {
        this.table = table;
    }

    async insert(doc)   {
        const fn = `${ns}[insert]`;

        return await knex.insert(doc, '*').into(this.table);
    }

    async select(query)  {
        const fn = `${ns}[select]`;

        return await knex.where(query).select().from(this.table);
    }

    async update(query, update) {
        const fn = `${ns}[update]`;

        return await knex(this.table).where(query).update(update, '*');
    }

    async delete(query) {
        const fn = `${ns}[delete]`;

        return await knex(this.table).where(query).del();
    }
}

module.exports = DBase;