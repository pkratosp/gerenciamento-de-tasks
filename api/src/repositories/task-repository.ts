import { 
    Tasks as TasksType, 
    Prisma
} from "@prisma/client"

export interface TaskRepository {

    createTask(data: Prisma.TasksCreateInput): Promise<TasksType>
    editTask(data: Prisma.TasksUpdateInput, idTask: number): Promise<boolean>
    taskCompleted(idTask: number): Promise<boolean>
    removeTask(idTask: number): Promise<boolean>
    listAllTasks(userId: string): Promise<TasksType[]>
}