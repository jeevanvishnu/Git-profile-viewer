import type {  FastifyRequest , FastifyReply } from 'fastify';
import "dotenv/config"

export const ensureAuthenticated = (req:FastifyRequest , rep :FastifyReply ) =>{
    if(req.isAuthenticated()){
        return 
    }
    rep.redirect(process.env.CLIENT_BASE_URL + "/login")

}