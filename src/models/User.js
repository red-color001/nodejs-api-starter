const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    async findAll() {
        return db('users').select('id', 'username', 'email', 'created_at');
    },
    
    async create({ username, email, password }) {
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const [user] = await db('users')
            .insert({
                username,
                email,
                password_hash,
            })
            .returning(['id', 'username', 'email', 'created_at']);
        return user;
    },

    async findByEmail(email) {
        return db('users').where({ email }).first();
    },

    async findById(id) {
        return db('users').where({ id }).select('id', 'username', 'email', 'created_at').first();
    },

    async comparePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
};

module.exports = User;