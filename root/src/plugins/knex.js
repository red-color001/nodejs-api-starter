const fp = require('fastify-plugin');
const Knex = require('knex');

async function knexPlugin(fastify) {
  // const knex = Knex(require('../../knexfile').production);
  const knex = Knex(require('../../knexfile')[process.env.NODE_ENV || 'development']);
  fastify.decorate('knex', knex);
}

module.exports = fp(knexPlugin);
