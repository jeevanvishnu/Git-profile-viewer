import type {FastifyRequest  , FastifyReply } from "fastify"
import "dotenv/config"

type param = {
    language:string
}

export const explorePopularRepo = async (req : FastifyRequest<{Params:param}> , rep: FastifyReply) =>{
    try {
        const {language} = req.params

        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{
            headers:{
                authorization: `token ${process.env.GITHUB_API_KEY ?? ""}`
            }
        })
        const data = await response.json();
        rep.send({ repos: data.items });

    } catch (err) {
       rep.status(500).send({error:(err as Error).message})
    }

}
