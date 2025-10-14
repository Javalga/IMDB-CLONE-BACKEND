import fp from 'fastify-plugin'

export default fp(async (fastify, opts) => {
  fastify.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'dev-secret'
  })

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' })
    }
  })
})