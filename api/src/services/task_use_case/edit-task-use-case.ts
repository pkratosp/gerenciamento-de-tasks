import { TaskRepository } from "src/repositories/task-repository";

type RequestType = {
    id: number
    title?: string
    description?: string
}

export class EditTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(data: RequestType) {
        
    }
}