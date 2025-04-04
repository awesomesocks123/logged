'use client'

import { signIn } from "next-auth/react"

export default function LogInButton() {
    return(
        <button onClick={() => signIn('google')} className="bg-gray-200 py-2 px-4 ml-2 rounded-md">Log In</button>
    )
}