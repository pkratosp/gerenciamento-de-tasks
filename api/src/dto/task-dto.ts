export interface TaskCreateRequest {
    title: string
    description: string
}

export interface EditTaskRequest {
    id: number
    title: string
    description: string
}

export interface TaskCompletedRequest {
    id: number
}

export interface TaskRemoveRequest {
    id: number
}