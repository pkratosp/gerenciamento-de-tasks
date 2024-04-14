import { 
    Tasks as TasksType, 
    Prisma
} from "@prisma/client"

export interface TaskRepository {

    createTask(data: Prisma.TasksCreateInput): Promise<TasksType>
    editTask(data: Prisma.TasksUpdateInput, idTask: string): Promise<boolean>
    taskCompleted(idTask: string): Promise<boolean>
    removeTask(idTask: string): Promise<boolean>
    listAllTasks(userId: string): Promise<TasksType[]>
}