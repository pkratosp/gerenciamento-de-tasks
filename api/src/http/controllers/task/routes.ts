import { FastifyInstance } from "fastify"
import { HandleTask } from "./task"

const handleTask = new HandleTask()

export async function appRouteTask (app: FastifyInstance) {

    app.post("/task", (...args) => handleTask.createTask(...args))
    app.get("/task", (...args) => handleTask.getTasks(...args))
    app.put("/task/:idTask", (...args) => handleTask.editTask(...args))
    app.delete("/task/:id", (...args) => handleTask.removeTask(...args))
    app.patch("/task/completed/:id", (...args) => handleTask.completedTask(...args))

}