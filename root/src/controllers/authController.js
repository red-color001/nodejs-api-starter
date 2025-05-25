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
        const { username, password } = request.body;
        const user = await userModel.findUserByUsername(request.server.knex, username);

        if (!user || !(await verifyPassword(password, user.password_hash))) {
            return reply.code(401).send({ error: 'Invalid credentials' });
        }

        const expiresInDuration = '7d';
        const payload = { id: user.id, username: user.username };

        const token = request.server.jwt.sign(payload, {
            expiresIn: expiresInDuration
        });

        const decodedToken = request.server.jwt.decode(token);
        const expiresAt = decodedToken.exp;

        reply.send({
            statusCode: 200,
            message: 'Login Berhasil',
            data: {
                id: user.id,
                username: user.username,
                token: token,
                expiresAt: expiresAt
            }
        });
    },

    me: async (request, reply) => {
        reply.send({ user: request.user });
    },
};
