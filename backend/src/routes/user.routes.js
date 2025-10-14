import UserRepository from '../repositories/user.repository.js'
import UserService from '../services/user.service.js'
import UserController from '../controllers/user.controller.js'

export default async function (fastify) {
  const userRepository = new UserRepository(fastify.db)
  const userService = new UserService(fastify, userRepository)
  const userController = new UserController(userService)

  fastify.get('/users', userController.getAllUsers.bind(userController))
  fastify.get('/users/:id', userController.getUserById.bind(userController))
  fastify.get('/users/email/:email', userController.getUserByEmail.bind(userController))
  fastify.post('/users', userController.createUser.bind(userController))
}