"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import clsx from "clsx";

type SignInType = {
    email: string;
    password: string;
};

export default function Login() {
    const { refresh } = useRouter()

    const { handleSubmit, register } = useForm<SignInType>()
    const [isLoadingButtonSignIn, setIsLoadingButtonSignIn] = useState<boolean>(false)

    async function handleSignIn(data: SignInType) {
        setIsLoadingButtonSignIn(true)

        const login = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        })

        setIsLoadingButtonSignIn(false)

        if (login?.error) {
            return toast.error("Credenciais invalidas")
        }

        toast.success("Usuário logado")

        refresh()
    }

    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(handleSignIn)}
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email
                        </label>
                        <div
                            className="mt-2"
                        >
                            <input
                                {...register("email", { required: true })}
                                id="email"
                                name="email"
                                type="email"
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Senha
                        </label>
                        <input
                            {...register("password", { required: true })}
                            id="password"
                            name="password"
                            type="password"
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <button
                        disabled={isLoadingButtonSignIn}
                        className={clsx("w-full bg-blue-600 rounded-md p-2 text-white shadow-sm hover:bg-blue-500", {
                            "cursor-not-allowed bg-slate-600 hover:bg-slate-500": isLoadingButtonSignIn === true
                        })}
                        type="submit"
                    >
                        {
                            isLoadingButtonSignIn === true ? "Logando..." : "Logar"
                        }
                    </button>
                </form>

            </div>
        </div>
    )
}