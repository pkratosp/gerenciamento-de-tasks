import { TaskRepository } from "../task-repository"
import { prisma } from "src/lib/prisma"
import { Prisma } from "@prisma/client"
import { FilterType } from "src/dto/task-repository-dto"


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
                completed_at: new Date()
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
    

    async listAllTasks(userId: string, filter: FilterType) {
        const filterPage = filter.page != undefined ? ((filter?.page * 10) - 10) : undefined
        
        const [list, totalTasks] = await Promise.all([
            prisma.tasks.findMany({
                skip: filterPage ?? undefined,
                take: filterPage == undefined ? undefined : 10,
                where: {
                    user_id: userId,
                    title: {
                        contains: filter.title
                    },
                    description: {
                        contains: filter.description
                    }
                },
                orderBy: {
                    id: "desc"
                }
            }),
            prisma.tasks.count({
                where: {
                    user_id: userId,
                    title: {
                        contains: filter.title
                    },
                    description: {
                        contains: filter.description
                    }
                }
            })
        ])

        return {
            tasks: list,
            totalTasks: totalTasks
        }
    }
}