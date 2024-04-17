"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
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
import { EditTask } from "./Taks/EditTask/EditTask"
import { useState } from "react"
import { ArrowCircleUpRight } from "@phosphor-icons/react"


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
    }>
    totalTasks: number
}

export function TableComponent({ tasks, totalTasks }: Props) {
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
    const [selectTask, setSelectTask] = useState<SelectTaskType | null>(null)

    return (
        <>
            <EditTask
                isOpen={isOpenModalEdit}
                closeModal={() => setIsOpenModalEdit(false)}
                task={selectTask}
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
                        <TableRow key={task.id}>
                            <TableCell className="font-medium">{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell className="text-right">
                                <ArrowCircleUpRight
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            <div>
                <Pagination>
                    <PaginationContent>


                        {/* {
                            tasks.map((element) => (
                                <PaginationItem
                                    key={element.id}
                                >
                                    <PaginationLink
                                        isActive={false}
                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>

                            ))
                        } */}

                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}