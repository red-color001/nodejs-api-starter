require('dotenv').config();

module.exports = {
    development: {
        client: process.env.DB_CLIENT || 'pg',
        connection: process.env.DEV_DB_CONNECTION_STRING,
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },
    
    production: {
        client: process.env.DB_CLIENT || 'pg',
        connection: process.env.DB_CONNECTION_STRING,
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },
};