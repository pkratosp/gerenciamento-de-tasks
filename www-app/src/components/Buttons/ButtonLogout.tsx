"use client"

import { SignOut } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// para encerrar sessao
export function ButtonLogout() {
    const router = useRouter()

    async function logout() {
        await signOut({
            redirect: false,
        })
        router.refresh()
    }

    return (
        <>
            <button
                onClick={() => logout()}
                className="flex cursor-pointer"
            >
                <SignOut size={22} /> Sair
            </button>
        </>
    )
}
