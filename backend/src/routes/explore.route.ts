import type { FastifyInstance } from "fastify";
import { explorePopularRepo } from "../controllers/explore.controller.ts";



const exploreRoute = (Router : FastifyInstance) =>{
  Router.get('/repos/:language',explorePopularRepo)
}


export default exploreRoute