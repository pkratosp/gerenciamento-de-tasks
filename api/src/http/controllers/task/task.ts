import { FastifyReply, FastifyRequest } from "fastify"
import { makeCreateNewTaskUseCase } from "src/services/factores/task_make/make-create-new-task-use-case"
import { makeEditTaskUseCase } from "src/services/factores/task_make/make-edit-task-use-case"
import { makeRemoveTaskUseCase } from "src/services/factores/task_make/make-remove-task-use-case"
import { makeTaskCompletedUseCase } from "src/services/factores/task_make/make-task-completed-use-case"
import { z } from "zod"

export class HandleTask {

    public async createTask(req: FastifyRequest, reply: FastifyReply) {
        try {
            
            const { body } = req
            // const userJWT = await req.jwtDecode()

            const bodyShecma = z.object({
                title: z.string(),
                description: z.string()
            })
            const bodyZod = bodyShecma.parse(body)

            const _makeCreateNewTaskUseCase = await makeCreateNewTaskUseCase()

            const create = await _makeCreateNewTaskUseCase.execute({
                title: bodyZod.title,
                description: bodyZod.description,
                userId: ""
            })

            return reply.status(201).send("ok")

        } catch (error) {
            
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }

    public async editTask(req: FastifyRequest, reply: FastifyReply) {
        try {

            const { body, params } = req
            
            const paramsShecma = z.object({
                idTask: z.string().uuid()
            })

            const bodyShecma = z.object({
                title: z.string().optional(),
                description: z.string().optional()
            })

            const { description, title } = bodyShecma.parse(body)
            const { idTask } = paramsShecma.parse(params)

            const _makeEditTaskUseCase = await makeEditTaskUseCase()

            const edit = await _makeEditTaskUseCase.execute({
                id: idTask,
                description: description,
                title: title
            })

            return reply.status(200).send(edit)

        } catch (error) {
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }

    public async removeTask(req: FastifyRequest, reply: FastifyReply) {
        try {
            
            const { params } = req
            
            const paramsShecma = z.object({
                idTask: z.string().uuid()
            })
            const { idTask } = paramsShecma.parse(params)

            const _makeRemoveTaskUseCase = await makeRemoveTaskUseCase()

            const removeTask = await _makeRemoveTaskUseCase.execute({ id: idTask })

            return reply.status(200).send(removeTask)

        } catch (error) {
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }

    public async completedTask(req: FastifyRequest, reply: FastifyReply) {
        try {

            const { params } = req
            
            const paramsShecma = z.object({
                idTask: z.string().uuid()
            })
            const { idTask } = paramsShecma.parse(params)

            const _makeTaskCompletedUseCase = await makeTaskCompletedUseCase()

            const completedTask = await _makeTaskCompletedUseCase.execute({ id: idTask })

            return reply.status(200).send(completedTask)
            
        } catch (error) {
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }

    public async getTasks(req: FastifyRequest, reply: FastifyReply) {
        try {

            const userJWT = await req.jwtDecode()
            
        } catch (error) {
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }
}