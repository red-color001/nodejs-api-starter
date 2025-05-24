const fp = require('fastify-plugin');
const jwt = require('@fastify/jwt');

async function jwtPlugin(fastify) {
    fastify.register(jwt, { secret: process.env.JWT_SECRET });

    fastify.decorate('authenticate', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });
}

module.exports = fp(jwtPlugin);
