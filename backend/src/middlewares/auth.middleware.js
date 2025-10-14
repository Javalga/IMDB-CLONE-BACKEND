export default async function authMiddleware(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    request.log.error('JWT verification failed:', err);
    reply.unauthorized('Unauthorized');
    return;
  }
}