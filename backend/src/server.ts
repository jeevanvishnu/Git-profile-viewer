import fastify from "fastify";
import 'dotenv/config'
import "./passport/github.auth.ts"; // adjust path if needed
import fastifyCookie from "@fastify/cookie";
import fastifySecureSession from '@fastify/secure-session';
import fastifyPassport from "@fastify/passport"
import connectionDb from "./config/db.ts"
import authRoute from "./routes/auth.route.ts"
import userRoute from './routes/user.route.ts'
import exploreRoute from "./routes/explore.route.ts";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import path from "path";

const app = fastify({ logger: true })


// Database URl and connection 
const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/gitprofile"
app.register(connectionDb, { URL })


// This is cookies setup 
app.register(fastifyCookie, {
  secret: process.env.SECRET_COOKIE
})


// This is session setup
app.register(fastifySecureSession, {
  key: Buffer.from(process.env.SECRET_SESSION!, "base64"),
  cookie: {
    path: "/",
    secure: false,
  },
});


// This is call passport js 
app.register(fastifyPassport.initialize());
app.register(fastifyPassport.secureSession());

app.register(fastifyStatic, {
  root: path.join(process.cwd(), "../frontend/dist"),
});

app.get("*", (_, reply) => {
  reply.sendFile("index.html");
});

app.register(cors, {
  origin: 'http://localhost:3000'
})

app.register(authRoute, { prefix: "/api/v1/auth" })
app.register(userRoute, { prefix: '/api/v1/user' })
app.register(exploreRoute, { prefix: '/api/v1/explore' })


const PORT = Number(process.env.PORT) || 3000


// server starting function 
const start = () => {
  try {
    app.listen({ port: PORT, host: '0.0.0.0' }, () => {
      console.log(`server is running on port http://localhost:${PORT}`);
    })
  } catch (err) {
    console.log(`server connection failed ${err}`);

  }
}

start()


