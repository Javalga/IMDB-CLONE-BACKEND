export default class UserController {
  constructor(userService) {
    this.userService = userService
  }

  async getAllUsers(request, reply) {
    try {
      const users = await this.userService.getAllUsers()
      reply.send(users)
    } catch (err) {
      reply.internalServerError('Something went wrong while fetching users.')
    }
  }

  async getUserById(request, reply) {
    try {
      const user = await this.userService.getUserById(request.params.id)

      if (!user) return reply.notFound('User not found.')

      reply.send(user)
    } catch (err) {
      console.log(err);
      reply.internalServerError('Unable to retrieve user. Please try again later.')
    }
  }

  async getUserByEmail(request, reply) {
    try {
      const user = await this.userService.getUserByEmail(request.params.email)

      if (!user) return reply.notFound('User not found.')

      reply.send(user)
    } catch (err) {
      reply.internalServerError('Unable to retrieve user by email. Please try again later.')
    }
  }

  async createUser(request, reply) {
    try {
      const newUser = await this.userService.createUser(request.body)
      reply.code(201).send(newUser)
    } catch (err) {
      reply.badRequest('Failed to create user. Please check your data and try again.')
    }
  }
}
