import type {FastifyInstance} from "fastify";
import passport from "@fastify/passport";
import 'dotenv/config'
const authRoute = (Router:FastifyInstance) =>{
  
Router.get('/auth/github',
passport.authenticate('github', { scope: [ 'user:email' ] }));

Router.get('/auth/github/callback', 
{preValidation:passport.authenticate('github', { failureRedirect:process.env.CLIENT_BASE_URL + '/login' })},
  function(req, replay) {
    replay.redirect(String(process.env.CLIENT_BASE_URL));
  });
}


export default authRoute




