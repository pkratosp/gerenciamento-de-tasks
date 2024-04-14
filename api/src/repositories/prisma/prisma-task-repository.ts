import { TaskRepository } from "../task-repository"
import { prisma } from "src/lib/prisma"
import { Prisma } from "@prisma/client"


export class PrismaTaskRepository implements TaskRepository {
    async createTask(data: Prisma.TasksCreateInput) {
       const create = await prisma.tasks.create({
        data: data,
       })

       return create
    }
    async editTask(data: Prisma.TasksUpdateInput, idTask: string) {
        const editTask = await prisma.tasks.update({
            data: {
                title: data.title,
                description: data.description
            },
            where: {
                id: idTask
            }
        })

        if(editTask.id){
            return true
        }

        return false
    }
    async taskCompleted(idTask: string) {
        const taskCompleted = await prisma.tasks.update({
            data: {
                created_at: new Date()
            },
            where: {
                id: idTask
            }
        })

        if(taskCompleted.completed_at){
            return true
        }

        return false
    }
    async removeTask(idTask: string) {
        const removeTask = await prisma.tasks.delete({
            where: {
                id: idTask
            }
        })

        if(removeTask.id) {
            return true
        }

        return false
    }
    

    async listAllTasks(userId: string) {
        const list = await prisma.tasks.findMany({
            where: {
                user_id: userId
            }
        })

        return list
    }
}