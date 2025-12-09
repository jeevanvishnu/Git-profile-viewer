import type {FastifyRequest , FastifyReply} from "fastify"
import User from "../model/user.model";


type getUser = {
    username:string
}

export const getUserProfileAndRepo = async (req:FastifyRequest<{Params:getUser}> , rep:FastifyReply) =>{
      try {
            const {username} = req.params

            const userRes = await fetch(`https://api.github.com/users/${username}` ,{
                headers:{
                    authorization:`token ${process.env.GITHUB_API_KEY ?? ""}`
                }
            })
            
            const userProfile = await userRes.json() as { repos_url: string }

            const repos = await fetch(userProfile.repos_url,{
                headers:{
                    authorization:`token ${process.env.GITHUB_API_KEY ?? ""}`
                }
            })

            const repoRes = await repos.json()

            rep.status(200).send({userProfile , repoRes})

            
        } catch (error) {
            console.log("Error is comming from getUserProfile" , error);
            rep.send({message:"Internal server error"})
        }
}


export const likedProfile = async (req:FastifyRequest<{Params:getUser}> , rep:FastifyReply) =>{
    try {
        const {username} = req.params

        if (!req.user) {
            rep.status(401).send({message: "Unauthorized"});
            return;
        }

        const user = await User.findById(req.user._id.toString())

        const userLike = await User.findOne({ userName: username });

         
        if(!userLike){
       return rep.status(404).send({error: "User is not found"})
        }

        if (user!.likedProfile.includes(username)) {
        return rep.status(400).send({ error: "User already liked" });
        }

            userLike.likedBy.push({
            userName: user!.userName,   
            avatarUrl: user?.avatarUrl,
            LikedData: new Date()       
            });

        user?.likedProfile.push(user!.userName); 
        
         await Promise.all([userLike.save(), user?.save()]);
        rep.status(200).send({message:"User Liked"})
        
    } catch (error) {
        console.log("The error is comming from likedProfile" , error);
        rep.status(500).send("Internal server error")
    }
}


export const getAllLikes = async (req:FastifyRequest , rep: FastifyReply) =>{
    try{
        if(!req.user) return rep.status(401).send({message: "Unauthorized"});
        const user = await User.findById(req.user._id.toString())

        rep.status(200).send({likedBy:user?.likedBy})
    }catch(err){
        console.log("The error is comming from getAllLikes",err);
        rep.status(500).send({error:error.message})
    }
}




    