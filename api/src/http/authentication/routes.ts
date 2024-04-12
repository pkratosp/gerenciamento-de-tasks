import { FastifyInstance } from "fastify"

export async function appRouteAutentication(app: FastifyInstance) {

    app.post("/auth", async () => {})

}