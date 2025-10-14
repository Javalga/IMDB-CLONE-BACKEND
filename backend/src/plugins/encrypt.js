import fp from 'fastify-plugin'
import bcrypt from 'bcryptjs'

const saltRounds = 10

async function toHash(string) {
  return await bcrypt.hash(string, saltRounds)
}

async function compareHash(string, hashedString) {
  return await bcrypt.compare(string, hashedString)
}

export default fp(async (fastify) => {
  fastify.decorate('toHash', toHash)
  fastify.decorate('compareHash', compareHash)
})