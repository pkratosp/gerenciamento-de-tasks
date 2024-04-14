import { TaskRepository } from "src/repositories/task-repository"
import { EmptyError } from "../errors/task/empty-data-error"

type RequestType = {
    userId: string
}

export class AllTaskByUserUseCase {
    constructor(private taskRepository: TaskRepository) {}
    
    async execute(data: RequestType) {

        const findAllTaskByUser = await this.taskRepository.listAllTasks(data.userId)

        if(findAllTaskByUser.length === 0) {
            throw new EmptyError()
        }

        return findAllTaskByUser;

    }
}