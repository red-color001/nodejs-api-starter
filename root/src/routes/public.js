const publicController = require('../controllers/publicController');

async function publicRoutes(fastify) {
    fastify.get('/ping', publicController.ping);
}

module.exports = publicRoutes;
