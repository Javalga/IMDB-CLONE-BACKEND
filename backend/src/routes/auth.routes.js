import AuthService from '../services/auth.service.js'
import AuthController from '../controllers/auth.controller.js'
import UserService from '../services/user.service.js'
import UserRepository from '../repositories/user.repository.js'

export default async function (fastify) {
  const userRepository = new UserRepository(fastify.db)
  const userService = new UserService(fastify, userRepository)
  const authService = new AuthService(fastify, userService)
  const authController = new AuthController(authService)

  fastify.post('/auth/register', authController.register.bind(authController))
  fastify.post('/auth/login', authController.login.bind(authController))
}