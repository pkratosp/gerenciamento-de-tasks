import { TaskRepository } from "src/repositories/task-repository";

type RequestType = {
    id: number
}

export class TaskCompletedUseCase {
    constructor (private taskRepository: TaskRepository) {}

    async execute(data: RequestType) {
        
    }
}