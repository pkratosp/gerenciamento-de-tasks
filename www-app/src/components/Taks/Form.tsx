"use client"

import { UseFormRegister } from "react-hook-form"
import { TaskType } from "./data"

interface Props {
    register: UseFormRegister<TaskType>
}

export function Form({ register }: Props) {

    return (
        <>

            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Titulo da task
                </label>
                <div
                    className="mt-2"
                >
                    <input
                        {...register("title", { required: true })}
                        id="title"
                        name="title"
                        type="title"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>


            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Descrição
                </label>
                <textarea
                    {...register("description", { required: true })}
                    id="description"
                    name="description"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
            </div>
        </>
    )
}