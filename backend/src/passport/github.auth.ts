import passport from "@fastify/passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import type { Profile } from "passport-github2";
import "dotenv/config"
import User from "../model/user.model.ts"
import fastifyPassport from '@fastify/passport'
import type { FastifyRequest } from "fastify";

 fastifyPassport.registerUserSerializer(async (user: any, request: FastifyRequest) => {
    return user._id.toString();
  });

  fastifyPassport.registerUserDeserializer(async (id: string, request: FastifyRequest) => {
    const user = await User.findById(id);
    return user;
  });

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID as string,
  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  callbackURL: "http://localhost:3000/api/v1/auth/github/callback"
  
},
  async function (_accessToken: string, _refreshToken: string, profile: Profile, done) {
    const user = await User.findOne({ userName: profile.username })

    if (!user) {
      const newUser = new User({
        userName: profile.username,
        name: profile.displayName,
        profileUrl: profile.profileUrl,
        avatarUrl: profile?.photos[0]?.value || '',
        likedBy: [],
        likedProfile: []
      })

      await newUser.save()
      done(null , newUser)
    } else {
      done(null, user)
    }

  }
));


