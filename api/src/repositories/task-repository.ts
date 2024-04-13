import { 
    EditTaskRequest,
    TaskCreateRequest,
    TaskCompletedRequest,
    TaskRemoveRequest
} from "src/dto/task-dto"

export interface TaskRepository {

    createTask(data: TaskCreateRequest): Promise<any>
    editTask(data: EditTaskRequest): Promise<any>
    taskCompleted(data: TaskRemoveRequest): Promise<any>
    removeTask(data: TaskCompletedRequest): Promise<any>
    
}