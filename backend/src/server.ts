import fastify from "fastify";
import 'dotenv/config'
import fastifyCookie from "@fastify/cookie";
import { fastifySession } from '@fastify/session';
import fastifypassport from "@fastify/passport"
import connectionDb from "./config/db.ts"


const app = fastify({logger:true})

// This is cookies setup 


const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/gitprofile"

app.register(connectionDb,{URL})


app.register(fastifyCookie,{
    secret:process.env.SECRET_COOKIE
})

// This is session setup
app.register(fastifySession,{
    secret:process.env.SECRET_SESSION!,

    cookie:{
        secure:false
    },
    saveUninitialized:false
})


const PORT = Number(process.env.PORT) || 3000


// This is call passport js 
app.register(fastifypassport.initialize())
app.register(fastifypassport.secureSession())


// server starting function 
const start = () =>{
  try{
    app.listen({port:PORT},()=>{
    console.log(`server is running on ${PORT}`);
})
}catch(err){
  console.log(`server connection failed ${err}`);
  
}
}

start()