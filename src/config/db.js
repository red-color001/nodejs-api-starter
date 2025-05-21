const knex = require('knex');
require('dotenv').config();

const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const configOptions = knexConfig[environment];

const db = knex(configOptions);

db.raw("SELECT 1")
    .then(() => {
        console.log("PostgreSQL connected successfully");
    })
    .catch((e) => {
        console.error("Failed to connect to PostgreSQL:", e);
        process.exit(1);
    });

module.exports = db;