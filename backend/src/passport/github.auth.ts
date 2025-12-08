import passport from "@fastify/passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import {Profile} from "@fastify/passport"
import "dotenv/config"
import User from "../model/user.model.ts"



passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  async function(_accessToken:string, _refreshToken:string, profile:Profile, done){
    const user = await User.find({userName:profile.username})

    if(!user){
      const newUser = new User ({
         userName: profile.username,
         name:profile.name,
         profileUrl:profile.profileUrl,
         avatarUrl:profile.photos[0].value,
        likedBy:[],
        likedProfile:[]
      })

      await newUser.save()
      done(newUser)
    }else{
      done(user)
    }

  }
));

