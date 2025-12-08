import mongoose  from "mongoose";
import fp from "fastify-plugin"
import "dotenv/config"
import type { FastifyInstance , FastifyPluginOptions} from "fastify";


type DbOptions=FastifyPluginOptions &{
    URL:string
}

const connectionDb = async (fastify:FastifyInstance , options:DbOptions) =>{
   
    try{
       await mongoose.connect(options.URL)
        fastify.log.info("Database connected sucessfully")
        
    }catch(err){
        fastify.log.info("Database connection failed")
        process.exit(1)
    }
}

export default fp(connectionDb)