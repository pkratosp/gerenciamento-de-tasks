"use client"

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SignInType = {
    email: string;
    password: string;
};

export default function Login() {


    const { handleSubmit, register } = useForm<SignInType>()

    async function handleSignIn(data: SignInType) {
        const login = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        })

        console.log(login)
        if (login?.error) {
            return toast.error("Credenciais invalidas")
        }

        toast.success("Usuário logado")

        redirect("/home")
    }

    return (

        <form onSubmit={handleSubmit(handleSignIn)}>
            <input
                {...register("email", { required: true })}
                type="email"
            />
            <input
                {...register("password", { required: true })}
                type="password"
            />

            <button type="submit">Logar</button>
        </form>
    )
}