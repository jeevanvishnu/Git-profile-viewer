// import type {  FastifyRequest , FastifyReply } from 'fastify';
// import "dotenv/config"


// export const ensureAuthenticated = (req:FastifyRequest , rep :FastifyReply ) =>{
//     if(req.isAuthenticated()){
//         return 
//     }
//    return  rep.redirect(process.env.CLIENT_BASE_URL + "/login")

// }


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
