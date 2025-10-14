export default class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(request, reply) {
    try {
      const user = await this.authService.register(request.body);
      reply.code(201).send({ status: "success", statusCode: 201, user });
    } catch (error) {
      reply.badRequest({
        status: "error",
        statusCode: 400,
        message: error.message,
      });
    }
  }

  async login(request, reply) {
    try {
      const token = await this.authService.login(request.body);
      reply.send({ status: "success", statusCode: 200, token });
    } catch (error) {
      reply.unauthorized({
        status: "error",
        statusCode: 401,
        message: error.message,
      });
    }
  }
}
