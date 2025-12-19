import type { FastifyInstance } from "fastify";
import passport from "@fastify/passport";
import 'dotenv/config'
const authRoute = (Router: FastifyInstance) => {

  Router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] }));

  Router.get('/github/callback',
    { preValidation: passport.authenticate('github', { failureRedirect: process.env.CLIENT_BASE_URL + '/login' }) },
    function (req, replay) {
      replay.redirect(String(process.env.CLIENT_BASE_URL));
    });


  Router.get('/check', (req, replay) => {
    if (req.isAuthenticated()) {
      replay.send({ user: req.user })
    } else {
      replay.send({ user: null })
    }
  })


  Router.get('/logout', (req, replay) => {
    try {
      req.session.delete()
      return replay.send("Logout sucessfully")

    } catch (error) {
      console.log("The error is comming from logout", error);

    }
  })
}




export default authRoute




