"use client"


import { useState } from "react"
import clsx from "clsx"

// icons
import { Checks, Eraser, TrashSimple } from "@phosphor-icons/react"

// componentes
import { EditTask } from "./EditTask/EditTask"
import { ConfirmationTask } from "./ConfirmationTask/ConfirmationTask"
import { DeleteTask } from "./DeleteTask/DeleteTask"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"


type SelectTaskType = {
    id: string
    title: string
    description: string
}

interface Props {
    tasks: Array<{
        id: string;
        title: string;
        description: string;
        completed_at: Date | null
    }>
    totalTasks: number
    page: number
    setPage: (state: number) => void
}

export function TableComponent({ tasks, totalTasks, page, setPage }: Props) {

    const resultPage = Math.ceil(totalTasks / 10)
    const arrayPage = Array.from({ length: resultPage }, (_, i) => i + 1)

    // modals
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
    const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState<boolean>(false)
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false)

    // seleciona a task
    const [selectTask, setSelectTask] = useState<SelectTaskType | null>(null)

    return (
        <>
            <EditTask
                isOpen={isOpenModalEdit}
                closeModal={() => setIsOpenModalEdit(false)}
                task={selectTask}
            />

            <ConfirmationTask
                isOpen={isOpenModalConfirmation}
                closeModal={() => setIsOpenModalConfirmation(false)}
                task={selectTask!}
            />

            <DeleteTask
                isOpen={isOpenModalDelete}
                closeModal={() => setIsOpenModalDelete(false)}
                task={selectTask!}
            />

            <Table>
                <TableCaption>Lista das tasks</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Titulo</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-right">Mais</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow
                            key={task.id}
                            className={clsx("", {
                                "bg-green-300": task.completed_at !== null
                            })}
                        >
                            <TableCell className="font-medium">{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell className="text-right flex gap-2">
                                <Eraser
                                    className="text-right cursor-pointer"
                                    onClick={() => {

                                        setSelectTask({
                                            id: task.id,
                                            title: task.title,
                                            description: task.description,
                                        })
                                        setIsOpenModalEdit(true)
                                    }}
                                />
                                <TrashSimple
                                    className="text-right cursor-pointer text-red-500"
                                    onClick={() => {
                                        setSelectTask({
                                            id: task.id,
                                            title: task.title,
                                            description: task.description,
                                        })
                                        setIsOpenModalDelete(true)
                                    }}
                                />
                                <Checks
                                    className="text-right cursor-pointer text-green-500"
                                    onClick={() => {
                                        setSelectTask({
                                            id: task.id,
                                            title: task.title,
                                            description: task.description,
                                        })
                                        setIsOpenModalConfirmation(true)
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            <div>
                <Pagination>
                    <PaginationContent>

                        {
                            arrayPage.map(element => (
                                <PaginationItem
                                    key={element}
                                >
                                    <PaginationLink
                                        isActive={element === page ? true : false}
                                        onClick={() => setPage(element)}
                                    >
                                        {element}
                                    </PaginationLink>
                                </PaginationItem>
                            ))
                        }

                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}