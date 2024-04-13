import { FastifyInstance } from "fastify"

export async function appRouteTask (app: FastifyInstance) {

    app.post("/task", (...args) => (...args))
    app.get("/task", (...args) => (...args))
    app.put("/task", (...args) => (...args))
    app.delete("/task/:id", (...args) => (...args))
    app.patch("/task/completed/:id", (...args) => (...args))
}