import { 
    TaskCreateRequest, 
    EditTaskRequest, 
    TaskRemoveRequest, 
    TaskCompletedRequest
} from "src/dto/task-dto";
import { TaskRepository } from "../task-repository";

export class InMemoryTaskRepository implements TaskRepository {
    createTask(data: TaskCreateRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }
    editTask(data: EditTaskRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }
    taskCompleted(data: TaskRemoveRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }
    removeTask(data: TaskCompletedRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }
  
}