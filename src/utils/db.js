const Knex = require('knex');
const knexPostgis = require('knex-postgis');

const connect = () => {
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    host : '127.0.0.1',
    port: '3306'
  };

  if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }

  // Connect to the database
  const knex = Knex({
    client: 'pg',
    dialect: 'postgre',
    connection: config
  });

  console.log('connected');

  const st = knexPostgis(knex);

  return { knex, st };
}

const db = connect();

module.exports = {
  knex: db.knex,
  st: db.st
};