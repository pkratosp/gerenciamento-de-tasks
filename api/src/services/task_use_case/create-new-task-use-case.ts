import { TaskRepository } from "src/repositories/task-repository";

type RequestType = {
    title: string
    description: string
}

export class CreateNewTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(data: RequestType) {
        
    }
}