export default class UserService {
  constructor(fastify, userRepository) {
    this.fastify = fastify
    this.userRepository = userRepository
  }

  async getAllUsers() {
    return await this.userRepository.getAll()
  }

  async getUserById(id) {
    return await this.userRepository.getById(id)
  }

  async getUserByEmail(email) {
    return await this.userRepository.getByEmail(email)
  }

  async createUser(userData) {
    const hashedPassword = await this.fastify.toHash(userData.password)
    const newUser = { ...userData, password: hashedPassword }
    return await this.userRepository.create(newUser)
  }
}