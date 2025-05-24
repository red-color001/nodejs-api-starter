module.exports = {
  ping: async (request, reply) => {
    reply.send({ message: 'pong' });
  },
};
