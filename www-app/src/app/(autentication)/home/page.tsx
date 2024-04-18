"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/axios"
import { AxiosError } from "axios"
import { useSession } from "next-auth/react"

// componentes
import { CreateTask } from "@/components/Taks/CreateTask/CreateTask"
import { TableComponent } from "@/components/Taks/Table"
import { toast } from "sonner"
import { ButtonLogout } from "@/components/Buttons/ButtonLogout"

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

    const [page, setPage] = useState<number>(1)

    const [isOpenCreateTask, setIsOpenCreateTask] = useState<boolean>(false)
    const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false)

    const [tasks, setTasks] = useState<{
        tasks: Array<{
            id: string;
            title: string;
            description: string;
            completed_at: Date | null
        }>
        totalTasks: number
    }>({
        tasks: [],
        totalTasks: 0
    })



    // para apenas executar uma vez, pois ao cadastrar sera ataualizado diretamente via componente
    useEffect(() => {

        async function getTasks() {
            try {

                setIsLoadingTable(true)

                const tasks = await api.get(`/task?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })

                setIsLoadingTable(false)

                if (tasks.status === 200) {
                    if (typeof tasks.data === "string") {

                        setTasks({
                            tasks: [],
                            totalTasks: 0
                        })

                        return toast.info(tasks.data)
                    }

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

        if (session)
            getTasks()

    }, [session, page])

    return (
        session?.token === undefined ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <p className="text-sm text-gray-800 font-bold">Carregando sessão...</p>
            </div>
        ) : (
            <>

                <CreateTask
                    closeModal={() => setIsOpenCreateTask(false)}
                    isOpen={isOpenCreateTask}
                    setTasks={setTasks}
                    tasks={tasks}
                />

                <div className="flex justify-end items-center gap-2 m-4">
                    <button
                        onClick={() => setIsOpenCreateTask(true)}
                        type="button"
                        className="bg-blue-500 rounded-xl p-2 text-white hover:bg-blue-400"
                    >
                        Criar nova task
                    </button>
                    <ButtonLogout />
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
                                page={page}
                                setPage={setPage}
                            />
                        )
                    }
                </div>
            </>
        )
    )
}