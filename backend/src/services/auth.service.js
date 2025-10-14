export default class AuthService {
  constructor(fastify, userService) {
    this.fastify = fastify;
    this.userService = userService;
  }

  async register(userData) {
    return await this.userService.createUser(userData);
  }

  async login(credentials) {
    const { email, password } = credentials;

    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isPasswordValid = await this.fastify.compareHash(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = this.fastify.jwt.sign({ userId: user.id, email: user.email });

    return { userId: user.id, token };
  }
}
