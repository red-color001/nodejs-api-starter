module.exports = {
    async findAll() {
        return db('users').select('id', 'username', 'email', 'created_at');
    },

    createUser: async (knex, user) => {
        return await knex('users').insert(user).returning('*').then(rows => rows[0]);
    },

    findUserByEmail: async (knex, email) => {
        return await knex('users').where({ email }).first();
    },
};
