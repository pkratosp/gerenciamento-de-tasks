import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Form } from '../Form'
import { useForm } from 'react-hook-form'
import { TaskType } from '../data'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { api } from '@/lib/axios'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'

type TasksType = {
    tasks: Array<{
        id: string;
        title: string;
        description: string;
    }>
    totalTasks: number
}

interface Props {
    isOpen: boolean
    closeModal(): void
    tasks: TasksType
    setTasks: (state: TasksType) => void
}

export function CreateTask({ closeModal, isOpen, tasks, setTasks }: Props) {
    const { data: session } = useSession()
    const { handleSubmit, register } = useForm<TaskType>()
    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)

    async function handleCreateTask({ title, description }: TaskType) {
        try {
            setIsLoadingButton(true)

            const createTask = await api.post("/task",
                {
                    title,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })

            setIsLoadingButton(false)

            if (createTask.status === 201) {
                setTasks({
                    tasks: [
                        ...tasks.tasks,
                        {
                            description,
                            title,
                            id: createTask.data
                        }
                    ],
                    totalTasks: 1
                })
                return toast.success("Task criada com sucesso")
            } else {
                return toast.info("Ocorreu algo inesperado ao criar task")
            }

        } catch (error) {
            setIsLoadingButton(false)

            if (error instanceof AxiosError) {
                return toast.error(error.message)
            }

            return toast.error("Ocorreu um erro inesperado")
        }
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Criar nova task
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit(handleCreateTask)}>
                                        <div className="mt-2">

                                            <Form
                                                register={register}
                                            />

                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Fechar
                                            </button>
                                            <button
                                                disabled={isLoadingButton}
                                                type="submit"
                                                className={clsx("inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2", {
                                                    "cursor-not-allowed bg-slate-600 hover:bg-slate-500": isLoadingButton === true
                                                })}
                                            >
                                                {
                                                    isLoadingButton === true ? "Criando..." : "Criar Task"
                                                }

                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}