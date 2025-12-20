

import type { FastifyRequest, FastifyReply } from 'fastify';

export async function ensureAuthenticated(
  req: FastifyRequest,
  reply: FastifyReply
) {
  if (req.isAuthenticated?.()) {
    return;
  }

  return reply.code(401).send({
    error: 'Unauthorized'
  });
}
