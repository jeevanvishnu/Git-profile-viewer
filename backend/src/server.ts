import fastify from "fastify";
import 'dotenv/config'
import fastifyCookie from "@fastify/cookie";
import fastifySecureSession from '@fastify/secure-session';
import fastifypassport from "@fastify/passport"
import connectionDb from "./config/db.ts"
import authRoute from "./routes/auth.route.ts"
import userRoute from './routes/user.route.ts'
import exploreRoute from "./routes/explore.route.ts";


const app = fastify({logger:true})


// Database URl and connection 
const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/gitprofile"
app.register(connectionDb,{URL})

app.register(authRoute,{prefix:"/api/v1/auth"})
app.register(userRoute,{prefix:'/api/v1/user'})
app.register(exploreRoute,{prefix:'/api/v1/explore'})


// This is cookies setup 
app.register(fastifyCookie,{
    secret:process.env.SECRET_COOKIE
})
console.log(process.env.SECRET_SESSION);

// This is session setup
app.register(fastifySecureSession, {
  key: Buffer.from(process.env.SECRET_SESSION!, "base64"), 
  cookie: {
    path: "/",
    secure: false,
  },
});

// This is call passport js 
app.register(fastifypassport.initialize())
app.register(fastifypassport.secureSession())

const PORT = Number(process.env.PORT) || 3000


// server starting function 
const start = () =>{
  try{
    app.listen({port:PORT},()=>{
    console.log(`server is running on port http://localhost:${PORT}`);
})
}catch(err){
  console.log(`server connection failed ${err}`);
  
}
}

start()


