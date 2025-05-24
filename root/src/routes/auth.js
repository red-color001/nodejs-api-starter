const authController = require('../controllers/authController');

async function authRoutes(fastify) {
  fastify.post('/register', authController.register);
  fastify.post('/login', authController.login);
  fastify.get('/me', { preHandler: [fastify.authenticate] }, authController.me);
}

module.exports = authRoutes;
