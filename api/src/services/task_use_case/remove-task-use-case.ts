import { TaskRepository } from "src/repositories/task-repository";

type RequestType = {
    id: number
}

export class RemoveTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute({ id }: RequestType) {
        
        const removeTask = await this.taskRepository.removeTask(id)

        return removeTask
    }
}