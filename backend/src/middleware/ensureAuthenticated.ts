import type { FastifyRequest, FastifyReply } from "fastify";

export const ensureAuthenticated = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  if (req.isAuthenticated()) {
    return; 
  }

  return reply
    .status(401)
    .send({ message: "Unauthorized" }); 
};
