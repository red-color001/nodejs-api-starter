const userModel = require('../models/userModel');
const { hashPassword, verifyPassword } = require('../utils/hash');

module.exports = {
    register: async (request, reply) => {
        const { username, email, password } = request.body;
        const hashedPassword = await hashPassword(password);
        const user = await userModel.createUser(request.server.knex, {
            username: username,
            email: email,
            password_hash: hashedPassword
        });
        reply.send({ id: user.id, email: user.email });
    },

    login: async (request, reply) => {
        const { email, password } = request.body;
        const user = await userModel.findUserByEmail(request.server.knex, email);
        if (!user || !(await verifyPassword(password, user.password_hash))) {
            return reply.code(401).send({ error: 'Invalid credentials' });
        }
        const token = request.server.jwt.sign({ id: user.id, email: user.email });
        reply.send({
            id: user.id,
            username: user.username,
            email: user.email,
            token
        });
    },

    me: async (request, reply) => {
        reply.send({ user: request.user });
    },
};
