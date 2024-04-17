"use client"

import { TableComponent } from "@/components/Table"
import { CreateTask } from "@/components/Taks/CreateTask/CreateTask"
import { api } from "@/lib/axios"
import { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const tasks = [
    {
        id: "1",
        title: "task1",
        description: "descrição"
    },
    {
        id: "2",
        title: "task2",
        description: "descrição"
    },
    {
        id: "3",
        title: "task3",
        description: "descrição"
    },
    {
        id: "4",
        title: "task4",
        description: "descrição"
    }
]


export default function Home() {
    const { data: session } = useSession()

    const [isOpenCreateTask, setIsOpenCreateTask] = useState<boolean>(false)
    const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false)

    const [tasks, setTasks] = useState<{
        tasks: Array<{
            id: string;
            title: string;
            description: string;
        }>
        totalTasks: number
    }>({
        tasks: [],
        totalTasks: 0
    })

    async function getTasks() {
        try {

            setIsLoadingTable(true)

            const tasks = await api.get("/task?page=1", {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })

            setIsLoadingTable(false)

            if (tasks.status === 200) {
                setTasks(tasks.data)
            } else {
                return toast.info("Ocorreu um erro inesperado")
            }


        } catch (error) {
            setIsLoadingTable(false)


            if (error instanceof AxiosError) {
                return toast.error(error.message)
            }

            return toast.error("Ocorreu um erro inesperado")
        }
    }

    // para apenas executar uma vez, pois ao cadastrar sera ataualizado diretamente via componente
    useEffect(() => {
        if (session)
            getTasks()
    }, [session])

    return (
        session?.token === undefined ? (
            <>
            </>
        ) : (
            <>
                <CreateTask
                    closeModal={() => setIsOpenCreateTask(false)}
                    isOpen={isOpenCreateTask}
                    tasks={tasks}
                    setTasks={setTasks}
                />

                <div className="flex justify-end m-4">
                    <button
                        onClick={() => setIsOpenCreateTask(true)}
                        type="button"
                        className="bg-blue-500 rounded-xl p-2 text-white hover:bg-blue-400"
                    >
                        Criar nova task
                    </button>
                </div>

                <div className="mx-4">
                    {
                        isLoadingTable === true ? (
                            <>
                                Carregando
                            </>
                        ) : (
                            <TableComponent
                                tasks={tasks.tasks}
                                totalTasks={tasks.totalTasks}
                            />
                        )
                    }
                </div>
            </>
        )
    )
}