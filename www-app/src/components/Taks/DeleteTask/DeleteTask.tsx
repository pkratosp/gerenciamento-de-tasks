"use client"

import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'

// componentes
import { Dialog, Transition } from '@headlessui/react'
import { toast } from 'sonner'

interface Props {
    isOpen: boolean
    closeModal(): void
    task: {
        id: string
    }
}

// para garantir o prazo da entrega, utilizei o mesmo componente de criação e edição do modal
export function DeleteTask({ closeModal, isOpen, task }: Props) {
    const { data: session } = useSession()

    const { handleSubmit } = useForm()
    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)

    async function handleDeleteTask() {
        try {

            setIsLoadingButton(true)

            const completedTask = await api.delete(`/task/${task?.id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
            setIsLoadingButton(false)

            if (completedTask.status === 200 && completedTask.data == true) {
                toast.success("Task deletada com sucesso!")

                // coloquei um time para da um reload na pagina
                setTimeout(() => {
                    window.location.reload()
                }, 1250)

            } else {
                return toast.info("Ocorreu algo inesperado ao deletar task")
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
                                        Deletar task task
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit(handleDeleteTask)}>

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
                                                    isLoadingButton === true ? "Deletando..." : "Deletar Task"
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