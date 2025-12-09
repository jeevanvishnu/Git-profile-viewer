import  { type FastifyInstance } from "fastify";
import { getUserProfileAndRepo , getAllLikes , likedProfile } from "../controllers/user.controller.ts";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.ts";
import type { getUser } from "../controllers/user.controller.ts";

const userRoute =  (Router : FastifyInstance) =>{

    Router.get("/profile/:username" , getUserProfileAndRepo)
    Router.get('/likes',{preHandler:ensureAuthenticated},getAllLikes)
    Router.post<{Params: getUser }>('/likes/:username',{preHandler:ensureAuthenticated},likedProfile)
    
}


export default userRoute