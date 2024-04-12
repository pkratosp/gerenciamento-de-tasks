import { FastifyInstance } from "fastify"

export async function appRouteTask (app: FastifyInstance) {

    app.get("/", async (req,reply) => {
        reply.status(200).send("runing...")
    })

}