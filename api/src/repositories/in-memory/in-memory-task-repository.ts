
import { Prisma, Tasks as TasksType } from "@prisma/client";
import { TaskRepository } from "../task-repository";

export class InMemoryTaskRepository implements TaskRepository {
    public itemsTasks: TasksType[] = []
    public idTask: number = 1
    
    async createTask(data: Prisma.TasksCreateInput) {
        const id = this.idTask++;

        this.itemsTasks.push({
            id: id,
            ...data,
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: "",
        })

        return this.itemsTasks[0]
    }
    
    async editTask(data: Prisma.TasksUpdateInput, idTask: number) {
        const edit = this.itemsTasks.filter((task) => task.id === idTask)
            .map((task) => {
                task.title = data.title ? data.title.toString() : task.title
                task.description = data.description ? data.description.toString() : task.description
            })

        if (edit.length === 0) {
            return false;
        }
        return true;
    }
    
    async taskCompleted(idTask: number) {
        const edit = this.itemsTasks.filter((task) => task.id === idTask)
            .map((task) => {
                task.completed_at = new Date()
            })

        if (edit.length === 0) {
            return false;
        }
        return true;
    }
    
    async removeTask(idTask: number) {
        const deleteTask = this.itemsTasks.filter((task) => task.id !== idTask)
        
        this.itemsTasks = deleteTask
       
        if (deleteTask.length === 0) {
            return false;
        }
        return true;
    }

    async listAllTasks(userId: string) {
        const listTasks = this.itemsTasks.filter((task) => task.user_id === userId)

        return listTasks
    }
}